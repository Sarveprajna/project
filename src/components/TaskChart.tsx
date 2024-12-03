import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { format, parseISO, eachDayOfInterval, subDays } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TaskChart() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const last7Days = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date(),
  });

  const completedTasksByDay = last7Days.map(day => {
    return tasks.filter(task => {
      const taskDate = parseISO(task.createdAt);
      return format(taskDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') && task.completed;
    }).length;
  });

  const data = {
    labels: last7Days.map(day => format(day, 'MMM d')),
    datasets: [
      {
        label: 'Completed Tasks',
        data: completedTasksByDay,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">Task Completion Trend</h2>
      <Line data={data} options={options} />
    </div>
  );
}