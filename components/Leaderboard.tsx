
import React, { useState, useEffect, useMemo } from 'react';
import type { User, CompletedTask } from '../types';
import { TrophyIcon } from '@heroicons/react/24/solid';

interface LeaderboardProps {
  user: User;
}

type TimeFilter = 'day' | 'week' | 'month' | 'year';

interface LeaderboardEntry {
  username: string;
  score: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ user }) => {
  const [allTasks, setAllTasks] = useState<CompletedTask[]>([]);
  const [filter, setFilter] = useState<TimeFilter>('week');

  useEffect(() => {
    const key = `all-completed-tasks`;
    const storedTasks = localStorage.getItem(key);
    if (storedTasks) {
      try {
        setAllTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Failed to parse all tasks from localStorage", error);
        setAllTasks([]);
      }
    }
  }, []);

  const leaderboardData = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const filteredTasks = allTasks.filter(task => {
      const taskDate = new Date(task.date);
      switch (filter) {
        case 'day':
          return taskDate.toDateString() === now.toDateString();
        case 'week':
          return taskDate >= startOfWeek;
        case 'month':
          return taskDate.getMonth() === now.getMonth() && taskDate.getFullYear() === now.getFullYear();
        case 'year':
          return taskDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });

    const scores: Record<string, number> = {};
    filteredTasks.forEach(task => {
      scores[task.username] = (scores[task.username] || 0) + 1;
    });

    return Object.entries(scores)
      .map(([username, score]) => ({ username, score }))
      .sort((a, b) => b.score - a.score);

  }, [allTasks, filter]);

  const FilterButton: React.FC<{ timeFilter: TimeFilter, text: string }> = ({ timeFilter, text }) => (
    <button
      onClick={() => setFilter(timeFilter)}
      className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm md:text-base ${
        filter === timeFilter
          ? 'bg-primary text-white shadow'
          : 'bg-white text-neutral hover:bg-base-200'
      }`}
    >
      {text}
    </button>
  );
  
  const getRankStyling = (index: number) => {
    switch (index) {
        case 0: return { bg: 'bg-yellow-100 border-yellow-400', text: 'text-yellow-600', icon: <TrophyIcon className="h-6 w-6 text-yellow-500" /> };
        case 1: return { bg: 'bg-gray-200 border-gray-400', text: 'text-gray-600', icon: <TrophyIcon className="h-6 w-6 text-gray-500" /> };
        case 2: return { bg: 'bg-orange-200 border-orange-400', text: 'text-orange-700', icon: <TrophyIcon className="h-6 w-6 text-orange-500" /> };
        default: return { bg: 'bg-white', text: 'text-neutral', icon: <span className="font-bold text-gray-400">#{index + 1}</span> };
    }
  };


  return (
    <div className="max-w-4xl mx-auto animate-slide-in-up">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-neutral">Leaderboard</h2>
      <p className="text-center text-neutral/70 mb-8">See who's conquering boredom the most!</p>

      <div className="flex justify-center items-center gap-2 md:gap-4 mb-8 bg-gray-100 p-2 rounded-full">
        <FilterButton timeFilter="day" text="Today" />
        <FilterButton timeFilter="week" text="This Week" />
        <FilterButton timeFilter="month" text="This Month" />
        <FilterButton timeFilter="year" text="This Year" />
      </div>

      <div className="space-y-3">
        {leaderboardData.length > 0 ? (
          leaderboardData.map((entry, index) => {
            const { bg, text, icon } = getRankStyling(index);
            const isCurrentUser = entry.username === user.username;
            return (
              <div
                key={entry.username}
                className={`flex items-center p-4 rounded-xl shadow-sm border transition-all duration-300 ${isCurrentUser ? 'border-primary scale-105 shadow-lg' : 'border-transparent'} ${bg}`}
              >
                <div className={`w-12 h-12 flex items-center justify-center ${text}`}>
                  {icon}
                </div>
                <div className="flex-grow ml-4">
                    <p className={`font-bold text-lg ${text}`}>{entry.username}</p>
                    {isCurrentUser && <span className="text-xs font-bold text-primary">THIS IS YOU</span>}
                </div>
                <div className={`text-xl font-bold ${text}`}>{entry.score} <span className="text-sm font-normal">tasks</span></div>
              </div>
            );
          })
        ) : (
          <div className="text-center bg-white p-12 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold text-neutral">It's a bit quiet here...</h3>
            <p className="text-neutral/60 mt-2">No tasks completed in this period. Be the first!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
