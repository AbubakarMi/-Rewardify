"use client";

import { onSnapshot, doc, type Firestore } from "firebase/firestore";
import { useEffect, useState, useMemo } from "react";
import { useFirestore } from "../provider";

export function useDoc<T>(path: string) {
  const firestore = useFirestore();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  const memoizedDocRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, path);
  }, [firestore, path]);

  useEffect(() => {
    if (!memoizedDocRef) return;

    const unsubscribe = onSnapshot(
      memoizedDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ id: snapshot.id, ...snapshot.data() } as T);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching document:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [memoizedDocRef]);

  return { data, loading };
}
