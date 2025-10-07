"use client";

import {
  onSnapshot,
  query,
  collection,
  where,
  type Firestore,
  type DocumentData,
  type Query,
} from "firebase/firestore";
import { useEffect, useState, useMemo } from "react";
import { useFirestore } from "../provider";

export function useCollection<T>(path: string, field?: string, value?: string) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  const memoizedQuery = useMemo(() => {
    if (!firestore) return null;
    let q: Query<DocumentData>;
    if (field && value) {
      q = query(collection(firestore, path), where(field, "==", value));
    } else {
      q = query(collection(firestore, path));
    }
    return q;
  }, [firestore, path, field, value]);

  useEffect(() => {
    if (!memoizedQuery) return;

    const unsubscribe = onSnapshot(
      memoizedQuery,
      (snapshot) => {
        const docs = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() }) as T,
        );
        setData(docs);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching collection:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [memoizedQuery]);

  return { data, loading };
}
