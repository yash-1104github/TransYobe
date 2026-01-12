import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import pc from "../databse/vector_db";

// const openai = new OpenAI({
//   apiKey: process.env.GOOGLE_API_KEY,
//   baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
// });

const indexName = process.env.PINECONE_INDEX_NAME;

//Query Retreival Pipeline inclues below 3 steps
export const loadanswer = async (question: any) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });

    //@ts-ignore
    const model = ai.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    //data embedding gemini model convert from text to vector
    const response = await ai.models.embedContent({
      model: process.env.GEMINI_EMBEDDING_MODEL,
      contents: question,
    });

    console.log("embedding the question");

    const embeddings = response.embeddings;
    const fullVector = embeddings[0].values;
    const vector = fullVector.slice(0, 768);
    console.log("convert the question to vector", vector);

    let docContext = "";
    //Retrieval from the database that match the given query
    try {
      const index = pc.Index(indexName);
      console.log("Querying Pinecone for similar context...");

      const queryResponse = await index.query({
        vector,
        topK: 5,
        includeMetadata: true,
      });

      //Augmented means giving matched info as context and actual question
      const matches = queryResponse.matches || [];
      const docsMap = matches.map((m) => m.metadata?.text).filter(Boolean);
      docContext = docsMap.join("\n\n");
      console.log("Retrieved context from Pinecone.");

      console.log(`Retrieved ${matches.length} relevant chunks from Pinecone.`);
    } catch (err) {
      console.log(err);
    }

    const systemPrompt = `
You are an AI assistant. Your task is to provide clear and helpful responses to user queries based solely on the information provided in the context below.
Maintain a soft, professional, and courteous tone in all responses.
Use the context provided to answer questions whenever possible.
If the context does not include the information needed to answer, respond based on your general knowledge.
Do not mention the source of your information.
Do not include links, images, or external references in your responses.
`;

    const prompt = `
${systemPrompt}

START CONTEXT
${docContext}
END CONTEXT

USER QUESTION
${question}
`;
    
    const result = await model.generateContent(prompt);
    console.log("response from the ai", result.choices[0].message);
    return result.choices[0].message;
  } catch (err) {
    console.log(err);
  }
};
