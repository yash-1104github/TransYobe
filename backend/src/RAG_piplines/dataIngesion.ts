import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import db from "../databse/vector_db";


type SimilarityMetrix = "dot_product" | "cosine" | "euclidean";


const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 510,
  chunkOverlap: 100,
});

export const createCollection = async (
  similarityMetrix: SimilarityMetrix = "dot_product"
) => {
  const res = await db.createCollection(process.env.ASTRA_DB_COLLECTION, {
    vector: {
      dimension: 768,
      metric: similarityMetrix,
    },
  });

  console.log(res);
};

//Data Ingesion Pipeline includes below 3 steps
export const loadSampleData = async (content: any) => {
  const collection = db.collection(process.env.ASTRA_DB_COLLECTION);

  //implement functionality to remove older data
  const deleteOld = await collection.deleteMany({});
  console.log(`Deleted ${deleteOld.deletedCount} old records`);

  //convert data into chunks
  const chunks = await splitter.splitText(content);
  console.log("chunks created");

  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
  });

  //data embedding gemini model convert text to vector and storing
  for await (const chunk of chunks) {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: chunk,
    });

    console.log("converted text into vector");
    const embeddings = response.embeddings;

    if (embeddings && embeddings.length > 0) {
      const fullVector = embeddings[0].values;

      if (fullVector && Array.isArray(fullVector)) {
        //store only vector of 768 dimensions
        const vector = fullVector.slice(0, 768);

        //storing the vector into vector database
        const res = await collection.insertOne({
          $vector: vector,
          text: chunk,
        });

        console.log("Saved data to the collection , database Astra DB");
        console.log(res);
      }
    }
  }
};
