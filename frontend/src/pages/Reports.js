import { useEffect, useState } from "react";
import API from "../api";

function Reports() {

    const [reportData, setReportData] = useState([]);
    const [groupedData, setGroupedData] = useState({});
    const [loading, setLoading] = useState(true);

    const loadReport = async () => {
        try {
            const res = await API.get("/reports");
            const data = res.data;

            setReportData(data);

            const grouped = {};
            data.forEach(item => {
                if (!grouped[item.emp_id]) {
                    grouped[item.emp_id] = {
                        emp_id: item.emp_id,
                        emp_name: item.emp_name,
                        responsibility: item.responsibility,
                        salaries: [],
                        totalSalary: 0
                    };
                }

                if (item.salary_id) {
                    grouped[item.emp_id].salaries.push({
                        salary_id: item.salary_id,
                        paydate: item.paydate,
                        amount: item.amount
                    });
                    grouped[item.emp_id].totalSalary += parseFloat(item.amount);
                }
            });

            setGroupedData(grouped);
        } catch (err) {
            console.error("Failed to load report:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReport();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Employee Salary Report</h1>
                    <p className="text-gray-600">Loading report...</p>
                </div>
            </div>
        );
    }

    const employees = Object.values(groupedData);

    const grandTotal = employees.reduce((sum, emp) => sum + emp.totalSalary, 0);
    const totalPayments = employees.reduce((sum, emp) => sum + emp.salaries.length, 0);

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Employee Salary Report
                    </h1>
                    <button
                        onClick={loadReport}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Refresh
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700">Total Employees</h3>
                        <p className="text-3xl font-bold text-blue-500">{employees.length}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700">Total Payments</h3>
                        <p className="text-3xl font-bold text-green-500">{totalPayments}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700">Grand Total Salary</h3>
                        <p className="text-3xl font-bold text-purple-500">
                            {grandTotal.toLocaleString()}
                        </p>
                    </div>

                </div>

                {employees.length === 0 ? (
                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <p className="text-gray-500">No data available. Please add employees and salaries first.</p>
                    </div>
                ) : (
                    <div className="space-y-6">

                        {employees.map(emp => (
                            <div key={emp.emp_id} className="bg-white rounded-lg shadow-md overflow-hidden">

                                <div className="bg-gray-200 px-6 py-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">
                                                {emp.emp_name}
                                            </h2>
                                            <p className="text-gray-600">
                                                ID: {emp.emp_id} | Role: {emp.responsibility}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">Total Salary</p>
                                            <p className="text-2xl font-bold text-green-500">
                                                {emp.totalSalary.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {emp.salaries.length === 0 ? (
                                    <div className="px-6 py-4 text-gray-500 italic">
                                        No salary records found
                                    </div>
                                ) : (
                                    <table className="w-full">
                                        <thead className="bg-gray-50 text-gray-700">
                                            <tr>
                                                <th className="px-6 py-3 text-left">Payment ID</th>
                                                <th className="px-6 py-3 text-left">Date</th>
                                                <th className="px-6 py-3 text-left">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {emp.salaries.map(s => (
                                                <tr key={s.salary_id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">{s.salary_id}</td>
                                                    <td className="px-6 py-4">{s.paydate}</td>
                                                    <td className="px-6 py-4 font-semibold">
                                                        {parseFloat(s.amount).toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default Reports;
