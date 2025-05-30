'use client';

import { useContext } from 'react';
import { DonorContext } from '../layout';

export default function ViewDonors() {
  const { donors } = useContext(DonorContext);

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-5xl mx-auto">
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
  );
}
