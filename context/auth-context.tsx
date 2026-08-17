"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { insforge } from "@/lib/insforge";

export interface UserProfile {
  id: string;
  email: string | null;
  name: string | null;
  avatar_url: string | null;
  provider: string | null;
  preferred_city: string | null;
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signInWithGoogle: (redirectTo?: string) => Promise<void>;
  signInWithLine: (redirectTo?: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: any | null }>;
  signUpWithEmail: (
    email: string,
    password: string,
    name: string,
    preferredCity?: string
  ) => Promise<{ data: any | null; error: any | null; requireVerification?: boolean }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch or create public.users profile
  const fetchProfile = async (userId: string, authUser?: any) => {
    try {
      const { data, error } = await insforge.database
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (data && !error) {
        setProfile(data as UserProfile);
      } else if (authUser) {
        // Fallback profile
        const fallbackProfile: UserProfile = {
          id: userId,
          email: authUser.email || null,
          name: authUser.profile?.name || authUser.email?.split("@")[0] || "지하탐험가",
          avatar_url: authUser.profile?.avatar_url || null,
          provider: authUser.providers?.[0] || "email",
          preferred_city: "tokyo",
        };
        setProfile(fallbackProfile);
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  useEffect(() => {
    // Initial user fetch
    const initAuth = async () => {
      try {
        const { data } = await insforge.auth.getCurrentUser();
        if (data?.user) {
          setUser(data.user);
          await fetchProfile(data.user.id, data.user);
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (err) {
        console.error("Auth init error:", err);
        setUser(null);
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Subscribe to auth state changes
    const unsubscribe = insforge.auth.onAuthStateChange(async (event) => {
      if (event === "signedIn" || event === "tokenRefreshed") {
        try {
          const { data } = await insforge.auth.getCurrentUser();
          if (data?.user) {
            setUser(data.user);
            await fetchProfile(data.user.id, data.user);
          }
        } catch (e) {
          console.error("Error loading user on auth change:", e);
        }
      } else if (event === "signedOut") {
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  // Google OAuth Login
  const signInWithGoogle = async (customRedirect?: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const redirectTo = customRedirect || `${origin}/auth/callback`;

    await insforge.auth.signInWithOAuth("google", {
      redirectTo,
      additionalParams: { prompt: "select_account" },
    });
  };

  // LINE OAuth Login
  const signInWithLine = async (customRedirect?: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const redirectTo = customRedirect || `${origin}/auth/callback`;

    await insforge.auth.signInWithOAuth("line", {
      redirectTo,
    });
  };

  // Email/Password Login
  const signInWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await insforge.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      if (data?.user) {
        setUser(data.user);
        await fetchProfile(data.user.id, data.user);
      }

      return { error: null };
    } catch (err: any) {
      return { error: err };
    } finally {
      setIsLoading(false);
    }
  };

  // Email/Password Signup
  const signUpWithEmail = async (
    email: string,
    password: string,
    name: string,
    preferredCity: string = "tokyo"
  ) => {
    setIsLoading(true);
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const { data, error } = await insforge.auth.signUp({
        email,
        password,
        name,
        redirectTo: `${origin}/login?verified=true`,
      });

      if (error) {
        return { data: null, error };
      }

      if (data?.user) {
        setUser(data.user);
        // Save initial preferences in public.users
        try {
          await insforge.database.from("users").upsert([
            {
              id: data.user.id,
              email,
              name,
              provider: "email",
              preferred_city: preferredCity,
            },
          ]);
        } catch (dbErr) {
          console.warn("Could not insert custom city preference immediately:", dbErr);
        }
        await fetchProfile(data.user.id, data.user);
      }

      return {
        data,
        error: null,
        requireVerification: data?.requireEmailVerification || false,
      };
    } catch (err: any) {
      return { data: null, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await insforge.auth.signOut();
      setUser(null);
      setProfile(null);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id, user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        signInWithGoogle,
        signInWithLine,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
