import { FirebaseClientProvider } from "@/firebase/client-provider";
import LoginClientPage from "./client-page";

export default function LoginPage() {
  return (
    <FirebaseClientProvider>
      <LoginClientPage />
    </FirebaseClientProvider>
  );
}
