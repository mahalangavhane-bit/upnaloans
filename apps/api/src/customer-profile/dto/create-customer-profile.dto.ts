export class CreateCustomerProfileDto {
  customerId: string;

  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  pincode?: string;
}