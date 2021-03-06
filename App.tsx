import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PlayerWidget from "./components/PlayerWidget";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { AppContext } from "./AppContext";
import Amplify from "aws-amplify";
import config from "./src/aws-exports";
Amplify.configure(config);

export default function App() {
  const [songId, setSongId] = useState<string | null>(null);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AppContext.Provider
          value={{
            songId,
            setSongId: (id: string) => setSongId(id),
          }}
        >
          <Navigation colorScheme={colorScheme} />
          <PlayerWidget />
          <StatusBar />
        </AppContext.Provider>
      </SafeAreaProvider>
    );
  }
}
