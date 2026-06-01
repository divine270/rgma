import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-purple-100 p-8">

            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold mb-4 text-gray-800">
                    HR Dashboard
                </h1>

                <p className="text-gray-600 mb-8">
                    Welcome to Rugoma Global Technologies HR System
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    <button
                        className="bg-blue-500 text-white py-4 rounded-lg shadow hover:bg-blue-600 transition duration-200"
                        onClick={() => navigate("/employees")}
                    >
                        Employees
                    </button>

                    <button
                        className="bg-green-500 text-white py-4 rounded-lg shadow hover:bg-green-600 transition duration-200"
                        onClick={() => navigate("/salaries")}
                    >
                        Salaries
                    </button>

                    <button
                        className="bg-purple-500 text-white py-4 rounded-lg shadow hover:bg-purple-600 transition duration-200"
                        onClick={() => alert("Departments page coming soon")}
                    >
                        Departments
                    </button>

                    <button
                        className="bg-pink-500 text-white py-4 rounded-lg shadow hover:bg-pink-600 transition duration-200"
                        onClick={() => navigate("/reports")}
                    >
                        Reports
                    </button>

                </div>

                <br />

                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/");
                    }}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Dashboard;
