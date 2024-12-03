import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../store/store';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function TaskStats() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
    overdue: tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return !task.completed && dueDate < new Date();
    }).length,
  };

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: Clock,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
    },
  ];

  return (
    <>
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-gradient-to-r ${stat.color} rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-75">{stat.title}</p>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
            </div>
            <stat.icon className="w-8 h-8 opacity-75" />
          </div>
        </motion.div>
      ))}
    </>
  );
}