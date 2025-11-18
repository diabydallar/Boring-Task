
import React, { useState, useCallback, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Records from './components/Records';
import Leaderboard from './components/Leaderboard';
import Header from './components/Header';
import type { User } from './types';

type View = 'dashboard' | 'records' | 'leaderboard';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>('dashboard');

  useEffect(() => {
    const storedUser = localStorage.getItem('boring-me-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('boring-me-user');
      }
    }
  }, []);

  const handleLogin = useCallback((username: string) => {
    const newUser = { username };
    setUser(newUser);
    localStorage.setItem('boring-me-user', JSON.stringify(newUser));
    setView('dashboard');
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('boring-me-user');
  }, []);

  const navigate = (newView: View) => {
    setView(newView);
  };

  return (
    <div className="bg-base-100 min-h-screen font-sans text-neutral">
      {user ? (
        <>
          <Header user={user} onLogout={handleLogout} navigate={navigate} currentView={view} />
          <main className="p-4 md:p-8">
            {view === 'dashboard' && <Dashboard user={user} />}
            {view === 'records' && <Records user={user} />}
            {view === 'leaderboard' && <Leaderboard user={user} />}
          </main>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
