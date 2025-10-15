import { Sparkles, Github, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI Video Learn
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transform passive viewing into active learning with AI-powered video assistance.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button onClick={() => navigate('/player')} className="hover:text-primary transition-colors">
                  Video Player
                </button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors">
                  Features
                </button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors">
                  Pricing
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button className="hover:text-primary transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors">
                  Blog
                </button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors">
                  Careers
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button className="hover:text-primary transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors">
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Video Learn. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/yash-1104github" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/yash-gupta-1a137b223/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}