import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const register = async () => {

        try {
            await API.post("/register", {
                username,
                password
            });

            navigate("/");

        } catch (err) {
            console.error(err.response?.data?.message || err.message);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Signup
                </h2>

                <input
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
                    onClick={register}
                >
                    Signup
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?
                    <Link to="/" className="text-green-500 hover:underline ml-1">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Signup;
