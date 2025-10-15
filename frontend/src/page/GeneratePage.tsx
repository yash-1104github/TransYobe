import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoSection";
import { ChatSection } from "@/components/ChatSection";
import { useState } from "react";

export default function GeneratePage() {
  const [loading, setLoading] = useState(false);
  const [videoId, setVideoId] = useState("");

  return (
    <div className="min-h-screen bg-background/30 lg:bg-background">
      <Header />
      <div className="border-b border-border bg-card/50 backdrop-blur-sm"></div>
      <div className="flex flex-col  lg:flex-row h-screen lg:h-[calc(100vh-80px)]">
        
        <div className="w-full mb-8 lg:mb-0 lg:w-[65%] px-6 md:px-10 py-5 flex-col items-center justify-center  lg:bg-secondary/30">
          <VideoPlayer
            videoId={videoId}
            setVideoId={setVideoId}
            loading={loading}
            setLoading={setLoading}
          />
        </div>

        <div className="w-full lg:w-[35%] border-t lg:border-t-0 lg:border-l border-borde bg-card/30 backdrop-blur-sm flex flex-col">
          <ChatSection videoId={videoId} loading={loading} />
        </div>

      </div>
    </div>
  );
}