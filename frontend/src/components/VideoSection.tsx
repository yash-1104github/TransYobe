import { Play, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SlClose } from "react-icons/sl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Transcript from "@/api/Transcript";

export default function VideoPlayer({
  videoId,
  setVideoId,
  loading,
  setLoading,
}) {
  const [youtubeUrl, setyoutubeUrl] = useState("");

  const reloadWindow = () => {
    window.location.reload();
  };

  const handleLoadVideo = async () => {
    setLoading(true);

    if (!youtubeUrl || youtubeUrl.trim() === "") {
      console.log("YouTube URL is missing");
      toast("YouTube URL is missing");
      setLoading(false);
      return;
    }

    console.log(youtubeUrl);

    const youtubeRegex =
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|shorts\/)?([A-Za-z0-9_-]{11})([&?].*)?$/;
    if (!youtubeRegex.test(youtubeUrl)) {
      console.log("Invalid YouTube URL");
      toast("Invalid YouTube URL");
      setLoading(false);
      return;
    }

    console.log("Valid YouTube URL:", youtubeUrl);

    function extractVideoId(url: any) {
      if (typeof url !== "string") {
        console.error("Invalid input: URL must be a string.");
        toast("Invalid input: URL must be a string");
        return null;
      }

      const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
      const match = url.match(regExp);
      return match && match[1] ? match[1] : null;
    }

    const val = extractVideoId(youtubeUrl);
    setVideoId(val);

    // await new Promise((resolve) => setTimeout(resolve, 8000));

    try {
      // const res = await Transcript({ youtubeUrl });
      // console.log("Transcript response:", res.data);
      console.log("button click");
    } catch (err) {
      console.log("Something went wrong", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="relative flex flex-col md:flex-row gap-4 md:gap-20  w-full md:px-4 md:py-4 justify-center items-start">
          
          <div className="relative w-full flex md:flex-1">
            <Input
              placeholder="Paste YouTube URL here..."
              value={youtubeUrl}
              onChange={(e) => setyoutubeUrl(e.target.value)}
              className="w-full px-4 py-4"
            />
            {youtubeUrl && (
              <SlClose
                className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={() => reloadWindow()}
              />
            )}
          </div>

            <Button
              onClick={handleLoadVideo}
              disabled={loading || !!videoId}
              variant="hero"
            >
              <Play className="w-4 h-4 mr-4" />
              Load Video
            </Button>
        </div>

        <div className="mt-24">
          {videoId ? (
            <div className="w-full  aspect-video rounded-lg overflow-hidden -mt-16 shadow-2xl border border-border">
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
    </>
  );
}
