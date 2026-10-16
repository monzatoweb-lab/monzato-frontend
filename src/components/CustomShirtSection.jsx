import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TF_FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';

export const CustomShirtSection = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    setTimeout(() => {
      navigate("/pages/custom-shirts");
    }, 1400);
  };

  return (
    <>
      <style>{`
        @keyframes cssFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .css-success { animation: cssFadeIn 0.4s ease; }
        @media (max-width: 640px) {
          .cs-panel { padding: 40px 28px !important; }
        }
      `}</style>

      <section
        id="custom-shirts"
        aria-label="Custom Shirt Offer"
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          minHeight: "420px",
        }}
      >
        {/* LEFT: Lifestyle Image */}
        <div
          style={{
            flex: "1 1 50%",
            minWidth: "300px",
            position: "relative",
            overflow: "hidden",
            minHeight: "420px",
          }}
        >
          <img
            src="/images/hero_chartreuse.jpg"
            alt="Monzato Custom Shirts Atelier"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              transition: "transform 0.7s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* RIGHT: Dark Info + Email Panel */}
        <div
          className="cs-panel"
          style={{
            flex: "1 1 50%",
            minWidth: "300px",
            background: "#111",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(44px, 6vw, 88px) clamp(32px, 5vw, 72px)",
            boxSizing: "border-box",
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: TF_FONT,
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.25em",
              color: "#888",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Exclusively Yours
          </p>

          {/* Headline */}
          <h2
            style={{
              fontFamily: TF_FONT,
              fontSize: "clamp(22px, 3vw, 38px)",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "#fff",
              textTransform: "uppercase",
              margin: "0 0 14px 0",
              lineHeight: 1.1,
            }}
          >
            Custom Shirts,
            <br />
            Crafted for You
          </h2>

          {/* Body */}
          <p
            style={{
              fontFamily: TF_FONT,
              fontSize: "12px",
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: "#aaa",
              lineHeight: 1.85,
              marginBottom: "36px",
              maxWidth: "360px",
            }}
          >
            Experience the art of bespoke tailoring. Every shirt is made to
            your exact measurements � your fabric, your fit, your expression.
            Share your email and we will guide you through every step.
          </p>

          {/* Email Form / Success */}
          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ maxWidth: "380px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    borderBottom: `1px solid ${error ? "#e05252" : "#444"}`,
                    alignItems: "center",
                    paddingBottom: "2px",
                    transition: "border-color 0.2s",
                  }}
                >
                  <input
                    id="cs-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="YOUR EMAIL ADDRESS"
                    aria-label="Email for custom shirt enquiry"
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontFamily: TF_FONT,
                      fontSize: "11px",
                      fontWeight: 400,
                      letterSpacing: "0.14em",
                      color: "#fff",
                      textTransform: "uppercase",
                      padding: "8px 0",
                      caretColor: "#fff",
                    }}
                  />
                  <button
                    type="submit"
                    aria-label="Submit"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#fff",
                      fontSize: "22px",
                      lineHeight: 1,
                      padding: "0 4px 2px",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.45")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    ?
                  </button>
                </div>

                {error && (
                  <p style={{ fontFamily: TF_FONT, fontSize: "10px", letterSpacing: "0.08em", color: "#e05252", margin: 0, textTransform: "uppercase" }}>
                    {error}
                  </p>
                )}

                <p style={{ fontFamily: TF_FONT, fontSize: "9px", letterSpacing: "0.05em", color: "#555", margin: 0, textTransform: "uppercase", lineHeight: 1.6 }}>
                  By submitting you agree to our{" "}
                  <a href="/privacy-policy" style={{ color: "#777", textDecoration: "underline" }}>Privacy Policy</a>.
                </p>
              </div>
            </form>
          ) : (
            <div className="css-success" style={{ maxWidth: "380px" }}>
              <p style={{ fontFamily: TF_FONT, fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "#c8a96e", textTransform: "uppercase", marginBottom: "8px" }}>
                ? Received
              </p>
              <p style={{ fontFamily: TF_FONT, fontSize: "12px", letterSpacing: "0.05em", color: "#aaa", lineHeight: 1.7 }}>
                Thank you. Taking you to our Custom Shirts page...
              </p>
            </div>
          )}

          {/* Divider */}
          <div style={{ width: "40px", height: "1px", background: "#2a2a2a", margin: "36px 0" }} />

          {/* Direct CTA link */}
          <a
            href="/pages/custom-shirts"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: TF_FONT,
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "#fff",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.45")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Explore Custom Shirts
            <span style={{ fontSize: "18px", lineHeight: 1 }}>?</span>
          </a>
        </div>
      </section>
    </>
  );
};
