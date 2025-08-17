import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client with API key from Lambda environment
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const handler = async (event) => {
  try {
    // Parse the incoming request
    const body = JSON.parse(event.body || "{}");
    console.log("Received request body:", body);
    const prompt = body.prompt || "what is angular";

    if (!prompt) {
      console.log("No prompt provided in request.");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Prompt is required." }),
      };
    }
    console.log("Prompt received:", prompt); // <-- Log the prompt

    // Generate content using Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Use latest Gemini model
      contents: `${prompt}\n\nPlease answer concisely in 5-8 lines.`,
    });

    const text = response.text; 
    console.log("AI response:", text); // <-- Log the response

    return {
      statusCode: 200,
      body: JSON.stringify({ message: text }),
    };

  } catch (error) {
    console.error("Error generating content:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An error occurred while processing your request." }),
    };
  }
};
