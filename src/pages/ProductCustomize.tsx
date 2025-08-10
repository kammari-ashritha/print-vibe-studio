import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const productConfig = {
  slug: "business-card",
  name: "Business Card",
  basePrice: 1200, // in cents for 100 qty base
  sizes: [
    { label: "3.5 x 2 in (US Standard)", value: "3.5x2", price: 0 },
    { label: "3.3 x 2.1 in (EU)", value: "3.3x2.1", price: 100 },
  ],
  paper: [
    { label: "Matte 14pt", value: "matte14", price: 0 },
    { label: "Gloss 16pt", value: "gloss16", price: 200 },
    { label: "Linen 14pt", value: "linen14", price: 300 },
  ],
  finish: [
    { label: "No Lamination", value: "none", price: 0 },
    { label: "Soft Touch", value: "soft-touch", price: 300 },
    { label: "UV Spot", value: "uv-spot", price: 500 },
  ],
  quantities: [100, 250, 500, 1000],
};

const ProductCustomize = () => {
  const { slug } = useParams();
  const { addItem } = useCart();

  // Default selections
  const [size, setSize] = useState(productConfig.sizes[0].value);
  const [paper, setPaper] = useState(productConfig.paper[0].value);
  const [finish, setFinish] = useState(productConfig.finish[0].value);
  const [quantity, setQuantity] = useState<number>(productConfig.quantities[0]);
  const [artPreview, setArtPreview] = useState<string | undefined>();
  const [text, setText] = useState("Your Business");
  const [text2, setText2] = useState("Tagline / Name");

  const price = useMemo(() => {
    const sizePrice = productConfig.sizes.find((s) => s.value === size)?.price ?? 0;
    const paperPrice = productConfig.paper.find((p) => p.value === paper)?.price ?? 0;
    const finishPrice = productConfig.finish.find((f) => f.value === finish)?.price ?? 0;
    const qtyFactor = quantity / 100; // base is 100 qty
    const total = (productConfig.basePrice + sizePrice + paperPrice + finishPrice) * qtyFactor;
    return Math.round(total);
  }, [size, paper, finish, quantity]);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Preview supports images", description: "Upload JPG/PNG to preview. PDFs supported at checkout." });
      return;
    }
    const url = URL.createObjectURL(file);
    setArtPreview(url);
  };

  const addToCart = () => {
    addItem({
      productId: slug || productConfig.slug,
      name: productConfig.name,
      options: { size, paper, finish },
      quantity: 1,
      unitPrice: price,
      artworkPreviewUrl: artPreview,
    });
    toast({ title: "Added to cart", description: `${productConfig.name} configured and added.` });
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{`${productConfig.name} Customizer | PrintCraft`}</title>
        <meta name="description" content="Customize business cards with size, paper, finish and get live pricing and preview." />
        <link rel="canonical" href={`/customize/${productConfig.slug}`} />
      </Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <Card className="order-2 lg:order-1">
          <CardHeader>
            <CardTitle>Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Size</Label>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {productConfig.sizes.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Paper</Label>
                <Select value={paper} onValueChange={setPaper}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select paper" />
                  </SelectTrigger>
                  <SelectContent>
                    {productConfig.paper.map((p) => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Finish</Label>
                <Select value={finish} onValueChange={setFinish}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select finish" />
                  </SelectTrigger>
                  <SelectContent>
                    {productConfig.finish.map((f) => (
                      <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Select value={String(quantity)} onValueChange={(v) => setQuantity(Number(v))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    {productConfig.quantities.map((q) => (
                      <SelectItem key={q} value={String(q)}>{q}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <Label>Upload artwork (JPG/PNG)</Label>
                <Input type="file" accept="image/*" onChange={onUpload} />
              </div>
              <div className="space-y-2">
                <Label>Preview text (line 1)</Label>
                <Input value={text} onChange={(e) => setText(e.target.value)} />
                <Label className="mt-2">Preview text (line 2)</Label>
                <Input value={text2} onChange={(e) => setText2(e.target.value)} />
              </div>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <p className="text-sm text-muted-foreground">Estimated total</p>
                <p className="text-2xl font-semibold">${(price / 100).toFixed(2)}</p>
              </div>
              <Button variant="hero" className="hover-lift" onClick={addToCart}>Add to Cart</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="order-1 lg:order-2">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="glass-card rounded-md p-4">
              <AspectRatio ratio={3.5/2}>
                <div className="relative h-full w-full rounded-md bg-gradient-primary overflow-hidden">
                  {artPreview ? (
                    <img src={artPreview} alt="Artwork preview" className="absolute inset-0 h-full w-full object-cover opacity-90"/>
                  ) : null}
                  <div className="absolute inset-0 grid place-items-center text-center px-4">
                    <div>
                      <div className="text-hero-foreground text-xl font-semibold drop-shadow-md">{text}</div>
                      <div className="text-hero-foreground opacity-90 text-sm mt-1">{text2}</div>
                    </div>
                  </div>
                </div>
              </AspectRatio>
            </div>
            <p className="text-xs text-muted-foreground mt-2">This is an on-screen preview. Colors may vary in print.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ProductCustomize;
