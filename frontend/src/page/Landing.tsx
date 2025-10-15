import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Play,
  MessageSquare,
  Sparkles,
  Zap,
  Shield,
  Headphones,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";

const Landing = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    if (!isAuthenticated()) {
      navigate("/login"); 
    } else {
      navigate("/player");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              AI-Powered Video Learning
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            Watch & Learn with AI
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Paste any YouTube link, watch the video, and get instant answers to
            your questions with our AI assistant. Transform passive viewing into
            active learning.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Button
              size="lg"
              variant="hero"
              className="text-lg px-8"
              onClick={() => handleStart()}
            >
              <Play className="w-5 h-5 mr-2" />
              Get Started
            </Button>
          </div>
        </div>

        <div className="text-center mt-24 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Feature's Of Application
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need for an enhanced learning experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 backdrop-blur-sm bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
              <Play className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Any YouTube Video</h3>
            <p className="text-muted-foreground">
              Simply paste any YouTube link and start watching instantly. No
              downloads, no hassle.
            </p>
          </Card>

          <Card className="p-6 backdrop-blur-sm bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Chat Assistant</h3>
            <p className="text-muted-foreground">
              Ask questions about the video content and get intelligent,
              context-aware answers.
            </p>
          </Card>

          <Card className="p-6 backdrop-blur-sm bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Learning</h3>
            <p className="text-muted-foreground">
              Transform any video into an interactive learning experience with
              AI-powered insights.
            </p>
          </Card>
        </div>
      </div>

      <div className="container  mx-auto  py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of learners transforming how they consume video
            content
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8  mx-auto">
          <Card className="p-6 backdrop-blur-sm bg-card/50 border-border">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground mb-6">
              "This platform has completely changed how I learn from YouTube
              tutorials. The AI assistant answers my questions instantly!"
            </p>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                  SK
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Sarah Kim</p>
                <p className="text-sm text-muted-foreground">
                  Software Developer
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 backdrop-blur-sm bg-card/50 border-border">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground mb-6">
              "As a student, this tool is invaluable. I can watch lectures and
              get clarifications on complex topics without rewinding
              constantly."
            </p>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-accent to-primary text-white">
                  MJ
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Marcus Johnson</p>
                <p className="text-sm text-muted-foreground">Medical Student</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 backdrop-blur-sm bg-card/50 border-border">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground mb-6">
              "The AI understands context so well. It's like having a personal
              tutor available 24/7. Absolutely game-changing!"
            </p>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-primary via-accent to-primary text-white">
                  EP
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Emily Parker</p>
                <p className="text-sm text-muted-foreground">UX Designer</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24">
        <Card className="p-12 backdrop-blur-sm bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start watching and learning smarter today. No credit card required.
          </p>
          <Button
            size="lg"
            variant="hero"
            className="text-lg px-12"
            onClick={() => navigate("/player")}
          >
            <Play className="w-5 h-5 mr-2" />
            Get Started Free
          </Button>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
