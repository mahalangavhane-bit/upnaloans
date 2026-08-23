import {
  Injectable,
  OnModuleDestroy,
  UnauthorizedException,
} from '@nestjs/common';

import Redis from 'ioredis';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService implements OnModuleDestroy {
  private readonly redis = new Redis(
    process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  );

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleDestroy() {
    if (this.redis.status !== 'end') {
      await this.redis.quit();
    }
  }

  async sendOtp(dto: RegisterDto) {
    const phone = dto.phone.trim();

    const otp = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const key = `auth:otp:${phone}`;

    await this.redis.set(
      key,
      otp,
      'EX',
      300,
    );

    console.log(`OTP for ${phone}: ${otp}`);

    return {
      success: true,
      message: 'OTP sent successfully',
    };
  }

  async verifyOtp(dto: LoginDto) {
    const phone = dto.phone.trim();

    const key = `auth:otp:${phone}`;

    const storedOtp = await this.redis.get(key);

    if (!storedOtp || storedOtp !== dto.otp) {
      throw new UnauthorizedException(
        'Invalid or expired OTP',
      );
    }

    await this.redis.del(key);

    let user = await this.prisma.user.findUnique({
      where: {
        phone,
      },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          phone,
        },
      });
    }

    let customer =
      await this.prisma.customer.findUnique({
        where: {
          userId: user.id,
        },
      });

    if (!customer) {
      customer = await this.prisma.customer.create({
        data: {
          userId: user.id,
        },
      });
    }

    const accessToken =
      await this.jwtService.signAsync({
        sub: user.id,
        customerId: customer.id,
        phone: user.phone,
        role: user.role,
      });

    return {
      success: true,
      accessToken,
      user: {
        id: user.id,
        phone: user.phone,
        role: user.role,
      },
      customer: {
        id: customer.id,
      },
    };
  }
}