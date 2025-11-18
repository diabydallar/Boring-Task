
import React from 'react';
import type { Category } from '../types';

interface TaskCardProps {
  category: Category;
  onClick: () => void;
  style?: React.CSSProperties;
}

const TaskCard: React.FC<TaskCardProps> = ({ category, onClick, style }) => {
  const Icon = category.icon;

  return (
    <button
      onClick={onClick}
      style={style}
      className={`relative p-6 rounded-2xl text-white overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 shadow-lg animate-fade-in ${category.color}`}
    >
      <div className="absolute -right-4 -bottom-4 text-white/10">
        <Icon className="h-32 w-32 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" />
      </div>
      <div className="relative z-10 text-left">
        <div className="mb-4">
          <Icon className="h-10 w-10" />
        </div>
        <h3 className="text-2xl font-bold mb-1">{category.title}</h3>
        <p className="text-white/80">{category.description}</p>
      </div>
    </button>
  );
};

export default TaskCard;
