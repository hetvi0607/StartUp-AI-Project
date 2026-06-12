import Link from "next/link";
import { RegisterForm } from "@/components/auth-forms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background bg-aurora-grid mesh px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Link href="/" className="text-sm text-cyan">StartupHub AI</Link>
          <CardTitle className="text-2xl">Create your founder account</CardTitle>
        </CardHeader>
        <CardContent><RegisterForm /></CardContent>
      </Card>
    </main>
  );
}
