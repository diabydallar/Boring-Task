
import React, { useState, useCallback } from 'react';
import type { Category, Task, User, CompletedTask } from '../types';
import { generateNewTaskIdea } from '../services/geminiService';
import { XMarkIcon, SparklesIcon, PhotoIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
  user: User;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const TaskItem: React.FC<{ task: Task, onComplete: (task: Task) => void }> = ({ task, onComplete }) => (
  <div className="flex justify-between items-center bg-base-200 p-4 rounded-lg">
    <div>
      <h4 className="font-semibold">{task.title}</h4>
      <p className="text-sm text-neutral/70">{task.description}</p>
    </div>
    <button
      onClick={() => onComplete(task)}
      className="bg-accent text-white px-3 py-1 rounded-full font-bold text-sm hover:bg-green-600 transition-colors"
    >
      Done!
    </button>
  </div>
);


const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, category, user }) => {
  const [tasks, setTasks] = useState<Task[]>(category.tasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleGenerateTask = async () => {
    setIsGenerating(true);
    const newTaskTitle = await generateNewTaskIdea(category);
    if(newTaskTitle && !newTaskTitle.includes("Could not generate")) {
      const newTask: Task = {
        id: `gemini-${Date.now()}`,
        title: newTaskTitle,
        description: 'A freshly generated idea just for you!',
      };
      setTasks(prev => [newTask, ...prev]);
    } else {
      // Handle error, maybe show a toast
      alert(newTaskTitle);
    }
    setIsGenerating(false);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleSaveRecord = async () => {
      if (!selectedTask || !imageFile) return;
      setIsSubmitting(true);
      try {
        const imageUrl = await fileToBase64(imageFile);
        const newRecord: CompletedTask = {
            id: `record-${Date.now()}`,
            taskId: selectedTask.id,
            categoryId: category.id,
            taskTitle: selectedTask.title,
            categoryTitle: category.title,
            date: new Date().toISOString(),
            imageUrl,
            username: user.username,
        };
        
        // Save to user-specific records
        const userKey = `completed-tasks-${user.username}`;
        const existingUserRecords: CompletedTask[] = JSON.parse(localStorage.getItem(userKey) || '[]');
        localStorage.setItem(userKey, JSON.stringify([newRecord, ...existingUserRecords]));

        // Save to global records for leaderboard
        const globalKey = `all-completed-tasks`;
        const allRecords: CompletedTask[] = JSON.parse(localStorage.getItem(globalKey) || '[]');
        localStorage.setItem(globalKey, JSON.stringify([newRecord, ...allRecords]));
        
        setIsCompleted(true);
        setTimeout(() => {
          resetAndClose();
        }, 2000);

      } catch (error) {
          console.error("Failed to save record:", error);
          alert("Could not save your record. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
  };

  const resetAndClose = useCallback(() => {
    setSelectedTask(null);
    setImageFile(null);
    setImagePreview(null);
    setIsCompleted(false);
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={resetAndClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-slide-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">{category.title}</h2>
          <button onClick={resetAndClose} className="text-neutral/50 hover:text-neutral">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow">
          {selectedTask ? (
            <div className="animate-fade-in">
              {isCompleted ? (
                <div className="text-center py-10">
                    <CheckCircleIcon className="h-24 w-24 text-accent mx-auto animate-bounce"/>
                    <h3 className="text-2xl font-bold mt-4">Awesome Job!</h3>
                    <p className="text-neutral/70">Your achievement has been saved to your records.</p>
                </div>
              ) : (
                <>
                <h3 className="text-xl font-semibold mb-4 text-center">You did it! <span className="text-lg">"{selectedTask.title}"</span></h3>
                <p className="text-center text-neutral/70 mb-6">Capture the moment! Upload a photo or screenshot of your completed task.</p>
                <div className="flex flex-col items-center gap-4">
                  <label htmlFor="file-upload" className="cursor-pointer w-full border-2 border-dashed border-base-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg"/>
                    ) : (
                      <div className="text-neutral/60">
                        <PhotoIcon className="h-12 w-12 mx-auto mb-2"/>
                        <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                      </div>
                    )}
                  </label>
                  <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  <button onClick={handleSaveRecord} disabled={!imageFile || isSubmitting} className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-base-300 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Saving...' : 'Save to My Records'}
                  </button>
                </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map(task => <TaskItem key={task.id} task={task} onComplete={setSelectedTask} />)}
            </div>
          )}
        </div>
        
        {!selectedTask && (
            <div className="p-6 border-t">
              <button
                onClick={handleGenerateTask}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 bg-secondary text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors disabled:bg-pink-300"
              >
                {isGenerating ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <SparklesIcon className="h-5 w-5" />
                )}
                {isGenerating ? 'Thinking of an idea...' : 'Generate New Idea with AI'}
              </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default TaskModal;
