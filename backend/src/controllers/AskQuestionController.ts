import { Request, Response } from "express";
import { loadanswer } from "../RAG_piplines/queryRetreival";
import Chat from "../schema/chat";

export default async function handleAskQuestion(
  req: Request,
  res: Response
) {
  const { question, userId } = req.body;

  if (!question) {
    return res.status(400).json({
      success: false,
      error: "Missing question.",
    });
  }

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User not registered",
    });
  }

  try {
    console.log("Running agent with memory...");

    const answer = await loadanswer(question);

    if (!answer || !answer.generated_text) {
      return res.status(503).json({
        success: false,
        error: "Agent failed to respond",
        details: "AI service returned no output.",
      });
    }

    console.log("Raw AI answer:", answer.generated_text);

   
    const formattedAnswer = answer.generated_text
      .replace(/\[\d+\]/g, " ")
      .replace(/\*/g, "")
      .replace(/:/g, "")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    let chat = await Chat.findOne({ userId });

    if (!chat) {
      chat = await Chat.create({
        userId,
        messages: [{ question, response: formattedAnswer }],
      });
    } else {
      chat.messages.push({
        question,
        response: formattedAnswer,
      });
      await chat.save();
    }

    return res.json({
      success: true,
      formattedAnswer,
    });
  } catch (err: any) {
    console.error("Error running agent:", err);

    return res.status(500).json({
      success: false,
      error: "Agent failed to respond.",
      details: err.message,
    });
  }
}
