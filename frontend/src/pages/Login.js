import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async () => {

        setError("");
        setLoading(true);

        try {
            console.log("Attempting login with:", { username, password });

            const res = await API.post("/login", {
                username,
                password
            });

            console.log("Login response:", res.data);

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                console.log("Token stored, navigating to dashboard");
                navigate("/dashboard");
            } else {
                setError("No token received from server");
            }

        } catch (err) {
            console.error("Login error:", err);
            const message = err.response?.data?.message || err.message || "Login failed";
            setError(message);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-500">

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Login
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <input
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                />

                <input
                    type="password"
                    className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />

                <button
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={login}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?
                    <Link to="/signup" className="text-blue-500 hover:underline ml-1">
                        Signup
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;
