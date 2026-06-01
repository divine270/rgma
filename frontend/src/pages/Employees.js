import { useEffect, useState } from "react";
import API from "../api";

function Employees() {

    const [employees, setEmployees] = useState([]);
    const [emp_name, setName] = useState("");
    const [responsibility, setRole] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editRole, setEditRole] = useState("");

    const load = async () => {
        const res = await API.get("/employees");
        setEmployees(res.data);
    };

    useEffect(() => {
        load();
    }, []);

    const addEmployee = async () => {
        await API.post("/employees", {
            emp_name,
            responsibility
        });
        setName("");
        setRole("");
        load();
    };

    const deleteEmployee = async (id) => {
        await API.delete(`/employees/${id}`);
        load();
    };

    const startEdit = (emp) => {
        setEditingId(emp.emp_id);
        setEditName(emp.emp_name);
        setEditRole(emp.responsibility);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditName("");
        setEditRole("");
    };

    const updateEmployee = async () => {
        await API.put(`/employees/${editingId}`, {
            emp_name: editName,
            responsibility: editRole
        });
        setEditingId(null);
        setEditName("");
        setEditRole("");
        load();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Employees
                </h1>

                <div className="bg-white p-6 rounded-lg shadow-md mb-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                        <input
                            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Name"
                            value={emp_name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Role"
                            value={responsibility}
                            onChange={(e) => setRole(e.target.value)}
                        />

                    </div>

                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200"
                        onClick={addEmployee}
                    >
                        Add Employee
                    </button>

                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-200 text-gray-700">

                            <tr>
                                <th className="px-6 py-3 text-left">ID</th>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Role</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-200">

                            {employees.map(emp => (

                                <tr key={emp.emp_id} className="hover:bg-gray-50">

                                    {editingId === emp.emp_id ? (

                                        <>
                                            <td className="px-6 py-4">{emp.emp_id}</td>

                                            <td className="px-6 py-4">
                                                <input
                                                    className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                />
                                            </td>

                                            <td className="px-6 py-4">
                                                <input
                                                    className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={editRole}
                                                    onChange={(e) => setEditRole(e.target.value)}
                                                />
                                            </td>

                                            <td className="px-6 py-4 space-x-2">

                                                <button
                                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200"
                                                    onClick={updateEmployee}
                                                >
                                                    Save
                                                </button>

                                                <button
                                                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition duration-200"
                                                    onClick={cancelEdit}
                                                >
                                                    Cancel
                                                </button>

                                            </td>
                                        </>

                                    ) : (

                                        <>
                                            <td className="px-6 py-4">{emp.emp_id}</td>
                                            <td className="px-6 py-4">{emp.emp_name}</td>
                                            <td className="px-6 py-4">{emp.responsibility}</td>

                                            <td className="px-6 py-4 space-x-2">

                                                <button
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-200"
                                                    onClick={() => startEdit(emp)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                                                    onClick={() => deleteEmployee(emp.emp_id)}
                                                >
                                                    Delete
                                                </button>

                                            </td>
                                        </>

                                    )}

                                </tr>

                            ))}

                            {employees.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-6 py-4 text-center text-gray-500"
                                    >
                                        No employees found
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Employees;
