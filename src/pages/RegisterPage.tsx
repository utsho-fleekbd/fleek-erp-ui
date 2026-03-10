import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary"><Zap className="h-5 w-5 text-primary-foreground" /></div>
          <h1 className="text-xl font-semibold">Create your account</h1>
          <p className="text-sm text-muted-foreground">Get started with Fleek ERP</p>
        </div>
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label>First Name</Label><Input placeholder="John" className="bg-secondary border-border" /></div>
              <div className="space-y-2"><Label>Last Name</Label><Input placeholder="Doe" className="bg-secondary border-border" /></div>
            </div>
            <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="john@acme.com" className="bg-secondary border-border" /></div>
            <div className="space-y-2"><Label>Password</Label><Input type="password" placeholder="••••••••" className="bg-secondary border-border" /></div>
            <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" placeholder="••••••••" className="bg-secondary border-border" /></div>
            <Link to="/"><Button className="w-full">Create Account</Button></Link>
            <p className="text-center text-xs text-muted-foreground">Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
