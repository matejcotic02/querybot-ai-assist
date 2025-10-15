import { Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Security", "Roadmap"],
  Resources: ["Documentation", "API Reference", "Blog", "Changelog"],
  Company: ["About", "Careers", "Contact", "Privacy"],
  Contact: ["support@querybot.ai", "+1 (555) 123-4567"]
};

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
              <span className="text-xl font-bold">QueryBot</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered IT support automation that works.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center hover:border-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center hover:border-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 QueryBot. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
