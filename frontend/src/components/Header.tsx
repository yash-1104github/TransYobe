import { Button } from "@/components/ui/button";
import { Home, LogOut, Sparkles, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [name, setName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const client = JSON.parse(storedUser);

    if (client) {
      const detail = client.name.split(" ")[0];
      setName(detail);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 md:px-12 h-20 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            TransYobe
          </span>
        </div>

        <nav className="flex items-center gap-4">
          {!isHome && (
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          )}

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">
                Welcome, {name}
              </span>
              <div className="relative" ref={menuRef}>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setMenuOpen((open) => !open)}
                  aria-expanded={menuOpen}
                  aria-haspopup="menu"
                >
                  <User className="w-4 h-4" />
                </Button>
                {menuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-[60]"
                  >
                    <button
                      role="menuitem"
                      type="button"
                      onClick={handleLogout}
                      className="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </nav>
      </div>
    </div>
  );
}
