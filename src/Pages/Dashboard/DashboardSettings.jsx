import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Lock } from 'lucide-react';

const DashboardSettings = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <form className="space-y-4">
          <div className="flex items-center space-x-3">
            <Settings size={20} className="text-indigo-500" />
            <label className="text-sm font-medium text-gray-700">General Settings</label>
          </div>
          <input
            type="text"
            placeholder="Site Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />

          <div className="flex items-center space-x-3">
            <Bell size={20} className="text-indigo-500" />
            <label className="text-sm font-medium text-gray-700">Notifications</label>
          </div>
          <input
            type="email"
            placeholder="Notification Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />

          <div className="flex items-center space-x-3">
            <Lock size={20} className="text-indigo-500" />
            <label className="text-sm font-medium text-gray-700">Security</label>
          </div>
          <input
            type="password"
            placeholder="Change Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-all mt-6"
          >
            Save Changes
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default DashboardSettings;
