"use client";

import { useState } from "react";
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
// import { useAuth, useFirestore } from "@/firebase";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
import { Alert, AlertDescription } from "@/components/ui/alert";

// async function handleSuccessfulLogin(user: any) {
//   const token = await user.getIdToken();
//   await fetch('/api/auth/session', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ token }),
//   });
//   window.location.assign('/employee/dashboard');
// }

export default function RegisterClientPage() {
  const router = useRouter();
  // const auth = useAuth();
  // const firestore = useFirestore();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("Registration is temporarily disabled.");
    // setError(null);

    // if (!auth || !firestore) {
    //   setError("Authentication service is not available.");
    //   return;
    // }

    // const name = (event.currentTarget.elements.namedItem("name") as HTMLInputElement).value;
    // const email = (event.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    // const password = (event.currentTarget.elements.namedItem("password") as HTMLInputElement).value;

    // try {
    //   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //   const user = userCredential.user;

    //   // Update user profile in Firebase Auth
    //   await updateProfile(user, { displayName: name });
      
    //   // Create user profile in Firestore
    //   const userProfile = {
    //     name: name,
    //     email: email,
    //     role: 'employee',
    //     avatarUrl: `https://avatar.vercel.sh/${email}.png`,
    //     points: 0,
    //   };

    //   await setDoc(doc(firestore, "users", user.uid), userProfile);
      
    //   // Set role as custom claim
    //   // This part needs to be done on the backend, for now we will set the session and redirect
      
    //   await handleSuccessfulLogin(user);

    // } catch (e: any) {
    //   setError(e.message);
    // }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Award className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">Create an Account</CardTitle>
          <CardDescription>Join Rewardify and start recognizing excellence.</CardDescription>
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
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full font-bold" type="submit">
              Sign Up
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
