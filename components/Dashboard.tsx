
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import type { Category, Task, User } from '../types';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleCardClick = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };
  
  return (
    <div className="max-w-7xl mx-auto animate-slide-in-up">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-neutral">What should we do today, {user.username}?</h2>
      <p className="text-center text-neutral/70 mb-8 md:mb-12">Pick a category to find your next adventure.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CATEGORIES.map((category, index) => (
          <TaskCard 
            key={category.id} 
            category={category}
            onClick={() => handleCardClick(category)}
            style={{ animationDelay: `${index * 50}ms` }}
          />
        ))}
      </div>
      
      {isModalOpen && selectedCategory && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={closeModal}
          category={selectedCategory}
          user={user}
        />
      )}
    </div>
  );
};

export default Dashboard;
