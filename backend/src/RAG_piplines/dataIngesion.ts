import "dotenv/config";
import OpenAI from "openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Index } from "@pinecone-database/pinecone";
import pc from "../databse/vector_db";
import { sendProgress, sendDone } from "../utils/sse";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: Number(process.env.CHUNK_SIZE),
  chunkOverlap: Number(process.env.CHUNK_OVERLAP),
});

const indexName = process.env.PINECONE_INDEX_NAME;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

//Ensures the Pinecone index exists and is ready before using it.
export async function ensureIndex(): Promise<void> {
  const { indexes } = await pc.listIndexes();
  const exists = indexes.some((idx) => idx.name === indexName);

  if (!exists) {
    console.log(`Creating Pinecone index: ${indexName}`);
    await pc.createIndex({
      name: indexName,
      dimension: 768,
      metric: "cosine",
      spec: { serverless: { cloud: "aws", region: "us-east-1" } },
    });
  }

  // Wait until ready
  let ready = false;
  while (!ready) {
    const { status } = await pc.describeIndex(indexName);
    if (status?.ready) {
      ready = true;
      console.log("Index is ready!");
    } else {
      console.log("Waiting for index to be ready...");
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
}

// Initializes the Pinecone index (creates if needed and returns it)
export async function initPinecone(): Promise<Index> {
  await ensureIndex();
  return pc.Index(indexName);
}

// Lazily initialized promise for the Pinecone index
export const indexPromise: Promise<Index> = initPinecone();


// Ingests and stores text embeddings in Pinecone

export const loadSampleData = async (content: string): Promise<void> => {

  const index = await indexPromise; // ✅ ensure 'index' is available here
  console.log("🚀 Starting Pinecone data ingestion...");

  // Split content into chunks
  const chunks = await splitter.splitText(content);
  console.log(`✅ Split text into ${chunks.length} chunks`);

  // Clear existing data
  try {
    await index.deleteAll();
    console.log("Cleared old vectors from Pinecone index");
  } catch (err: any) {
    console.warn("Could not clear previous data:", err.message);
  }

  //store embeddings
  let count = 0;

  for (const chunk of chunks) {

    const embeddingResponse = await client.embeddings.create({
      model: process.env.OPENAI_EMBEDDING_MODEL!,
      input: chunk,
      dimensions: 768,
    });

    const vector = embeddingResponse.data[0].embedding;

    await index.upsert([
      {
        id: `chunk-${count}`,
        values: vector,
        metadata: { text: chunk },
      },
    ]);

    const percentage = Math.round(((count + 1) / chunks.length) * 100);
    console.log(`📦 Stored chunk ${count + 1}/${chunks.length}`);

    sendProgress(percentage);
    count++;
  }

  console.log("Data ingestion complete....");
};

sendDone();