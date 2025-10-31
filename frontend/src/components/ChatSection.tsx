import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Send, Download, Mic } from "lucide-react";
import GeneratingMessage from "@/components/GeneratingMessage";
import { useState } from "react";
import AskQuestions from "@/api/AskQuestions";
import { useVideo } from "@/context/VideoContext";
import { Progress } from "@/components/ui/progress";


declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export function ChatSection({ loading, progress }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);

  //@ts-ignore
  const { videoId } = useVideo();

  const handleDownloadChat = () => {
    if (messages.length === 0) return;

    const chatText = messages
      .map((msg) => `${msg.role === "user" ? "Me" : "Agent"}: ${msg.content}`)
      .join("\n\n");

    const blob = new Blob([chatText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "chat.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    const userMessage = message;
    setMessage("");

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Generating" },
    ]);

    try {
      const res = await AskQuestions({ userMessage });

      const aiResponse =
        res.data?.success && res.data?.formattedAnswer
          ? res.data.formattedAnswer
          : "Sorry, I couldn't process that question.";

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: aiResponse,
        };
        return updated;
      });
    } catch (error) {
      console.error("API Error:", error);

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "An error occurred while contacting the server. Please try again.",
        };
        return updated;
      });
    }
  };

  // const handleRecordQuery = async () => {
  //   const SpeechRecognition =
  //     (window as any).SpeechRecognition ||
  //     (window as any).webkitSpeechRecognition;

  //   const recognition = new SpeechRecognition();
  //   recognition.lang = "en-US";
  //   recognition.interimResults = true;
  //   recognition.continuous = true;

  //   recognition.onstart = () => console.log("Speech recognition started");
  //   recognition.onend = () => console.log("Speech recognition ended");
  //   recognition.onerror = (e: any) => console.error("Speech error:", e.error);
  //   recognition.onresult = (event: any) => {
  //     const transcript = event.results[event.results.length - 1][0].transcript;
  //     console.log("🗣️ Transcript:", transcript);
  //   };

  //   recognition.start();
  // };

  return (
    <>
      <div className="flex px-4 md:px-8 justify-between items-center p-4 border-b border-border">
        <div className="flex flex-col">
          <h3 className="font-semibold text-2xl text-blue-600">
            Ask Me Anything
          </h3>
          <p className="text-sm text-muted-foreground">
            Chat about the video content
          </p>
        </div>

        {messages.length > 0 && (
          <Button
            onClick={handleDownloadChat}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Chat
          </Button>
        )}
      </div>

      <ScrollArea className="flex-col lg:flex-1 p-4 relative">
        {!videoId ? (
          <div className="flex flex-col  items-center justify-center py-12 lg:py-60 text-muted-foreground">
            <div className="text-base px-2 font-medium ">
              Please Load a Video to get ready to chat with me{" "}
            </div>
          </div>
        ) : loading ? (

          <div className="flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm   py-12 lg:py-60  z-10">

            {/* <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div> */}

            <div className="w-full px-5">
              <Progress value={progress} className="h-3" />
              <div className="text-center text-base mt-2">{progress}%</div>
            </div>

            <p className="text-sm font-medium text-muted-foreground text-center">
              Processing video... This might take a few minutes.
              <br />
              Till then, enjoy the video!
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center  py-12 lg:py-60  text-muted-foreground">
            <p className="text-xl font-medium">Ready to chat!</p>
            <p className="text-base">
              Ask questions about the video content below.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <Card
                key={idx}
                className={`p-3 ${
                  msg.role === "user"
                    ? "bg-primary/10 border-primary/20 ml-8"
                    : "bg-secondary/50 border-border mr-8"
                }`}
              >
                <p className="text-sm">
                  {msg.content === "Generating" ? (
                    <GeneratingMessage />
                  ) : (
                    msg.content
                  )}
                </p>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="p-8 border-t border-border">
        <div className="flex gap-4">
          <Input
            placeholder="Ask a question..."
            className="px-3 py-5 front-medium w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={!videoId || loading}
          />
          {/* <Button
            onClick={handleRecordQuery}
            disabled={!videoId  || loading}
            variant="hero"
          >
            <Mic className="w-4 h-4" />
          </Button> */}
          <Button
            onClick={handleSendMessage}
            disabled={!videoId || !message.trim() || loading}
            variant="hero"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
