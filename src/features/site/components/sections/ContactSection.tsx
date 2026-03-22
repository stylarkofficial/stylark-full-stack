import { useMemo, useState } from "react";
import { useScrollReveal } from "../../../../hooks/useScrollReveal";
import { getApiBaseUrls } from "../../../../config/api";
import { useLiquidRippleEffect } from "../../hooks/useLiquidRippleEffect";

export function ContactSection() {
  const ref = useScrollReveal();
  const rippleHandler = useLiquidRippleEffect();
  const [formState, setFormState] = useState({ name: "", email: "", projectType: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const configuredApiBaseUrl = (
    (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_API_URL || ""
  ).trim();
  const apiBaseUrls = useMemo(() => getApiBaseUrls(configuredApiBaseUrl), [configuredApiBaseUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (submitError) setSubmitError("");
    if (submitSuccess) setSubmitSuccess("");
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!formState.name.trim() || !formState.email.trim() || !formState.projectType || !formState.message.trim()) {
      setSubmitError("Please fill in all fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      let lastNetworkError: Error | null = null;

      for (const apiBaseUrl of apiBaseUrls) {
        try {
          const response = await fetch(`${apiBaseUrl}/api/v1/contact/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formState.name.trim(),
              email: formState.email.trim(),
              project_type: formState.projectType,
              message: formState.message.trim(),
            }),
          });

          let data: any = null;
          try {
            data = await response.json();
          } catch {
            data = null;
          }

          if (!response.ok) {
            throw new Error(data?.detail || data?.error || `Request failed (${response.status}).`);
          }

          setSubmitSuccess(data?.message || "Thank you. We've received your inquiry.");
          setFormState({ name: "", email: "", projectType: "", message: "" });
          return;
        } catch (error) {
          if (error instanceof TypeError) {
            lastNetworkError = error;
            continue;
          }
          throw error;
        }
      }

      if (lastNetworkError) {
        throw new Error(
          "Couldn't reach the backend server. Start backend from /backend using `python run.py`, then try again."
        );
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "16px",
    fontWeight: 300,
    color: "#0E0E0E",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid #E8E8E6",
    padding: "16px 0",
    width: "100%",
    transition: "border-color 0.4s ease",
  };

  const statusPanelBaseStyle: React.CSSProperties = {
    marginTop: "20px",
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    backdropFilter: "blur(8px)",
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: "#FFFFFF", paddingTop: "160px", paddingBottom: "160px" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="reveal" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A962",
              marginBottom: "32px",
            }}>
              Contact
            </p>
            <h2 className="reveal reveal-delay-1 section-heading" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "#0E0E0E",
              marginBottom: "32px",
            }}>
              Let's Build<br />Together.
            </h2>
            <p className="reveal reveal-delay-2" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "17px",
              fontWeight: 300,
              lineHeight: 1.85,
              color: "#6E6E6E",
            }}>
              Share your vision. We'll assess feasibility, define scope,
              and architect a path forward â€” with precision.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <div className="reveal reveal-delay-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formState.name}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderBottomColor = "#C9A962"; }}
                onBlur={(e) => { e.currentTarget.style.borderBottomColor = "#E8E8E6"; }}
              />
            </div>
            <div className="reveal reveal-delay-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formState.email}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderBottomColor = "#C9A962"; }}
                onBlur={(e) => { e.currentTarget.style.borderBottomColor = "#E8E8E6"; }}
              />
            </div>
            <div className="reveal reveal-delay-4">
              <select
                name="projectType"
                value={formState.projectType}
                onChange={handleChange}
                required
                style={{
                  ...inputStyle,
                  appearance: "none",
                  color: formState.projectType ? "#0E0E0E" : "#AAAAAA",
                  cursor: "pointer",
                }}
                onFocus={(e) => { e.currentTarget.style.borderBottomColor = "#C9A962"; }}
                onBlur={(e) => { e.currentTarget.style.borderBottomColor = "#E8E8E6"; }}
              >
                <option value="" disabled>Project Type</option>
                <option value="website">Custom / 3D Website</option>
                <option value="ecommerce">eCommerce</option>
                <option value="ai">AI Integration</option>
                <option value="enterprise">Enterprise Platform</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="reveal reveal-delay-5">
              <textarea
                name="message"
                placeholder="Tell us about your project"
                rows={4}
                value={formState.message}
                onChange={handleChange}
                required
                minLength={10}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => { e.currentTarget.style.borderBottomColor = "#C9A962"; }}
                onBlur={(e) => { e.currentTarget.style.borderBottomColor = "#E8E8E6"; }}
              />
            </div>
            <div className="reveal reveal-delay-6">
              <button
                type="submit"
                onClick={rippleHandler}
                className="btn-primary btn-submit"
                disabled={isSubmitting}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  backgroundColor: "#0E0E0E",
                  color: "#FFFFFF",
                  padding: "20px 56px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  position: "relative",
                  overflow: "hidden",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2F5BFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#0E0E0E";
                }}
              >
                {isSubmitting ? "Submitting..." : "Begin Collaboration"}
              </button>
              {submitError && (
                <div style={{
                  ...statusPanelBaseStyle,
                  background: "linear-gradient(135deg, rgba(180, 35, 24, 0.08), rgba(180, 35, 24, 0.03))",
                  borderColor: "rgba(180, 35, 24, 0.22)",
                }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#9F1E13",
                  }}>
                    Submission Failed
                  </span>
                  <p style={{
                    margin: 0,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#7F1D1D",
                    lineHeight: 1.6,
                  }}>
                    {submitError}
                  </p>
                </div>
              )}
              {submitSuccess && (
                <div style={{
                  ...statusPanelBaseStyle,
                  background: "linear-gradient(135deg, rgba(2, 122, 72, 0.09), rgba(2, 122, 72, 0.03))",
                  borderColor: "rgba(2, 122, 72, 0.22)",
                }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#05603A",
                  }}>
                    Inquiry Received
                  </span>
                  <p style={{
                    margin: 0,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#065F46",
                    lineHeight: 1.6,
                  }}>
                    {submitSuccess}
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

