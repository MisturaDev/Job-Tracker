import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Then get the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (updates: { full_name?: string }) => {
    const { error } = await supabase.auth.updateUser({
      data: updates,
    });

    if (error) throw error;

    // Refresh the session to get updated user metadata
    const { data: { session: newSession } } = await supabase.auth.refreshSession();
    if (newSession) {
      setSession(newSession);
      setUser(newSession.user);
    }
  };

  return { user, session, loading, signOut, updateProfile };
};
