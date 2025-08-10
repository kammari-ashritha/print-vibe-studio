import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useNavigate, Link } from "react-router-dom";

const CartPage = () => {
  const { state, subtotal, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  return (
    <main className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Cart | PrintCraft</title>
        <meta name="description" content="Review your customized print products and proceed to checkout." />
        <link rel="canonical" href="/cart" />
      </Helmet>

      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      {state.items.length === 0 ? (
        <div className="rounded-md border p-6 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Button variant="hero" className="mt-4" onClick={() => navigate("/customize/business-card")}>Start Customizing</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-md border p-4">
                <div className="h-16 w-28 rounded bg-muted overflow-hidden">
                  {item.artworkPreviewUrl ? (
                    <img src={item.artworkPreviewUrl} alt={`${item.name} preview`} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-gradient-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {Object.entries(item.options).map(([k, v]) => (
                      <span key={k} className="mr-3">{k}: {v}</span>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <label htmlFor={`qty-${item.id}`} className="text-sm text-muted-foreground">Qty</label>
                    <input
                      id={`qty-${item.id}`}
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      className="h-9 w-20 rounded-md border bg-background px-2"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${((item.unitPrice * item.quantity) / 100).toFixed(2)}</div>
                  <button className="text-sm text-destructive mt-2 underline-offset-4 hover:underline" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <aside className="lg:col-span-1 rounded-md border p-4 h-fit">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">${(subtotal / 100).toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Shipping and taxes calculated at checkout.</p>
            <Button variant="hero" className="w-full mt-4" onClick={() => navigate("/checkout")}>Checkout</Button>
            <Link to="/customize/business-card" className="text-primary text-sm mt-3 inline-block underline-offset-4 hover:underline">Add more products</Link>
          </aside>
        </div>
      )}
    </main>
  );
};

export default CartPage;
