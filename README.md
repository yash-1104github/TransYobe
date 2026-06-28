# TransYobe — AI Powered YouTube Assistant

**Application Overview:**

TransYobe is an intelligent web application that helps users interactively get answers to their questions about any YouTube video. By leveraging RAG (Retrieval-Augmented Generation) with Google Gemini embeddings and OpenAI for query retrieval and answer generation, the app enables users to understand video content efficiently without watching the entire thing. Users can sign in, load any YouTube video, and chat in real time with an AI assistant that comprehends the video's content — all within an elegant dashboard interface.

**🛠 Tech Stack Used**

- Frontend: React, TypeScript, TailwindCSS
- Backend: Express.js, Node.js
- Authentication: JWT Authentication
- Database / Vector Store: Pinecone, MongoDB
- AI Models:
  - **Google Gemini** (`gemini-embedding-001`) — transcript embeddings at ingest time
  - **OpenAI** (`text-embedding-3-small`, `gpt-4o-mini`) — query embeddings and answer generation
- Architecture: Retrieval-Augmented Generation (RAG), Server Sent Events (SSE)
- Hosting: Docker, Vercel, Render

**🚀 Key Features**

- 🔐 User Authentication: Secure JWT-based login and signup.
- 🎥 YouTube Video Loading: Paste a YouTube video URL to fetch and process its content.
- 💬 AI Chat Interface: Ask context-based questions related to the loaded video.
- 🧠 RAG-Powered Understanding: Combines video transcripts with OpenAI reasoning for accurate answers.
- 📊 Vector Database (Pinecone): Stores and retrieves video embeddings for fast contextual search.
- 🖥 Dashboard View: Play the selected YouTube video while chatting simultaneously on the same page.
- ⚡ TypeScript-Driven: Full type safety across the stack for cleaner and more reliable code.

**🔄 How It Works**

1. **Sign In** — Users authenticate using JWT-based login.
2. **Load Video** — Paste a YouTube video URL into the dashboard to fetch its transcript and metadata.
3. **Data Indexing** — The transcript is chunked, embedded with Gemini, and stored in Pinecone.
4. **Ask Questions** — User questions are embedded with OpenAI, relevant chunks are retrieved from Pinecone, and `gpt-4o-mini` generates the answer.
5. **Interactive Dashboard** — Watch the YouTube video on the left and view the AI's contextual answers in the chat section on the right.

**⚙️ Installation**

Clone the repository:

```bash
git clone https://github.com/yourusername/transYobe.git
cd transYobe
```

**Backend**

```bash
cd backend
npm install
npm run dev
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

**Environment Variables**

Create a `.env` file in `backend/` with the following keys:

```bash
GOOGLE_API_KEY=your_google_api_key
OPENAI_API_KEY=your_openai_api_key
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PINECONE_API_KEY=your_pinecone_key
PINECONE_INDEX_NAME=transyobe-index
GEMINI_EMBEDDING_MODEL=gemini-embedding-001
CHUNK_SIZE=1020
CHUNK_OVERLAP=100
RAPIDAPI_KEY=your_rapidapi_key
```

Create a `.env` file in `frontend/` with:

```bash
VITE_API_URL=http://localhost:8000/api/v1
```

**Run with Docker**

```bash
docker compose pull
docker compose up -d
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8000

⭐ Star this repository if TransYobe helped you explore YouTube videos smarter with AI!
