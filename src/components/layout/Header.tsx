import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { count } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-primary" aria-hidden />
          <span className="font-semibold">PrintCraft</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/customize/business-card" className={({ isActive }) => isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}>Business Cards</NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}>Cart</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => navigate("/cart")} aria-label="View cart" className="relative">
            <ShoppingCart />
            <span>Cart</span>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
                {count}
              </span>
            )}
          </Button>
          {user ? (
            <Button variant="secondary" onClick={() => signOut()}>
              <LogOut className="mr-1" /> Sign out
            </Button>
          ) : (
            <Button variant="hero" onClick={() => navigate("/login")} className="hover-lift">
              <LogIn className="mr-1" /> Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
