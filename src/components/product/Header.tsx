import { Search, Heart, ShoppingBag, User, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground leading-tight">
              JOHN LEWIS
              <span className="block text-[8px] sm:text-[10px] tracking-[0.2em] font-normal text-muted-foreground">
                & PARTNERS
              </span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => setSearchOpen(!searchOpen)} className="text-muted-foreground hover:text-foreground transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-1 text-sm text-foreground hover:text-muted-foreground transition-colors">
              Categories <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 text-sm text-foreground hover:text-muted-foreground transition-colors">
              <User className="w-5 h-5" /> Sign In
            </button>
            <button className="text-foreground hover:text-muted-foreground transition-colors relative">
              <Heart className="w-5 h-5" />
            </button>
            <button className="text-foreground hover:text-muted-foreground transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-foreground text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </nav>

          {/* Mobile Nav */}
          <div className="flex md:hidden items-center gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className="text-muted-foreground">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-foreground relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-foreground text-primary-foreground text-[10px] rounded-full flex items-center justify-center">2</span>
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-foreground">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">
            <button className="flex items-center gap-2 w-full text-sm text-foreground py-2">
              <User className="w-5 h-5" /> Sign In
            </button>
            <button className="flex items-center gap-2 w-full text-sm text-foreground py-2">
              <Heart className="w-5 h-5" /> Wishlist
            </button>
            <button className="flex items-center gap-2 w-full text-sm text-foreground py-2">
              Categories <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
