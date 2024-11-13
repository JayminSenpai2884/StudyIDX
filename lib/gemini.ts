import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("");

export async function generateSummary(content: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Please analyze the following content and provide:
  1. A concise summary
  2. Key points and concepts
  3. Important terms and definitions
  4. Study questions

  Content: ${content}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating summary:", error);
    throw error;
  }
}
