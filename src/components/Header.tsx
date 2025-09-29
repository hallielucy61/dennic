import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Team", href: "/team" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  // Check auth status
  supabase.auth.getSession().then(({ data: { session } }) => {
    setUser(session?.user ?? null);
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    } else {
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    }
  };

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-accent" />
              <span className="font-bold text-xl">Dennic Engineering</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  location.pathname === item.href
                    ? "text-accent"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <>
                <Link
                  to="/admin"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
                >
                  Admin
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
            {!user && (
              <Link to="/auth">
                <Button variant="default" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.href
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:bg-muted"
                >
                  Admin
                </Link>
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            )}
            {!user && (
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="default" className="w-full mt-2">
                  Login
                </Button>
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
