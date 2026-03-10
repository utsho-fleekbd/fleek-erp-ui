import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary"><Zap className="h-5 w-5 text-primary-foreground" /></div>
          <h1 className="text-xl font-semibold">Reset your password</h1>
          <p className="text-sm text-muted-foreground">We'll send you a reset link</p>
        </div>
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="john@acme.com" className="bg-secondary border-border" /></div>
            <Button className="w-full">Send Reset Link</Button>
            <p className="text-center text-xs text-muted-foreground"><Link to="/login" className="text-primary hover:underline">Back to sign in</Link></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
