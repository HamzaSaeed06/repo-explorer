import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-muted border-t border-border mt-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-1">
          <h3 className="text-lg font-bold text-foreground leading-tight mb-4">
            JOHN LEWIS
            <span className="block text-[8px] tracking-[0.2em] font-normal text-muted-foreground">& PARTNERS</span>
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="email"
              placeholder="Get latest offers to your inbox"
              className="flex-1 min-w-0 px-3 py-2 text-xs border border-input rounded-l-lg bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button className="h-9 w-9 bg-foreground text-primary-foreground rounded-r-lg flex items-center justify-center hover:opacity-90 transition-opacity">
              <Mail className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <button key={i} className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Links */}
        {[
          { title: "Shop", links: ["My Account", "Login", "Wishlist", "Cart"] },
          { title: "Information", links: ["Shipping Policy", "Returns & Refunds", "Cookies Policy", "Frequently Asked"] },
          { title: "Company", links: ["About Us", "Privacy Policy", "Terms & Conditions", "Contact Us"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-foreground mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom */}
    <div className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <p>© John Lewis plc 2020 - 2024</p>
        <div className="flex items-center gap-4">
          <span>🇬🇧 English</span>
          <span>USD</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
