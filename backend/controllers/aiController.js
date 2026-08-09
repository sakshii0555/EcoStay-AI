const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ===============================
// AI TRAVEL PLANNER
// ===============================
const generateTrip = async (req, res) => {
  try {
    const { destination, days, budget, travelStyle } = req.body;

    const prompt = `
You are an eco-tourism travel expert.

Create a ${days}-day travel itinerary.

Destination: ${destination}
Budget: ₹${budget}
Travel Style: ${travelStyle}

Include:

- Day-wise itinerary
- Eco-friendly homestay suggestions
- Sustainable travel tips
- Approximate expenses
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.status(200).json({
      success: true,
      itinerary: response.text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate travel plan.",
    });
  }
};

// ===============================
// ECOSTAY AI CHATBOT
// ===============================
const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message.",
      });
    }

    const prompt = `
You are EcoStay AI, a friendly and helpful AI travel assistant.

Your purpose is to help users with:
- Travel planning
- Indian destinations
- Eco-friendly tourism
- Sustainable travel
- Homestays
- Local experiences
- Travel budgets
- Transportation
- Itineraries
- Travel tips

Keep your answers helpful, friendly, and reasonably concise.

If the user asks something unrelated to travel, politely explain that you are designed primarily to help with travel and EcoStay AI.

User's message:
${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.status(200).json({
      success: true,
      reply: response.text,
    });
  } catch (error) {
    console.error("Chatbot error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get a response from EcoStay AI.",
    });
  }
};

module.exports = {
  generateTrip,
  chatWithAI,
};