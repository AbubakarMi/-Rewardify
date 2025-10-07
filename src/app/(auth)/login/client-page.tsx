"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Award, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  type Auth,
} from "firebase/auth";
import { getDoc, doc, type Firestore } from "firebase/firestore";
import { useAuth, useFirestore } from "@/firebase";

async function getRedirectPath(user: any, firestore: Firestore): Promise<string> {
  const userDocRef = doc(firestore, "users", user.uid);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    if (userData.role === 'admin') {
      return "/admin/dashboard";
    }
  }
  return "/employee/dashboard";
}

async function handleSuccessfulLogin(user: any, firestore: Firestore) {
    const token = await user.getIdToken();
    await fetch("/api/auth/session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    });

    const redirectPath = await getRedirectPath(user, firestore);
    window.location.assign(redirectPath);
}


export default function LoginClientPage() {
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!auth || !firestore) {
      setError("Authentication service is not available.");
      return;
    }

    const email = (event.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    const password = (event.currentTarget.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await handleSuccessfulLogin(userCredential.user, firestore);
    } catch (e: any) {
      let errorMessage = "An unknown error occurred.";
      if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') {
        errorMessage = "Invalid email or password. Please try again.";
      } else {
        errorMessage = e.message;
      }
      setError(errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    if (!auth || !firestore) {
      setError("Authentication service is not available.");
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      await handleSuccessfulLogin(userCredential.user, firestore);
    } catch (e: any) {
       setError(e.message);
    }
  };


  return (
    <div className="dark flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md border-border/50 shadow-2xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Award className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your Rewardify account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
             {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@example.com" defaultValue="testadmin@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full font-bold" type="submit">
              Sign In
            </Button>
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
             <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} type="button">
              Google
            </Button>
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
