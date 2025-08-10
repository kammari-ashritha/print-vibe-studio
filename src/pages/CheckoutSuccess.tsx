import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutSuccessPage = () => {
  const { state } = useLocation() as { state: { orderId?: string } };
  const navigate = useNavigate();

  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <Helmet>
        <title>Order Confirmed | PrintCraft</title>
        <meta name="description" content="Your PrintCraft order has been placed successfully." />
        <link rel="canonical" href="/checkout/success" />
      </Helmet>

      <div className="mx-auto max-w-lg rounded-md border p-8">
        <div className="h-12 w-12 mx-auto rounded-full bg-gradient-primary mb-4" aria-hidden />
        <h1 className="text-2xl font-semibold">Thank you for your order!</h1>
        <p className="text-muted-foreground mt-2">Order ID: <span className="font-mono">{state?.orderId ?? "N/A"}</span></p>
        <Button variant="hero" className="mt-6" onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    </main>
  );
};

export default CheckoutSuccessPage;
