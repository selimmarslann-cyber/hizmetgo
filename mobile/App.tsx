import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppStateProvider } from "./src/store/AppStateContext";
import { RootNavigator, navigationRef } from "./src/navigation/RootNavigator";
import SplashScreen from "./src/screens/SplashScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldNavigateToReferral, setShouldNavigateToReferral] =
    useState(false);

  useEffect(() => {
    // İlk yükleme için minimum bekleme süresi
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && shouldNavigateToReferral && navigationRef.current) {
      setTimeout(() => {
        navigationRef.current?.navigate("ReferralScreen");
        setShouldNavigateToReferral(false);
      }, 300);
    }
  }, [isLoading, shouldNavigateToReferral]);

  const handleNavigateToReferral = () => {
    setShouldNavigateToReferral(true);
  };

  if (isLoading) {
    return (
      <SplashScreen
        onFinish={() => setIsLoading(false)}
        onNavigateToReferral={handleNavigateToReferral}
      />
    );
  }

  return (
    <AppStateProvider>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    </AppStateProvider>
  );
}
