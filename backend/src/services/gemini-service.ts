import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor() {
        const apiKey = process.env.GEMINI_API_KEY || "";
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    }

    async generateExample(word: string, targetLanguage: string) {
        const prompt = `Generate a natural example sentence for the word "${word}" in ${targetLanguage}. 
    Provide the sentence, its translation in Korean, and a brief explanation of how to use it. 
    Format: JSON { "sentence": "...", "translation": "...", "explanation": "..." }`;

        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        return JSON.parse(response.text());
    }

    async answerQuestion(question: string, contextWord: string) {
        const prompt = `As a language tutor, answer this question: "${question}" regarding the word "${contextWord}".`;
        const result = await this.model.generateContent(prompt);
        return result.response.text();
    }
}
