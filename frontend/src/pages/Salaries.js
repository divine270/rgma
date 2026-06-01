import { useEffect, useState } from "react";
import API from "../api";

function Salaries() {

    const [salaries, setSalaries] = useState([]);
    const [emp_id, setEmpId] = useState("");
    const [paydate, setPaydate] = useState("");
    const [amount, setAmount] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editEmpId, setEditEmpId] = useState("");
    const [editPaydate, setEditPaydate] = useState("");
    const [editSalary, setEditSalary] = useState("");
    const [searchName, setSearchName] = useState("");

    const load = async () => {
        const res = await API.get("/salaries");
        setSalaries(res.data);
    };

    useEffect(() => {
        load();
    }, []);

    const addSalary = async () => {
        await API.post("/salaries", {
            emp_id,
            paydate,
            amount
        });
        setEmpId("");
        setPaydate("");
        setAmount("");
        load();
    };

    const deleteSalary = async (id) => {
        await API.delete(`/salaries/${id}`);
        load();
    };

    const startEdit = (s) => {
        setEditingId(s.salary_id);
        setEditEmpId(s.emp_id);
        setEditPaydate(s.paydate);
        setEditSalary(s.amount);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditEmpId("");
        setEditPaydate("");
        setEditSalary("");
    };

    const updateSalary = async () => {
        await API.put(`/salaries/${editingId}`, {
            emp_id: editEmpId,
            paydate: editPaydate,
            amount: editSalary
        });
        setEditingId(null);
        setEditEmpId("");
        setEditPaydate("");
        setEditSalary("");
        load();
    };

    const filteredSalaries = salaries.filter(s =>
        s.emp_name.toLowerCase().includes(searchName.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Salaries
                </h1>

                <div className="bg-white p-6 rounded-lg shadow-md mb-8">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

                        <input
                            type="number"
                            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Employee ID"
                            value={emp_id}
                            onChange={(e) => setEmpId(e.target.value)}
                        />

                        <input
                            type="date"
                            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={paydate}
                            onChange={(e) => setPaydate(e.target.value)}
                        />

                        <input
                            type="number"
                            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                    </div>

                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200"
                        onClick={addSalary}
                    >
                        Add Salary
                    </button>

                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mb-8">

                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search by employee name..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />

                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-200 text-gray-700">

                            <tr>
                                <th className="px-6 py-3 text-left">ID</th>
                                <th className="px-6 py-3 text-left">Employee</th>
                                <th className="px-6 py-3 text-left">Date</th>
                                <th className="px-6 py-3 text-left">Amount</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-200">

                            {filteredSalaries.map(s => (

                                <tr key={s.salary_id} className="hover:bg-gray-50">

                                    {editingId === s.salary_id ? (

                                        <>
                                            <td className="px-6 py-4">{s.salary_id}</td>

                                            <td className="px-6 py-4">
                                                <input
                                                    type="number"
                                                    className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={editEmpId}
                                                    onChange={(e) => setEditEmpId(e.target.value)}
                                                />
                                            </td>

                                            <td className="px-6 py-4">
                                                <input
                                                    type="date"
                                                    className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={editPaydate}
                                                    onChange={(e) => setEditPaydate(e.target.value)}
                                                />
                                            </td>

                                            <td className="px-6 py-4">
                                                <input
                                                    type="number"
                                                    className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={editSalary}
                                                    onChange={(e) => setEditSalary(e.target.value)}
                                                />
                                            </td>

                                            <td className="px-6 py-4 space-x-2">

                                                <button
                                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200"
                                                    onClick={updateSalary}
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
                                            <td className="px-6 py-4">{s.salary_id}</td>
                                            <td className="px-6 py-4">{s.emp_name}</td>
                                            <td className="px-6 py-4">{s.paydate}</td>
                                            <td className="px-6 py-4">{s.amount}</td>

                                            <td className="px-6 py-4 space-x-2">

                                                <button
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-200"
                                                    onClick={() => startEdit(s)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                                                    onClick={() => deleteSalary(s.salary_id)}
                                                >
                                                    Delete
                                                </button>

                                            </td>
                                        </>

                                    )}

                                </tr>

                            ))}

                            {filteredSalaries.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-4 text-center text-gray-500"
                                    >
                                        No salaries found
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

export default Salaries;
