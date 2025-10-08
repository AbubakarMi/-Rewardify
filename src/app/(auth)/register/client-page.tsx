
"use client";

import { useState } from "react";
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
import { initializeFirebase } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, writeBatch, serverTimestamp } from "firebase/firestore";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { addDays } from "date-fns";

const { auth, firestore } = initializeFirebase();

async function handleSuccessfulLogin(user: any) {
  const token = await user.getIdToken();
  await fetch('/api/auth/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
  window.location.assign('/admin/dashboard');
}

export default function RegisterClientPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const companyName = (event.currentTarget.elements.namedItem("companyName") as HTMLInputElement).value;
    const adminName = (event.currentTarget.elements.namedItem("adminName") as HTMLInputElement).value;
    const email = (event.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    const password = (event.currentTarget.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: adminName });
      
      const batch = writeBatch(firestore);

      // Create company document
      const companyRef = doc(firestore, "companies", user.uid); // Use user UID as company ID for simplicity
      const trialEnds = addDays(new Date(), 3);
      batch.set(companyRef, {
        name: companyName,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
        trialEnds: trialEnds.toISOString(),
      });

      // Create user profile in Firestore
      const userProfileRef = doc(firestore, "users", user.uid);
      batch.set(userProfileRef, {
        name: adminName,
        email: email,
        role: 'admin',
        companyId: companyRef.id,
        avatarUrl: `https://avatar.vercel.sh/${email}.png`,
        points: 0,
      });

      await batch.commit();
      
      await handleSuccessfulLogin(user);

    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        setError("An account with this email already exists.");
      } else if (e.code === 'auth/weak-password') {
        setError("The password is too weak. Please use at least 6 characters.");
      } else {
        console.error(e);
        setError(e.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Award className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">Start Your 3-Day Free Trial</CardTitle>
          <CardDescription>Create your company account to begin.</CardDescription>
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
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" type="text" placeholder="Acme Inc." required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="adminName">Your Full Name</Label>
              <Input id="adminName" type="text" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input id="email" type="email" placeholder="john.doe@acme.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full font-bold" type="submit">
              Create Account
            </Button>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
