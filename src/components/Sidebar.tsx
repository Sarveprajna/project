import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, CheckSquare, Settings, HelpCircle } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: CheckSquare, label: 'Tasks' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
  ];

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-gray-900 p-6 space-y-6"
    >
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <span className="text-xl font-bold text-white">TaskBoard</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg text-sm ${
              item.active
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                : 'text-gray-400 hover:bg-gray-800'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </motion.button>
        ))}
      </nav>
    </motion.div>
  );
}