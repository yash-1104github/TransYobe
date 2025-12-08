import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import {
  Play,
  MessageSquare,
  Sparkles,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-2xl p-6 bg-card/40 backdrop-blur-sm transition-all duration-300">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="text-xl font-meidum">{question}</div>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {open && (
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
};

export const Landing = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      navigate("/player");
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">

        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="text-5xl mt-5 md:text-7xl font-bold bg-gradient-to-r  from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
              Watch & Learn with AI
            </div>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Paste any YouTube link, watch the video, and get instant answers
              to your questions with our AI assistant. Transform passive viewing
              into active learning.
            </p>

            <div className="flex gap-4 justify-center pt-4">
              <Button
                size="lg"
                variant="hero"
                className="text-lg px-8"
                onClick={() => handleStart()}
              >
                <Play className="w-8 h-8 mr-2" />
                Get Started
              </Button>
            </div>
          </div>

          <div className="text-center mt-24 mb-12">
            <div className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              How It Works
            </div>
            <div className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three simple steps to transform how you learn from videos
            </div>
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

        <div className="container mx-auto py-24 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of learners transforming how they consume video
              content
            </p>
          </div>

          <div className="w-full mx-auto px-2">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 backdrop-blur-sm bg-card/50 border-border h-full">
                    <div className="text-muted-foreground mb-6">
                      "This platform has completely changed how I learn from
                      YouTube tutorials. The AI assistant answers my questions
                      instantly"
                    </div>
                    <div className="flex justify-between  items-center gap-3">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                            RG
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">Rohan Gupta</p>
                          <p className="text-sm text-muted-foreground">
                            Software Developer
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-primary text-primary"
                          />
                        ))}
                      </div>
                    </div>
                  </Card>
                </CarouselItem>

                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 backdrop-blur-sm bg-card/50 border-border h-full">
                    <div className="text-muted-foreground mb-6">
                      "This platform has completely transformed the way I watch
                      YouTube tutorials. Whenever I get stuck, the AI assistant
                      explains everything instantly"
                    </div>
                    <div className="flex justify-between  items-center gap-3">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                            SS
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">Sumit Sharma</p>
                          <p className="text-sm text-muted-foreground">
                            Software Developer
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(4)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-primary text-primary"
                          />
                        ))}
                      </div>
                    </div>
                  </Card>
                </CarouselItem>

                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 backdrop-blur-sm bg-card/50 border-border h-full">
                    <div className="text-muted-foreground mb-6">
                      "As a student, this tool is invaluable. I can watch
                      lectures and get clarifications on complex topics without
                      rewinding constantly."
                    </div>
                    <div className="flex justify-between  items-center gap-3">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-br from-accent to-primary text-white">
                            AK
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">Abhijeet Katara</p>
                          <p className="text-sm text-muted-foreground">
                            Medical Student
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-primary text-primary"
                          />
                        ))}
                      </div>
                    </div>
                  </Card>
                </CarouselItem>

                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 backdrop-blur-sm bg-card/50 border-border h-full">
                    <div className="text-muted-foreground mb-6">
                      "The AI understands context so well. It's like having a
                      personal tutor available 24/7. Absolutely game-changing
                      Application"
                    </div>
                    <div className="flex justify-between  items-center gap-3">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-br from-primary via-accent to-primary text-white">
                            VK
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">Virat Kohli</p>
                          <p className="text-sm text-muted-foreground">
                            UX Designer
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-primary text-primary"
                          />
                        ))}
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        <div className="">
          <div className="container mx-auto mt-16  mb-8 max-w-5xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg text-center mb-12 max-w-2xl mx-auto">
              Everything you need to know about using our AI-powered video
              learning platform.
            </p>

            <div className="space-y-6">
              <FAQItem
                question="How do I start using the platform?"
                answer="Just paste any YouTube link and the video will load instantly. You can start asking questions right away using our AI assistant."
              />

              <FAQItem
                question="Is this tool free to use?"
                answer="Yes, core features like watching videos and asking questions are completely free. We may introduce premium options later for advanced tools."
              />

              <FAQItem
                question="Does it work with all YouTube videos?"
                answer="Yes, the platform supports almost every public YouTube video. Private or age-restricted videos may not load."
              />

              <FAQItem
                question="What kind of questions can I ask the AI?"
                answer="You can ask anything related to the video — explanations, summaries, definitions, timestamps, and more. The AI is context-aware and learns from the video."
              />

              <FAQItem
                question="Is my data safe?"
                answer="Absolutely. We don't store your questions or video interactions unless required for improving performance. Privacy is a top priority."
              />
            </div>
          </div>

          <div className="container mx-auto px-4 md:pt-24">
            <Card className="p-12 backdrop-blur-sm bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Ready to revolutionize how you <br /> consume video content?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
                Join thousands of learners who are saving hours every week with
                AI-powered video Q&A
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
        </div>
      </div>
       <Footer />
    </div>
  );
};
