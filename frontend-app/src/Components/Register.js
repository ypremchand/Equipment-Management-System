import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const [isRegister, setIsRegister] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isRegister
      ? "http://localhost:5083/api/user/register"
      : "http://localhost:5083/api/user/login";

    const payload = isRegister
      ? { name: form.name, email: form.email, password: form.password }
      : { email: form.email, password: form.password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const data = await res.json();
      setMessage(
        data.message ||
          (isRegister ? "Registration successful!" : "Login successful!")
      );

      if (isRegister) setIsRegister(false);
    } catch (err) {
      console.error(err);
      setMessage("Server error or invalid credentials");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <h2 className="text-center mb-4 text-primary fw-bold">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  className="form-control"
                  placeholder="Enter your name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                className="form-control"
                placeholder="Enter your email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                placeholder="Enter your password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2">
              {isRegister ? "Register" : "Login"}
            </button>
          </form>

          {message && (
            <div className="alert alert-info mt-3 text-center p-2">
              {message}
            </div>
          )}

          <div className="text-center mt-3">
            {isRegister ? (
              <small>
                Already have an account?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none"
                  onClick={() => setIsRegister(false)}
                >
                  Login
                </button>
              </small>
            ) : (
              <small>
                Don’t have an account?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none"
                  onClick={() => setIsRegister(true)}
                >
                  Sign Up
                </button>
              </small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
