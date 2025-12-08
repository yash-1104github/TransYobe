import React, { createContext, useContext, useState, useEffect } from "react";

interface VideoContextType {
  youtubeUrl: string;
  setYoutubeUrl: (url: string) => void;
  videoId: string;
  loadVideo: () => void;
  clearVideo: () => void;
}

const VideoContext = createContext<VideoContextType>({
  youtubeUrl: "",
  setYoutubeUrl: () => {},
  videoId: "",
  loadVideo: () => {},
  clearVideo: () => {},
});

export const VideoProvider = ({ children }) => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    const savedUrl = localStorage.getItem("youtube_url");
    const savedVideoId = localStorage.getItem("video_id");
    if (savedUrl) setYoutubeUrl(savedUrl);
    if (savedVideoId) setVideoId(savedVideoId);
  }, []);

  useEffect(() => {
    localStorage.setItem("youtube_url", youtubeUrl || "");
    localStorage.setItem("video_id", videoId || "");
  }, [youtubeUrl, videoId]);

  const extractVideoId = (url : string) => {
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  const loadVideo = (url : string) => {
    setYoutubeUrl(url);
    const id = extractVideoId(url);
    if (id) setVideoId(id);
  };

  const clearVideo = () => {
    setYoutubeUrl("");
    setVideoId("");
    localStorage.removeItem("youtube_url");
    localStorage.removeItem("video_id");
  };

  return (
    <VideoContext.Provider
      value={{
        youtubeUrl,
        setYoutubeUrl,
        videoId,
        setVideoId,
        loadVideo,
        clearVideo,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);
