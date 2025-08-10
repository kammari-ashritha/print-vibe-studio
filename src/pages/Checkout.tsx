import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { state, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      const orderId = Math.random().toString(36).slice(2, 10).toUpperCase();
      clear();
      navigate("/checkout/success", { state: { orderId } });
    }, 1200);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Checkout | PrintCraft</title>
        <meta name="description" content="Enter shipping details and complete your order with a secure mock payment." />
        <link rel="canonical" href="/checkout" />
      </Helmet>

      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 rounded-md border p-6">
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal">Postal code</Label>
              <Input id="postal" required />
            </div>
            <div className="sm:col-span-2 mt-2">
              <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Pay Now (Mock)"}
              </Button>
            </div>
          </form>
        </section>
        <aside className="lg:col-span-1 rounded-md border p-6 h-fit">
          <h2 className="font-medium mb-4">Order Summary</h2>
          <div className="space-y-3">
            {state.items.map((i) => (
              <div key={i.id} className="flex items-center justify-between text-sm">
                <span>{i.name}</span>
                <span>${((i.unitPrice * i.quantity) / 100).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t pt-3 font-semibold">
              <span>Subtotal</span>
              <span>${(subtotal / 100).toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CheckoutPage;
