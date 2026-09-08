import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [errData, setErrData] = useState({ errEmail: "", errPassword: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setData({ ...data, [field]: value });
    if (value !== "") {
      setErrData({ ...errData, [`err${field.charAt(0).toUpperCase()}${field.slice(1)}`]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userError = { errEmail: "", errPassword: "" };
    let isValid = true;

    if (!data.email) {
      userError.errEmail = "You must fill this input";
      isValid = false;
    }
    if (!data.password) {
      userError.errPassword = "You must fill this input";
      isValid = false;
    }

    setErrData(userError);

    if (!isValid) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_ROOT_URL}/login`,
        { email: data.email, password: data.password },
        { withCredentials: true }
      );

      const { accessToken, data: userData } = res.data;

      if (userData.role !== "admin") {
        toast.error("This account doesn't have admin access");
        return;
      }

      login(accessToken, userData.role);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-form-side">
          <div className="login-card-inner">
            <h1 className="login-title">Log in.</h1>
            <p className="login-subtitle">Login with your admin credentials.</p>

            <form onSubmit={handleSubmit}>
              <Field
                label="Your e-mail"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={handleChange("email")}
                error={errData.errEmail}
              />

              <Field
                label="Password"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleChange("password")}
                error={errData.errPassword}
              />

              <label className="checkbox-row">
                <input type="checkbox" />
                <span>Keep me logged in</span>
              </label>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Signing in..." : "Log In"}
              </button>
            </form>
          </div>
        </div>

        <div className="login-illustration-side">
          <img src="/home.jpg" alt="Travel agency" className="illustration-photo" />
          <div className="illustration-overlay">
            <h2>No account yet?</h2>
            <p>
              Contact us at <span className="highlight">admin@phnestravel.com</span> and we'll set you up.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const Field = ({ label, id, type, placeholder, value, onChange, error }) => (
  <div className="field-wrap">
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
    {error && <p className="field-error">{error}</p>}
  </div>
);