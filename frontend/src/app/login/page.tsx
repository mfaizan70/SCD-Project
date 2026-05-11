"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. PEHLE CHECK KARO: Kya ye humara fix password hai?
      if (form.username === "sabiha" && form.password === "sabiha123") {
        localStorage.setItem("token", "bypass-token-123");
        router.push("/admin");
        return;
      }

      // 2. BACKEND CHECK
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        router.push("/admin");
      } else {
        alert("Ghalat Username ya Password!");
      }
    } catch (err) {
      if (form.username === "sabiha" && form.password === "sabiha123") {
        localStorage.setItem("token", "offline-token");
        router.push("/admin");
      } else {
        alert("Backend band hai! Sahi details dalo");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="glow-circle"></div>

      <div className="auth-card">
        <div className="brand-side">
          <div className="glass-effect">
            <span className="badge">SYSTEM ACCESS</span>

            <h1>
              CAREER<span>AI</span>
            </h1>

            <p>
              Your journey to a professional career starts here.
              Securely manage your path.
            </p>
          </div>
        </div>

        <div className="form-side">
          <h2>Login</h2>

          <p className="subtitle">
            Please enter your account details
          </p>

          <form onSubmit={handleLogin}>
            
            {/* Username Hidden */}
            <div className="input-field">
              <label>Username</label>

              <input
                type="password"
                placeholder="••••••••"
                value={form.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Password Hidden */}
            <div className="input-field">
              <label>Password</label>

              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>

          <p className="footer-link">
            Need help? <span>Contact Admin</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .auth-container {
          height: 100vh;
          background: #020617;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          font-family: "Inter", sans-serif;
        }

        .glow-circle {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(
            circle,
            rgba(59, 130, 246, 0.15) 0%,
            transparent 70%
          );
          z-index: 1;
        }

        .auth-card {
          width: 950px;
          height: 550px;
          background: white;
          border-radius: 32px;
          display: flex;
          overflow: hidden;
          z-index: 10;
          box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.5);
        }

        .brand-side {
          flex: 1;
          background: url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")
            center/cover;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          position: relative;
        }

        .brand-side::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.85);
        }

        .glass-effect {
          position: relative;
          z-index: 2;
          text-align: left;
        }

        .badge {
          background: #3b82f6;
          color: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .brand-side h1 {
          font-size: 48px;
          color: white;
          margin: 20px 0;
          font-weight: 900;
        }

        .brand-side h1 span {
          color: #3b82f6;
        }

        .brand-side p {
          color: #94a3b8;
          line-height: 1.6;
          font-size: 16px;
        }

        .form-side {
          flex: 1.2;
          padding: 60px;
          background: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .form-side h2 {
          font-size: 32px;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .subtitle {
          color: #64748b;
          margin-bottom: 40px;
          font-size: 15px;
        }

        .input-field {
          margin-bottom: 25px;
        }

        .input-field label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #334155;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .input-field input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          transition: 0.3s;
        }

        .input-field input:focus {
          border-color: #3b82f6;
          outline: none;
          background: white;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .login-button {
          width: 100%;
          padding: 16px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 14px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
          margin-top: 10px;
        }

        .login-button:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
        }

        .login-button:disabled {
          background: #94a3b8;
          cursor: not-allowed;
        }

        .footer-link {
          margin-top: 30px;
          text-align: center;
          font-size: 14px;
          color: #64748b;
        }

        .footer-link span {
          color: #2563eb;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .auth-card {
            width: 95%;
            height: auto;
            flex-direction: column;
          }

          .brand-side {
            padding: 60px 40px;
          }
        }
      `}</style>
    </div>
  );
}