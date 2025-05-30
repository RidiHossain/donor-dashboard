// app/admin/layout.tsx
'use client';

import Link from 'next/link';
import { useState, createContext, ReactNode } from 'react';

export interface Donor {
  name: string;
  address: string;
  email: string;
  phone: string;
  amount: string;
  donated: string;
  due: string;
  type: string;
}

export const DonorContext = createContext<{
  donors: Donor[];
  setDonors: React.Dispatch<React.SetStateAction<Donor[]>>;
}>({
  donors: [],
  setDonors: () => {},
});

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [donors, setDonors] = useState<Donor[]>([]);

  return (
    <DonorContext.Provider value={{ donors, setDonors }}>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <ul className="flex space-x-6">
            <li><Link href="/admin">Home</Link></li>
            <li><Link href="/admin/add-donor">Add Donor</Link></li>
            <li><Link href="/admin/view-donors">View Donors</Link></li>
          </ul>
        </nav>
        <main className="p-6">{children}</main>
      </div>
    </DonorContext.Provider>
  );
}
