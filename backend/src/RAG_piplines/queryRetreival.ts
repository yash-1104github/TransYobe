import "dotenv/config";
import OpenAI from "openai";
import pc from "../databse/vector_db";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const indexName = process.env.PINECONE_INDEX_NAME!;

export const loadanswer = async (question: string) => {
  try {
    console.log("Creating embedding with OpenAI...");

    const embeddingResponse = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: question,
      dimensions: 768,
    });

    const vector = embeddingResponse.data[0].embedding;
    console.log("Vector length:", vector.length);


    let docContext = "";

    try {
      const index = pc.Index(indexName);

      console.log("🔹 Querying Pinecone...");

      const queryResponse = await index.query({
        vector,
        topK: 5,
        includeMetadata: true,
      });

      const matches = queryResponse.matches || [];
      const docs = matches
        .map((m) => m.metadata?.text)
        .filter(Boolean);

      docContext = docs.join("\n\n");

      console.log(`Retrieved ${matches.length} chunks`);
    } catch (err) {
      console.error("Pinecone query failed:", err);
    }

    console.log("🔹 Generating answer with OpenAI...");

    const systemPrompt = `
You are an AI assistant.
Answer clearly and professionally using the context below.
If the context does not contain the answer, respond using general knowledge.
Do not mention sources or external references.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `CONTEXT:\n${docContext}\n\nQUESTION:\n${question}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 512,
    });

    const answer =
      completion.choices[0]?.message?.content ??
      "No response generated.";

    console.log("✅ Answer generated");
    console.log("Answer:", answer);
    return { generated_text: answer };
  } catch (err) {
    console.error("❌ loadanswer failed:", err);
    return {
      generated_text:
        "Sorry, something went wrong while answering your question.",
    };
  }
};