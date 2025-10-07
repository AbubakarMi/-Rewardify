import RegisterClientPage from './client-page';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export default function RegisterPage() {
  return (
    <FirebaseClientProvider>
      <RegisterClientPage />
    </FirebaseClientProvider>
  );
}
