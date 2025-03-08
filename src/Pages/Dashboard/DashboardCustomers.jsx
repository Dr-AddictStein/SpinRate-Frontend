import React from 'react';
import { CheckCircle, XCircle, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardCustomers = () => {
  const customers = [
    { id: 1, date: '24-04-2024', email: 'paul@toog-app.com', phone: '0781477824', prize: '1 Glace 🍦', status: true, enriched: false },
    { id: 2, date: '24-04-2024', email: 'benjamin@toog-app.com', phone: '0689752574', prize: '1 voyage ✈️', status: true, enriched: false },
    { id: 3, date: '24-04-2024', email: 'benjamin.gueroui@aim.com', phone: '0689752574', prize: 'Riwil offert 1 mois 🎁', status: false, enriched: false },
    { id: 4, date: '24-04-2024', email: 'example@example.com', phone: '0123456789', prize: 'Perdu 😢', status: false, enriched: false },
    // Add more customer data as needed
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Phone</th>
            <th className="py-2 px-4 text-left">Prize</th>
            <th className="py-2 px-4 text-center">Status</th>
            <th className="py-2 px-4 text-center">Enriched</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <motion.tr
              key={customer.id}
              whileHover={{ scale: 1.02 }}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="py-2 px-4">{customer.date}</td>
              <td className="py-2 px-4">{customer.email}</td>
              <td className="py-2 px-4">{customer.phone}</td>
              <td className="py-2 px-4">{customer.prize}</td>
              <td className="py-2 px-4 text-center">
                {customer.status ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : (
                  <XCircle className="text-red-500" size={20} />
                )}
              </td>
              <td className="py-2 px-4 text-center">
                {customer.enriched ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : (
                  <XCircle className="text-red-500" size={20} />
                )}
              </td>
              <td className="py-2 px-4 text-center">
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreVertical size={20} />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardCustomers;
