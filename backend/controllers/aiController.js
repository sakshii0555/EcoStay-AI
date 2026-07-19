const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

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

module.exports = {
  generateTrip,
};