
import React from 'react';
import type { User } from '../types';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  navigate: (view: 'dashboard' | 'records' | 'leaderboard') => void;
  currentView: 'dashboard' | 'records' | 'leaderboard';
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, navigate, currentView }) => {
  const NavButton: React.FC<{ view: 'dashboard' | 'records' | 'leaderboard', children: React.ReactNode }> = ({ view, children }) => (
    <button
      onClick={() => navigate(view)}
      className={`px-4 py-2 rounded-lg font-semibold transition ${
        currentView === view
          ? 'bg-primary text-white shadow-md'
          : 'text-neutral hover:bg-base-200'
      }`}
    >
      {children}
    </button>
  );
  
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm p-4 border-b border-base-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Boring Me</h1>
        <nav className="hidden md:flex items-center gap-2">
           <NavButton view="dashboard">Dashboard</NavButton>
           <NavButton view="records">My Records</NavButton>
           <NavButton view="leaderboard">Leaderboard</NavButton>
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-neutral hidden sm:block">Hi, {user.username}!</span>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-neutral hover:text-secondary font-semibold transition-colors"
            title="Logout"
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center justify-center gap-4 mt-4 border-t border-base-200 pt-3">
           <NavButton view="dashboard">Dashboard</NavButton>
           <NavButton view="records">My Records</NavButton>
           <NavButton view="leaderboard">Leaderboard</NavButton>
      </nav>
    </header>
  );
};

export default Header;
