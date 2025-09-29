import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-foreground">Dennic Electrical Engineering</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted partner in electrical engineering, providing innovative and reliable solutions for complex challenges.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">QUICK LINKS</h3>
            <div className="grid grid-cols-2 gap-2">
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
              <ul className="space-y-2">
                <li>
                  <Link to="/services" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">CONNECT WITH US</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Dennic Electrical Engineering. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
