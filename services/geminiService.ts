import { GoogleGenAI } from "@google/genai";
import type { Category } from '../types';

// Fix: Per Gemini API guidelines, initialize the client directly using process.env.API_KEY.
// The guidelines state to assume the API key is pre-configured and available, so checks have been removed.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateNewTaskIdea = async (category: Category): Promise<string> => {
  try {
    const prompt = `You are an expert at curing boredom. Generate a single, simple, fun, and creative task for someone who is bored.
The task must fit into the category of "${category.title}".
The task should be something that can be completed in a short amount of time (under an hour).
Your response MUST be only the task title as a short sentence, without any extra text, formatting, or quotation marks.
For example, if the category is "Creative Corner", a good response would be "Bake a batch of cookies from scratch".`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating task with Gemini:", error);
    return "Could not generate a new idea. Please try again later.";
  }
};
