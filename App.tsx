import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { supabase } from './src/lib/supabase';
import { initRevenueCat, identifyUser, resetUser } from './src/lib/revenuecat';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import { Session } from '@supabase/supabase-js';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [entitlement, setEntitlement] = useState<string>('go');
  const [rcReady, setRcReady] = useState(false);

  useEffect(() => {
    // Initialize RevenueCat on app start
    initRevenueCat()
      .then(() => setRcReady(true))
      .catch((err) => {
        console.warn('[App] RevenueCat init failed, proceeding without:', err);
        setRcReady(true);
      });

    // Get current Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        identifyUser(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session?.user) {
          await identifyUser(session.user.id);
        } else {
          await resetUser();
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {session && session.user ? (
        <HomeScreen
          session={session}
          rcReady={rcReady}
          onEntitlementChange={setEntitlement}
        />
      ) : (
        <AuthScreen />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});