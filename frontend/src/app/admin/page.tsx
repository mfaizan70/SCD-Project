"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [view, setView] = useState("dashboard");
  const router = useRouter();

  // Is function se aapka wo purana Profile Setup wala page wapas ayega
  const openCareerBuilder = () => {
    router.push("/profile"); // Agar aapne file ka naam profile rakha hai
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainCard}>
        {/* SIDEBAR */}
        <aside style={styles.sidebar}>
          <div style={styles.logoSection}>
            <div style={styles.logoIcon}>🚀</div>
            <h2 style={styles.logoText}>CAREER<span style={{ color: "#3b82f6" }}>.PRO</span></h2>
          </div>
          
          <nav style={{ flex: 1 }}>
            <button onClick={() => setView("dashboard")} style={navBtnStyle(view === "dashboard")}>📊 Overview</button>
            
            {/* YE BUTTON AAPKO PROFILE SETUP PE LE JAYEGA */}
            <button onClick={openCareerBuilder} style={specialBtnStyle}>
              ✨ Build Career Profile
            </button>
            
            <button onClick={() => setView("users")} style={navBtnStyle(view === "users")}>👥 User Management</button>
          </nav>

          <button onClick={() => router.push("/login")} style={styles.logoutBtn}>Sign Out</button>
        </aside>

        {/* MAIN CONTENT */}
        <main style={styles.content}>
          <header style={styles.header}>
            <h1>{view === "dashboard" ? "System Insights" : "User Base"}</h1>
            <p>Manage your AI career engine and user data.</p>
          </header>

          {view === "dashboard" && (
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <p>Total Revenue</p>
                <h2>$12,450</h2>
                <span style={{ color: "#10b981" }}>+12.5%</span>
              </div>
              <div style={styles.statCard}>
                <p>Active Users</p>
                <h2>1,284</h2>
                <span style={{ color: "#3b82f6" }}>+5.2%</span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Styling (Shortened for clarity)
const styles: any = {
  container: { backgroundColor: "#020617", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" },
  mainCard: { width: "95%", maxWidth: "1200px", height: "85vh", backgroundColor: "#1e293b", borderRadius: "30px", display: "flex", overflow: "hidden", color: "white" },
  sidebar: { width: "260px", padding: "40px 20px", display: "flex", flexDirection: "column", borderRight: "1px solid rgba(255,255,255,0.05)" },
  logoSection: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px" },
  logoIcon: { background: "#2563eb", padding: "8px", borderRadius: "10px" },
  logoText: { margin: 0, fontSize: "20px" },
  content: { flex: 1, padding: "50px" },
  header: { marginBottom: "30px" },
  statsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  statCard: { background: "rgba(255,255,255,0.03)", padding: "25px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" },
  logoutBtn: { padding: "12px", background: "transparent", border: "1px solid #ef4444", color: "#ef4444", borderRadius: "12px", cursor: "pointer" }
};

const navBtnStyle = (active: boolean) => ({
  width: "100%", textAlign: "left" as const, padding: "12px 15px", borderRadius: "12px", border: "none", marginBottom: "10px",
  background: active ? "#2563eb" : "transparent", color: active ? "white" : "#94a3b8", cursor: "pointer", fontWeight: "bold"
});

const specialBtnStyle = {
  width: "100%", textAlign: "left" as const, padding: "12px 15px", borderRadius: "12px", border: "none", marginBottom: "10px",
  background: "linear-gradient(90deg, #3b82f6, #8b5cf6)", color: "white", cursor: "pointer", fontWeight: "bold"
};
