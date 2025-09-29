import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-accent" />
              <span className="font-bold text-xl">Dennic Engineering</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Building innovative engineering solutions for a better tomorrow.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-sm text-primary-foreground/80">
                Civil Engineering
              </li>
              <li className="text-sm text-primary-foreground/80">
                Structural Design
              </li>
              <li className="text-sm text-primary-foreground/80">
                Project Management
              </li>
              <li className="text-sm text-primary-foreground/80">
                Consulting
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>123 Engineering Way</li>
              <li>Tech City, TC 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@dennic.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/80">
          <p>
            © {new Date().getFullYear()} Dennic Engineering. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
