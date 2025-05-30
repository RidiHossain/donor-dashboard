'use client';

import { useState, useContext } from 'react';
import { DonorContext, Donor } from '../layout';
import { useRouter } from 'next/navigation';

export default function AddDonor() {
  const { donors, setDonors } = useContext(DonorContext);
  const [form, setForm] = useState<Donor>({
    name: '', address: '', email: '', phone: '', amount: '', donated: '', due: '', type: 'one-time',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDonors([...donors, form]);
    router.push('/admin/view-donors');
  };

  return (
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
  );
}
