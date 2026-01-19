import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(message);
    const text = result.response.text();

    // 🔴 LOG IMPORTANT
    console.log("Réponse Gemini:", text);

    // ✅ FORMAT COMPATIBLE AVEC TON RENDERER
    return res.status(200).json({
      reply: text
    });

  } catch (error) {
    console.error("Erreur Gemini:", error);
    return res.status(500).json({
      reply: "Une perturbation traverse les ténèbres…"
    });
  }
}
