// AboutWorkSection.jsx
import { ArrowRight, Users, Briefcase, Target, Heart } from "lucide-react";

export default function AboutWorkSection() {
    const containerStyle = {
        padding: "80px 32px",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
    };

    const cardStyle = {
        flex: 1,
        minWidth: "320px",
        borderRadius: "24px",
        padding: "40px",
        position: "relative",
        overflow: "hidden",
        minHeight: "480px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
        background: "#fff",
    };

    const buttonStyle = {
        position: "absolute",
        bottom: "0",
        right: "0",
        background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
        color: "#fff",
        padding: "16px 28px",
        borderTopLeftRadius: "20px",
        borderBottomRightRadius: "24px",
        fontWeight: "700",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 8px 25px rgba(37, 99, 235, 0.25)",
        transition: "all 0.3s ease",
        border: "none",
        cursor: "pointer",
        letterSpacing: "0.5px",
    };

    const imageStyle = {
        width: "100%",
        height: "180px",
        objectFit: "cover",
        borderRadius: "16px",
        marginBottom: "24px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    };

    const titleStyle = {
        fontSize: "32px",
        fontWeight: "800",
        marginBottom: "16px",
        color: "#1e293b",
        lineHeight: "1.2",
        letterSpacing: "-0.5px",
    };

    const descriptionStyle = {
        fontSize: "16px",
        color: "#64748b",
        lineHeight: "1.7",
        marginBottom: "24px",
        fontWeight: "400",
    };

    const handleCardHover = (e, isHover) => {
        const card = e.currentTarget;
        if (isHover) {
            card.style.transform = "translateY(-12px) scale(1.02)";
            card.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.15)";
        } else {
            card.style.transform = "translateY(0) scale(1)";
            card.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.08)";
        }
    };

    const handleButtonHover = (e, isHover) => {
        const button = e.currentTarget;
        if (isHover) {
            button.style.background = "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)";
            button.style.transform = "translateX(-4px)";
            button.style.boxShadow = "0 12px 35px rgba(37, 99, 235, 0.35)";
        } else {
            button.style.background = "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)";
            button.style.transform = "translateX(0)";
            button.style.boxShadow = "0 8px 25px rgba(37, 99, 235, 0.25)";
        }
    };

    return (
        <div style={containerStyle}>
            <div style={{
                display: "flex",
                gap: "40px",
                flexWrap: "wrap",
                maxWidth: "1280px",
                margin: "0 auto",
            }}>
                
                {/* ABOUT US CARD */}
                <div 
                    style={{
                        ...cardStyle,
                        background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
                        border: "1px solid #e0f2fe",
                    }}
                    onMouseOver={(e) => handleCardHover(e, true)}
                    onMouseOut={(e) => handleCardHover(e, false)}
                >
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <img 
                            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop&crop=center"
                            alt="About Us"
                            style={imageStyle}
                        />
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                            <Target size={20} color="#f97316" />
                            <h2 style={titleStyle}>
                                About Us
                            </h2>
                        </div>
                        <p style={descriptionStyle}>
                            Building India's most trusted financial marketplace with cutting-edge technology, transparent processes, and customer-first approach to make loans accessible to everyone.
                        </p>
                    </div>
                    <button 
                        style={buttonStyle}
                        onMouseOver={(e) => handleButtonHover(e, true)}
                        onMouseOut={(e) => handleButtonHover(e, false)}
                    >
                        <ArrowRight size={16} />
                        KNOW MORE
                    </button>
                </div>

                {/* WORK WITH US CARD */}
                <div 
                    style={{
                        ...cardStyle,
                        background: "linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)",
                        border: "1px solid #fde68a",
                    }}
                    onMouseOver={(e) => handleCardHover(e, true)}
                    onMouseOut={(e) => handleCardHover(e, false)}
                >
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <img 
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop&crop=center"
                            alt="Work With Us"
                            style={imageStyle}
                        />
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                            <Briefcase size={20} color="#eab308" />
                            <h2 style={titleStyle}>
                                Work With Us
                            </h2>
                        </div>
                        <p style={descriptionStyle}>
                            Join our dynamic team and be part of India's fintech revolution. We're looking for passionate individuals who want to make a difference in millions of lives.
                        </p>
                    </div>
                    <button 
                        style={buttonStyle}
                        onMouseOver={(e) => handleButtonHover(e, true)}
                        onMouseOut={(e) => handleButtonHover(e, false)}
                    >
                        <ArrowRight size={16} />
                        JOIN US
                    </button>
                </div>
            </div>
        </div>
    );
}