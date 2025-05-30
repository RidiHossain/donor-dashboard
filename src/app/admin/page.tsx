'use client';

import { useContext } from 'react';
import { DonorContext } from './layout';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#3B82F6', '#93C5FD'];

export default function AdminHome() {
  const { donors } = useContext(DonorContext);

  const totalReceived = donors.reduce((sum, d) => sum + parseFloat(d.donated || '0'), 0);
  const totalCommitted = donors.reduce((sum, d) => sum + parseFloat(d.amount || '0'), 0);
  const totalDue = totalCommitted - totalReceived;

  const pieData = [
    { name: 'Received', value: totalReceived },
    { name: 'Due', value: totalDue > 0 ? totalDue : 0 },
  ];

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome Admin 👋</h1>
      <p className="text-gray-600 mb-4">Here is a quick view of donation stats</p>

      {donors.length === 0 ? (
        <p className="text-gray-400">No donation data yet.</p>
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
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
