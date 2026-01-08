import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function generateTransform(
  content: string,
  target: string,
  type: string,
  instructions?: string | null,
) {
  const prompt = `
    Transform the following content for ${target}. 
    Format: ${type}. 
    Additional Instructions: ${instructions ?? 'None'}.
    
    Content: ${content}
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
