import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | change
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  // ---------------- LOGIN ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(
        "https://ac-backend-cpsu.onrender.com/adminlog/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        // 🧠 FIRST LOGIN → FORCE PASSWORD CHANGE
        if (data.firstLogin) {
          setIsFirstLogin(true);
          setMode("change");
          setOldPassword(password);
          setSuccess("First login detected. Please set a new password.");
          return;
        }

        localStorage.setItem("isAdmin", "true");
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
        triggerShake();
      }
    } catch {
      setError("Server error. Please try again later.");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  // ---------------- CHANGE PASSWORD ----------------
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      triggerShake();
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      triggerShake();
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://ac-backend-cpsu.onrender.com/adminlog/change-password",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            oldPassword,
            newPassword,
          }),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess("Password updated successfully. Redirecting...");
        setTimeout(() => {
          localStorage.setItem("isAdmin", "true");
          navigate("/admin/dashboard");
        }, 1200);
      } else {
        setError(data.message || "Failed to update password");
        triggerShake();
      }
    } catch {
      setError("Server error. Please try again later.");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #1e3a8a, #0f172a)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className={`backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl p-10 max-w-md w-full shadow-xl text-white ${
          shake ? "animate-shake" : ""
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          {mode === "login" ? "Admin Login" : "Set New Password"}
        </h2>

        {error && (
          <p className="text-red-300 text-sm mb-4 text-center">{error}</p>
        )}

        {success && (
          <p className="text-green-300 text-sm mb-4 text-center">{success}</p>
        )}

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 bg-white/30 rounded-xl"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-white/30 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 rounded-xl font-semibold hover:bg-purple-700"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleChangePassword} className="space-y-5">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 bg-white/30 rounded-xl"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isFirstLogin}
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-3 bg-white/30 rounded-xl"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-4 py-3 bg-white/30 rounded-xl"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 rounded-xl font-semibold hover:bg-purple-700"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%,60% { transform: translateX(-8px); }
          40%,80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default AdminLogin;
