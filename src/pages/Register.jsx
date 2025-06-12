import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Use shared auth context

const Register = () => {
  const navigate = useNavigate();
  const { createUser } = useAuth(); // ✅ Get createUser from context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await createUser(email, password); // ✅ use context-based method
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMsg("Email already in use. Try logging in.");
          break;
        case "auth/invalid-email":
          setErrorMsg("Invalid email address.");
          break;
        case "auth/weak-password":
          setErrorMsg("Password should be at least 6 characters.");
          break;
        default:
          setErrorMsg("Registration failed. Please try again.");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Register</h2>

      {errorMsg && (
        <div className="text-red-600 border border-red-500 p-2 rounded">
          {errorMsg}
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
