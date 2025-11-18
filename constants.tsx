
import React from 'react';
import type { Category } from './types';
import { SparklesIcon, AcademicCapIcon, PuzzlePieceIcon, HeartIcon, ArchiveBoxIcon, UserGroupIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

export const CATEGORIES: Category[] = [
  {
    id: 'creative',
    title: 'Creative Corner',
    description: 'DIY projects, painting, writing, and cooking.',
    color: 'bg-rose-500',
    icon: SparklesIcon,
    tasks: [
      { id: 'c1', title: 'Try a DIY project', description: 'Find a simple Do-It-Yourself project online and create something new.' },
      { id: 'c2', title: 'Paint a picture', description: 'Grab some paints or pencils and let your artistic side shine.' },
      { id: 'c3', title: 'Write a short story', description: 'Start with a simple prompt and write a one-page story.' },
      { id: 'c4', title: 'Cook a new recipe', description: 'Find a recipe you\'ve never tried before and cook a delicious meal.' },
    ],
  },
  {
    id: 'skill',
    title: 'Skill Up',
    description: 'Learn a language, instrument, or new game.',
    color: 'bg-blue-500',
    icon: AcademicCapIcon,
    tasks: [
      { id: 's1', title: 'Take a short online class', description: 'Find a free 15-minute class on a topic that interests you.' },
      { id: 's2', title: 'Learn 10 words in a new language', description: 'Use a free app or website to learn some new vocabulary.' },
      { id: 's3', title: 'Learn a new card game', description: 'Look up the rules for a card game you don\'t know and play a round.' },
      { id: 's4', title: 'Watch an instrument tutorial', description: 'Find a beginner tutorial for an instrument like guitar or piano.' },
    ],
  },
  {
    id: 'mind',
    title: 'Mind Games',
    description: 'Puzzles, video games, and brain teasers.',
    color: 'bg-purple-500',
    icon: PuzzlePieceIcon,
    tasks: [
      { id: 'm1', title: 'Complete a puzzle', description: 'Do a Sudoku, crossword, or a small jigsaw puzzle.' },
      { id: 'm2', title: 'Play a strategy game', description: 'Engage your mind with a game of chess, checkers, or a strategy video game.' },
      { id: 'm3', title: 'Explore a Q&A site', description: 'Browse a site like Quora or Reddit and learn something new from others.' },
    ],
  },
  {
    id: 'active',
    title: 'Move Your Body',
    description: 'Walking, exercising, and getting outdoors.',
    color: 'bg-green-500',
    icon: HeartIcon,
    tasks: [
      { id: 'a1', title: 'Go for a 20-minute walk', description: 'Take a brisk walk around your neighborhood or a local park.' },
      { id: 'a2', title: 'Do a 15-minute yoga routine', description: 'Find a beginner-friendly yoga video on YouTube and follow along.' },
      { id: 'a3', title: 'Have a 10-minute dance party', description: 'Put on your favorite upbeat music and dance like nobody\'s watching.' },
      { id: 'a4', title: 'Spend time in nature', description: 'Go to a park, sit outside, or simply enjoy some fresh air.' },
    ],
  },
  {
    id: 'organize',
    title: 'Tidy Up & Organize',
    description: 'Clean your space and declutter your mind.',
    color: 'bg-yellow-500',
    icon: ArchiveBoxIcon,
    tasks: [
      { id: 'o1', title: 'Tackle one cluttered drawer', description: 'Pick one messy drawer or shelf and organize it completely.' },
      { id: 'o2', title: 'Organize your computer desktop', description: 'Clean up files and folders on your computer for a fresh start.' },
      { id: 'o3', title: 'Plan your meals for 3 days', description: 'Reduce future stress by planning what you\'ll eat for the next few days.' },
    ],
  },
  {
    id: 'social',
    title: 'Connect with Others',
    description: 'Reach out to friends and meet new people.',
    color: 'bg-pink-500',
    icon: UserGroupIcon,
    tasks: [
      { id: 'so1', title: 'Call or text a friend', description: 'Reach out to someone you haven\'t spoken to in a while for a quick chat.' },
      { id: 'so2', title: 'Play a game with loved ones', description: 'Engage in a fun board game, card game, or video game with family or friends.' },
      { id: 'so3', title: 'Visit a local coffee shop', description: 'Enjoy a change of scenery and be around other people.' },
    ],
  },
  {
    id: 'reflect',
    title: 'Reflect & Plan',
    description: 'Embrace quiet time for self-reflection.',
    color: 'bg-indigo-500',
    icon: ChatBubbleBottomCenterTextIcon,
    tasks: [
      { id: 'r1', title: 'Meditate for 10 minutes', description: 'Sit in a quiet space without distractions and let your mind wander.' },
      { id: 'r2', title: 'Journal about your interests', description: 'Write down what you enjoy and what you might like to do more of.' },
      { id: 'r3', title: 'Plan a future trip', description: 'Research a destination you\'d love to visit and sketch out an itinerary.' },
    ],
  },
];
