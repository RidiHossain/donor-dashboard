'use client';

import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Donor {
  name: string;
  address: string;
  email: string;
  phone: string;
  amount: string;
  donated: string;
  due: string;
  type: string;
}

const COLORS = ['#3B82F6', '#93C5FD']; // Tailwind's blue-500 and blue-300


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'welcome' | 'add' | 'list'>('welcome');
  const [donors, setDonors] = useState<Donor[]>([]);
  const [form, setForm] = useState<Donor>({
    name: '',
    address: '',
    email: '',
    phone: '',
    amount: '',
    donated: '',
    due: '',
    type: 'one-time',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDonors([...donors, form]);
    setForm({
      name: '',
      address: '',
      email: '',
      phone: '',
      amount: '',
      donated: '',
      due: '',
      type: 'one-time',
    });
    setActiveTab('list');
  };

  const totalReceived = donors.reduce((sum, d) => sum + parseFloat(d.donated || '0'), 0);
  const totalCommitted = donors.reduce((sum, d) => sum + parseFloat(d.amount || '0'), 0);
  const totalDue = totalCommitted - totalReceived;

  const pieData = [
    { name: 'Received', value: totalReceived },
    { name: 'Due', value: totalDue > 0 ? totalDue : 0 },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Admin Dashboard</h1>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('welcome')}
          className={`px-4 py-2 rounded ${
            activeTab === 'welcome' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2 rounded ${
            activeTab === 'add' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}
        >
          Add Donor
        </button>
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 rounded ${
            activeTab === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}
        >
          Show All Donors
        </button>
      </div>

      {activeTab === 'welcome' && (
        <div className="text-center text-lg font-medium text-gray-700">
          <p>👋 Welcome Admin!</p>
          <p className="mt-2 text-sm text-gray-500 mb-4">
            Use the buttons above to add or view donors.
          </p>

          {donors.length === 0 ? (
            <p className="text-sm text-gray-400">No donation data yet.</p>
          ) : (
            <div className="w-full max-w-md mx-auto">
              <h2 className="text-xl mb-2">📊 Donation Summary</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {activeTab === 'add' && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add Donor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['name', 'address', 'email', 'phone', 'amount', 'donated', 'due'].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={(form as never)[field]}
                onChange={handleChange}
                className="border p-2 rounded"
                required={field !== 'donated' && field !== 'due'}
              />
            ))}
            <select name="type" value={form.type} onChange={handleChange} className="border p-2 rounded col-span-1 md:col-span-2">
              <option value="one-time">One-time</option>
              <option value="monthly">Monthly</option>
              <option value="bi-weekly">Bi-weekly</option>
            </select>
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save Donor
          </button>
        </form>
      )}

      {activeTab === 'list' && (
        <div className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Donors</h2>
          {donors.length === 0 ? (
            <p className="text-gray-500">No donors added yet.</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 py-1">Name</th>
                  <th className="border px-2 py-1">Email</th>
                  <th className="border px-2 py-1">Amount</th>
                  <th className="border px-2 py-1">Donated</th>
                  <th className="border px-2 py-1">Due</th>
                  <th className="border px-2 py-1">Type</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((d, i) => (
                  <tr key={i}>
                    <td className="border px-2 py-1">{d.name}</td>
                    <td className="border px-2 py-1">{d.email}</td>
                    <td className="border px-2 py-1">{d.amount}</td>
                    <td className="border px-2 py-1">{d.donated}</td>
                    <td className="border px-2 py-1">{d.due}</td>
                    <td className="border px-2 py-1">{d.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
