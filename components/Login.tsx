
import React, { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary to-secondary p-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-fade-in">
        <h1 className="text-5xl font-bold text-white text-center mb-2">Boring Me</h1>
        <p className="text-white/80 text-center mb-8">Turn your downtime into fun time.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-white/90 text-sm font-bold mb-2">
              What should we call you?
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-white/30 text-white placeholder-white/60 rounded-lg border-2 border-transparent focus:outline-none focus:border-white transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-primary font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transform hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            Let's Go!
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
