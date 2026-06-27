import { Copy, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SlClose } from "react-icons/sl";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import Transcript from "@/api/Transcript";
import { useVideo } from "@/context/VideoContext";

const DEFAULT_VIDEO_URL = "https://www.youtube.com/watch?v=az8LKObSSxU";

export default function VideoPlayer({ loading, setLoading, setProgress }) {
  const API_URL = import.meta.env.VITE_API_URL;

  const { youtubeUrl, setYoutubeUrl, videoId, loadVideo, clearVideo } = useVideo();

  const handleLoadVideo = async () => {
    setLoading(true);
    setProgress(0);

    const urlToLoad = youtubeUrl.trim() || DEFAULT_VIDEO_URL;

    if (!urlToLoad) {
      toast("YouTube URL is missing");
      setLoading(false);
      return;
    }

    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|shorts\/)?([A-Za-z0-9_-]{11})([&?].*)?$/;
    if (!youtubeRegex.test(urlToLoad)) {
      toast("Invalid YouTube URL");
      setLoading(false);
      return;
    }

    try {
      await loadVideo(urlToLoad); //set youtube url and set its video id only

      const transcriptPromise = Transcript({ youtubeUrl: urlToLoad });

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

  const handleCopyDummyUrl = async () => {
    try {
      await navigator.clipboard.writeText(DEFAULT_VIDEO_URL);
      setYoutubeUrl(DEFAULT_VIDEO_URL);
      toast("URL copied and added to input");
    } catch {
      setYoutubeUrl(DEFAULT_VIDEO_URL);
      toast("URL added to input");
    }
  };

  return (
    <div>
      <div className="relative flex flex-col md:flex-row gap-4 md:gap-20 w-full md:px-4 md:py-4 justify-center items-start">
        <div className="relative w-full flex md:flex-1">
          <Input
            placeholder={DEFAULT_VIDEO_URL}
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

        <Tooltip>
          <TooltipTrigger asChild>
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
          </TooltipTrigger>
          <TooltipContent>Click on Load Video</TooltipContent>
        </Tooltip>
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
          <div className="text-center space-y-5 px-6 py-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Play className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              No Video Loaded
            </h2>

            <div className="max-w-2xl mx-auto rounded-xl border border-border bg-muted/30 px-6 py-5 space-y-4">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Use the dummy URL below, click on Load Video, then ask questions
                about the video.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-lg border border-border bg-background px-4 py-3">
                <span className="flex-1 text-sm md:text-base font-medium text-foreground break-all text-left">
                  {DEFAULT_VIDEO_URL}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopyDummyUrl}
                  className="shrink-0"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
