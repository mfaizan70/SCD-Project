"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    education: "Computer Science",
    skills: "Programming",
    interests: "Technology",
  });

  const [career, setCareer] = useState("");
  const [benefits, setBenefits] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) return alert("Enter your name");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/career/recommend", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      const text = (data?.recommendation || "No response").trim();
      const parts = text.split(/Benefits:/i);

      setCareer(parts[0]?.replace(/Career:/i, "").trim() || text);
      setBenefits(parts[1]?.trim() || "Growth opportunities and high demand.");
    } catch (err) {
      alert("Backend not responding");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="page">
      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      <div className="card">
        {/* LEFT SIDE - Original Look */}
        <div className="left">
          <div className="badge">AI CAREER ENGINE</div>
          <h1>Build Your <span>Future Career</span></h1>
          <p>AI analyzes your profile and gives you the best career path.</p>
          <div className="imgBox">
            <img src="/image.png" alt="career" className="mix-image" />
          </div>
        </div>

        {/* RIGHT SIDE - Original Structure */}
        <div className="right">
          <h2>Profile Setup</h2>

          <label><b>Full Name</b></label>
          <input name="name" placeholder="Enter your name" onChange={handleChange} />

          <label><b>Education</b></label>
          <select name="education" onChange={handleChange}>
            <option>Computer Science</option>
            <option>Medical Science</option>
            <option>Business</option>
            <option>Engineering</option>
            <option>Arts</option>
          </select>

          <label><b>Skills</b></label>
          <select name="skills" onChange={handleChange}>
            <option>Programming</option>
            <option>Data Analysis</option>
            <option>UI/UX Designing</option>
            <option>Cyber Security</option>
            <option>AI / Machine Learning</option>
            <option>Digital Marketing</option>
          </select>

          <label><b>Interests</b></label>
          <select name="interests" onChange={handleChange}>
            <option>Technology</option>
            <option>Business</option>
            <option>Finance</option>
            <option>Healthcare</option>
            <option>Creative Arts</option>
          </select>

          <button className="get-btn" onClick={handleSubmit}>
            {loading ? "Analyzing..." : "Get Career Path"}
          </button>

          {/* RESULT BOX - Simple, Small, and Complete */}
          {career && (
            <div className="resultBox">
              <h3>Career Suggestion</h3>
              <p>{career}</p>
              <h3>Benefits</h3>
              <p>{benefits}</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .page { height: 100vh; display: flex; justify-content: center; align-items: center; background: #020617; position: relative; }
        .logout-btn { position: absolute; top: 20px; right: 20px; background: transparent; color: #f87171; border: 1px solid #f87171; padding: 5px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; }
        .card { width: 1000px; height: 600px; display: flex; border-radius: 20px; overflow: hidden; background: white; box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
        .left { flex: 1; padding: 40px; background: #1e293b; color: white; display: flex; flex-direction: column; }
        .badge { background: rgba(56,189,248,0.15); color: #38bdf8; padding: 6px 12px; font-size: 11px; border-radius: 20px; width: fit-content; }
        .left h1 { font-size: 34px; margin: 15px 0; }
        .left h1 span { color: #38bdf8; }
        .left p { color: #94a3b8; font-size: 14px; }
        .imgBox { flex: 1; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .mix-image { width: 100%; object-fit: contain; mix-blend-mode: multiply; }
        
        .right { flex: 1; padding: 40px; display: flex; flex-direction: column; gap: 8px; overflow-y: auto; }
        input, select { padding: 10px; border-radius: 8px; border: 1px solid #ddd; font-size: 14px; }
        .get-btn { margin-top: 10px; padding: 12px; border: none; border-radius: 10px; background: #2563eb; color: white; font-weight: bold; cursor: pointer; }
        
        /* Result Box - Simple and Auto-height */
        .resultBox { 
          margin-top: 15px; 
          padding: 15px; 
          background: #f0f9ff; 
          border-radius: 10px; 
          color: #075985; 
          border-left: 4px solid #38bdf8;
          height: auto; /* Taake result pura dikhay */
        }
        .resultBox h3 { font-size: 13px; margin-top: 8px; font-weight: 600; text-transform: uppercase; }
        .resultBox p { font-size: 13px; margin-top: 4px; line-height: 1.4; font-weight: normal; }
      `}</style>
    </div>
  );
}