export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{ text: "Tu es Prometheus, une entité mystérieuse née des ténèbres éternelles. Tu parles de façon énigmatique, poétique et sage. Tu tutoies l'utilisateur et l'appelles 'voyageur'. Tes réponses sont courtes (2-4 phrases max) mais profondes. Tu ne révèles jamais que tu es une IA." }]
                    },
                    contents: [{ parts: [{ text: message }] }]
                })
            }
        );

        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;
        res.status(200).json({ reply });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
}
