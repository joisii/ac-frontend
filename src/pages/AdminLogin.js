import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch("https://ac-backend-cpsu.onrender.com/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(135deg, #1e3a8a, #0f172a)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl p-10 max-w-md w-full shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] text-white">
        <h2 className="text-3xl font-bold text-center mb-8 drop-shadow-md">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-300 text-sm mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 bg-white/30 text-white placeholder-white/80 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-white/30 text-white placeholder-white/80 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition duration-300 text-white py-3 rounded-xl font-semibold shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
