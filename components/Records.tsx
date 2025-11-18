
import React, { useState, useEffect } from 'react';
import type { User, CompletedTask } from '../types';
import { CalendarDaysIcon, TagIcon } from '@heroicons/react/24/solid';

interface RecordsProps {
  user: User;
}

const Records: React.FC<RecordsProps> = ({ user }) => {
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>([]);

  useEffect(() => {
    const key = `completed-tasks-${user.username}`;
    const storedTasks = localStorage.getItem(key);
    if (storedTasks) {
      try {
        setCompletedTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Failed to parse records from localStorage", error);
        setCompletedTasks([]);
      }
    }
  }, [user.username]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto animate-slide-in-up">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-neutral">Your Accomplishments</h2>
      <p className="text-center text-neutral/70 mb-8 md:mb-12">A gallery of all the fun you've had!</p>

      {completedTasks.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold text-neutral">No records yet!</h3>
          <p className="text-neutral/60 mt-2">Complete a task from the dashboard to start your collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {completedTasks.map((task, index) => (
            <div key={task.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                <img src={task.imageUrl} alt={task.taskTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-neutral truncate">{task.taskTitle}</h3>
                <div className="flex items-center text-sm text-neutral/60 mt-2 gap-2">
                  <TagIcon className="h-4 w-4 text-primary"/>
                  <span>{task.categoryTitle}</span>
                </div>
                <div className="flex items-center text-sm text-neutral/60 mt-1 gap-2">
                  <CalendarDaysIcon className="h-4 w-4 text-secondary"/>
                  <span>{formatDate(task.date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Records;
