import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>PrintCraft — Custom Printing Made Easy</title>
        <meta name="description" content="Customize business cards and more with live previews, dynamic pricing, and smooth checkout." />
        <link rel="canonical" href="/" />
      </Helmet>

      <section className="container mx-auto px-4 pt-16 pb-20 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto h-14 w-14 rounded-lg bg-gradient-primary shadow-elegant" aria-hidden />
          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">Design. Preview. Print.</h1>
          <p className="mt-4 text-lg text-muted-foreground">Premium business cards with real‑time preview and instant pricing. Start with our modern Business Card builder.</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to="/customize/business-card"><Button variant="hero" className="hover-lift">Start Customizing</Button></Link>
            <Link to="/login"><Button variant="outline">Login</Button></Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">Live Preview</h3>
          <p className="text-sm text-muted-foreground">See your artwork and text on your product in real time.</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">Dynamic Pricing</h3>
          <p className="text-sm text-muted-foreground">Price updates instantly based on your selections.</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">Fast Checkout</h3>
          <p className="text-sm text-muted-foreground">Secure mock payment to finalize your order quickly.</p>
        </div>
      </section>
    </main>
  );
};

export default Index;

