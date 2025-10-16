import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./page/Landing";
import VideoPlayer from "./page/GeneratePage";
import LoginPage from "./page/LoginPage";
import ProtectedRoute from "@/utils/ProtectedRoute";
import SignupPage from "./page/SignUpPage";
import { ChatProvider } from "@/context/ChatContext";
import { VideoProvider } from "@/context/VideoContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <VideoProvider>
        <ChatProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/player"
                element={
                  <ProtectedRoute>
                    <VideoPlayer />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ChatProvider>
      </VideoProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
