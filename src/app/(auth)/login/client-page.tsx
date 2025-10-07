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
import { Alert, AlertDescription } from "@/components/ui/alert";
// import { useAuth, useFirestore } from "@/firebase";
// import {
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { getDoc, doc } from "firebase/firestore";

// async function getRedirectPath(user: any, firestore: any): Promise<string> {
//   const userDoc = await getDoc(doc(firestore, "users", user.uid));
//   if (userDoc.exists()) {
//     const userData = userDoc.data();
//     if (userData.role === 'admin') {
//       return "/admin/dashboard";
//     }
//   }
//   return "/employee/dashboard";
// }

// async function handleSuccessfulLogin(user: any, firestore: any) {
//     const token = await user.getIdToken();
//     const idTokenResult = await user.getIdTokenResult();
//     const redirectPath = await getRedirectPath(user, firestore);

//     await fetch("/api/auth/session", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token }),
//     });

//     // Redirect after session is set
//     window.location.assign(redirectPath);
// }


export default function LoginClientPage() {
  const router = useRouter();
  // const auth = useAuth();
  // const firestore = useFirestore();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("Login is temporarily disabled.");
    // setError(null);
    // if (!auth || !firestore) {
    //   setError("Authentication service is not available.");
    //   return;
    // }

    // const email = (event.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    // const password = (event.currentTarget.elements.namedItem("password") as HTMLInputElement).value;

    // try {
    //   const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //   await handleSuccessfulLogin(userCredential.user, firestore);
    // } catch (e: any) {
    //   setError(e.message);
    // }
  };

  const handleGoogleSignIn = async () => {
    setError("Login is temporarily disabled.");
    // setError(null);
    // if (!auth || !firestore) {
    //   setError("Authentication service is not available.");
    //   return;
    // }
    // const provider = new GoogleAuthProvider();
    // try {
    //   const userCredential = await signInWithPopup(auth, provider);
    //   await handleSuccessfulLogin(userCredential.user, firestore);
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
          <CardTitle className="font-headline text-3xl">Welcome to Rewardify</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
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
              <Input id="email" type="email" placeholder="m@example.com" defaultValue="testadmin@example.com" required />
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
