/**
 * Hook for getting the authenticated user on the client side.
 *
 * Usage:
 *   const { user, loading, error } = useUser();
 *
 * Re-exports the Supabase session user with proper typing.
 */
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface UseUserResult {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export function useUser(): UseUserResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function fetchUser() {
      try {
        const {
          data: { user: sessionUser },
          error: sessionError,
        } = await supabase.auth.getUser();

        if (sessionError) throw sessionError;
        setUser(sessionUser);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch user"),
        );
      } finally {
        setLoading(false);
      }
    }

    fetchUser();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading, error };
}