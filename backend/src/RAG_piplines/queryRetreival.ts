import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import OpenAI from "openai";
import db from "../databse/vector_db";

const openai = new OpenAI({
  apiKey: process.env.GOOGLE_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 510,
  chunkOverlap: 100,
});

//Query Retreival Pipeline inclues below 3 steps
export const loadanswer = async (question: any) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });

    //data embedding gemini model convert from text to vector
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: question,
    });
    console.log("embedding the question");

    const embeddings = response.embeddings;
    const fullVector = embeddings[0].values;
    const vector = fullVector.slice(0, 768);
    console.log("convert the question to vector", vector);

    let docContext;
    //Retrieval from the database that match the given query
    try {
      const collection = db.collection("youtube");
      const cursor = collection.find(null, {
        sort: {
          $vector: vector,
        },
        limit: 10,
      });

      //Augmented means giving matched info as context and actual question
      const documents = await cursor.toArray();
      const docsMap = documents?.map((doc) => doc.text);

      docContext = JSON.stringify(docsMap);
    } catch (err) {
      console.log(err);
    }

    //Generation create a result using ai
    const result = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      //   stream: true,
      messages: [
        {
          role: "system",
          content: `You are an AI assistant. Your task is to provide clear and helpful responses to user queries based solely on the information provided in the context below. 
           Maintain a soft, professional, and courteous tone in all responses. Use the context provided to answer questions whenever possible. 
           If the context does not include the information needed to answer, respond based on your general knowledge.
           Do not mention the source of your information. Do not include links, images, or external references in your responses.
           START CONTEXT
         ${docContext}
         END CONTEXT`,
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    //  response in stream form
    //   for await (const chunk of result) {
    //    console.log(chunk.choices[0].delta.content);
    //    return ;

    console.log("response from the ai", result.choices[0].message);
    return result.choices[0].message;
  } catch (err) {
    console.log(err);
  }
};
