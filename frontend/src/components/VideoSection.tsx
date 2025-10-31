import { Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SlClose } from "react-icons/sl";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Transcript from "@/api/Transcript";
import { useVideo } from "@/context/VideoContext";
import { useState } from "react";
import { set } from "react-hook-form";

export default function VideoPlayer({ loading, setLoading, setProgress }) {
  const API_URL = import.meta.env.VITE_API_URL;
  //@ts-ignore
  const { youtubeUrl, setYoutubeUrl, videoId, loadVideo, clearVideo } =
    useVideo();

  const handleLoadVideo = async () => {
    setLoading(true);
    setProgress(0);

    if (!youtubeUrl || youtubeUrl.trim() === "") {
      toast("YouTube URL is missing");
      setLoading(false);
      return;
    }

    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|shorts\/)?([A-Za-z0-9_-]{11})([&?].*)?$/;
    if (!youtubeRegex.test(youtubeUrl)) {
      toast("Invalid YouTube URL");
      setLoading(false);
      return;
    }

    try {
      await loadVideo(youtubeUrl); //set youtube url and set its video id only

      const transcriptPromise = Transcript({ youtubeUrl });

      const eventSource = new EventSource(`${API_URL}/progress`);

      eventSource.onmessage = (event) => {
        if (event.data === "done") {
          setProgress(100);
          setTimeout(() => {
            eventSource.close();
            setLoading(false);
          }, 500);
          return;
        }

        const data = JSON.parse(event.data);
        setProgress(data.progress);
      };

      eventSource.onerror = () => {
        console.error("SSE connection error");
        eventSource.close();
        setLoading(false);
      };

      const res = await transcriptPromise;

      console.log("transcript called & response", res);
    } catch (err) {
      console.error("Something went wrong:", err);
      toast("Failed to load video, Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative flex flex-col md:flex-row gap-4 md:gap-20 w-full md:px-4 md:py-4 justify-center items-start">
        <div className="relative w-full flex md:flex-1">
          <Input
            placeholder="Paste YouTube URL here..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="w-full font-medium px-4 py-5"
          />
          {youtubeUrl && (
            <SlClose
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => clearVideo()}
            />
          )}
        </div>

        <Button
          onClick={handleLoadVideo}
          disabled={loading || Boolean(localStorage.getItem("video_id"))}
          variant="hero"
        >
          <Play className="w-4 h-4 mr-2" />
          <span className="text-base">
            {loading ? "Loading..." : "Load Video"}
          </span>
        </Button>
      </div>

      <div className="mt-24">
        {videoId ? (
          <div className="w-full aspect-video rounded-lg overflow-hidden -mt-16 shadow-2xl border border-border">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Play className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              No Video Loaded
            </h2>
            <p className="text-muted-foreground">
              Paste a YouTube URL above to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
