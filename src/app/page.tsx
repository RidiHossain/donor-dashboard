"use client";
import { useState, ChangeEvent } from "react";

type Donor = {
  name: string;
  email: string;
  phone: string;
  address: string;
  type: "One-time" | "Monthly" | "Bi-weekly";
  amount: string;
  donated: string;
  due: string;
};

type DonorForm = Omit<Donor, "due">;

export default function AdminDashboard() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [form, setForm] = useState<DonorForm>({
    name: "",
    email: "",
    phone: "",
    address: "",
    type: "One-time",
    amount: "",
    donated: "0",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addDonor = () => {
    const due =
      parseFloat(form.amount || "0") - parseFloat(form.donated || "0");

    const newDonor: Donor = {
      ...form,
      due: due.toFixed(2),
    };

    setDonors([...donors, newDonor]);

    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      type: "One-time",
      amount: "",
      donated: "0",
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="p-2 border rounded"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-2 border rounded"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="p-2 border rounded"
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="p-2 border rounded"
        />
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Total Amount"
          className="p-2 border rounded"
        />
        <input
          name="donated"
          type="number"
          value={form.donated}
          onChange={handleChange}
          placeholder="Donated So Far"
          className="p-2 border rounded"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="One-time">One-time</option>
          <option value="Monthly">Monthly</option>
          <option value="Bi-weekly">Bi-weekly</option>
        </select>
      </div>

      <button
        onClick={addDonor}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Donor
      </button>

      {donors.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Donor List</h2>
          <table className="w-full border-collapse border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Donated</th>
                <th className="border p-2">Due</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, idx) => (
                <tr key={idx} className="text-center">
                  <td className="border p-2">{donor.name}</td>
                  <td className="border p-2">{donor.email}</td>
                  <td className="border p-2">{donor.phone}</td>
                  <td className="border p-2">{donor.type}</td>
                  <td className="border p-2">{donor.amount}</td>
                  <td className="border p-2">{donor.donated}</td>
                  <td className="border p-2">{donor.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
