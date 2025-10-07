"use client";

import {
  FirebaseProvider,
  initializeFirebase,
} from ".";

import { PropsWithChildren } from "react";

const { firebaseApp, firestore, auth } = initializeFirebase();

export function FirebaseClientProvider({ children }: PropsWithChildren) {
  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      firestore={firestore}
      auth={auth}
    >
      {children}
    </FirebaseProvider>
  );
}
