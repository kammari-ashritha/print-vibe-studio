import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const action = mode === "login" ? signIn : signUp;
    const { error } = await action(email, password);
    if (error) {
      toast({ title: "Auth error", description: error });
    } else {
      toast({ title: mode === "login" ? "Welcome back" : "Account created" });
      navigate("/");
    }
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <Helmet>
        <title>{mode === "login" ? "Login" : "Sign up"} | PrintCraft</title>
        <meta name="description" content="Secure login and signup for PrintCraft" />
        <link rel="canonical" href="/login" />
      </Helmet>

      <section className="mx-auto max-w-md rounded-lg border p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">{mode === "login" ? "Login" : "Create account"}</h1>
          <p className="text-sm text-muted-foreground mt-1">Use your email and password</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" variant="hero">
            {mode === "login" ? "Login" : "Sign up"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          {mode === "login" ? (
            <button className="text-primary underline-offset-4 hover:underline" onClick={() => setMode("signup")}>New here? Create an account</button>
          ) : (
            <button className="text-primary underline-offset-4 hover:underline" onClick={() => setMode("login")}>Already have an account? Login</button>
          )}
        </div>
      </section>
    </main>
  );
};

export default Auth;
