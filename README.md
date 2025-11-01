# TransYobe — AI Powered YouTube Assistant
</hr>

**Application Overview:**
TransYobe is an intelligent web application that helps users interactively get answers to their questions about any YouTube video. By leveraging RAG (Retrieval-Augmented Generation) and Gemini AI models, 
the app enables users to understand video content efficiently without watching the entire thing.Users can sign in, load any YouTube video, and chat in real time with an 
AI assistant that comprehends the video’s content — all within an elegant dashboard interface.

**🛠 Tech Stack Used**

- Frontend: React, TypeScript, TailwindCSS
- Backend: Express.js , Node.js
- Authentication: JWT Authentication
- Database / Vector Store: Pinecone , MongoDB
- AI Model: Gemini (Google Generative AI)
- Architecture: Retrieval-Augmented Generation (RAG), Server Sent Events (SSE) 
- Hosting: Docker , Vercel , Render

**🚀 Key Features**

- 🔐 User Authentication: Secure JWT-based login and signup.
- 🎥 YouTube Video Loading: Paste a YouTube video URL to fetch and process its content.
- 💬 AI Chat Interface: Ask context-based questions related to the loaded video.
- 🧠 RAG-Powered Understanding: Combines video transcripts with Gemini model reasoning for accurate answers.
- 📊 Vector Database (Pinecone): Stores and retrieves video embeddings for fast contextual search.
- 🖥 Dashboard View: Play the selected YouTube video while chatting simultaneously on the same page.
- ⚡ TypeScript-Driven: Full type safety across the stack for cleaner and more reliable code.

**🔄 How It Works**

- Sign In: Users authenticate using JWT-based login.
- Load Video: Paste a YouTube video URL into the dashboard to fetch its transcript and metadata.
- Data Indexing: The video transcript is chunked, embedded, and stored in Pinecone for semantic retrieval.
- Ask Questions: Users type questions into the chat section. The system retrieves relevant chunks using RAG and passes them to the Gemini model for response generation.
- Interactive Dashboard: Watch the YouTube video on the left and view the AI’s contextual answers in the chat section on the right.

**⚙️ Installation**
- Clone the repository:
- git clone https://github.com/yourusername/transYobe.git
- cd transYobe
- npm install

- Set up environment variables — Create a .env file in the root directory and add the following keys:

- JWT_SECRET=your_jwt_secret
- PINECONE_API_KEY=your_pinecone_key
- PINECONE_ENVIRONMENT=your_pinecone_environment
- GEMINI_API_KEY=your_gemini_key

- Run the application:
- npm run dev
- Access the app at http://localhost:3000

**🤝 Contributing**
- Contributions are welcome!

⭐ Star this repository if TransYobe helped you explore YouTube videos smarter with AI!
