import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SplashScreen, Stack } from "expo-router";
import { ImageBackground } from "react-native";
import { styled } from "nativewind";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import * as SessionStore from "expo-secure-store";

import bgBlur from "../src/assets/bg-blur.png";
import Stripes from "../src/assets/stripes.svg";

const StyledStripes = styled(Stripes);

export default function Layout() {
  const [isUserAutheticated, setIsUserAuthenticated] = useState<null | boolean>(
    null
  );

  const [hasLoadedFonts] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
    BaiJamjuree_700Bold,
  });

  useEffect(() => {
    SessionStore.getItemAsync("token").then((token) => {
      setIsUserAuthenticated(!!token);
    });
  }, []);

  if (!hasLoadedFonts) {
    return <SplashScreen />;
  }

  return (
    <ImageBackground
      source={bgBlur}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: "absolute", left: "-100%" }}
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "trasparent" },
          animation: "fade",
        }}
      >
        <Stack.Screen name="index" redirect={isUserAutheticated} />
        <Stack.Screen name="new" />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  );
}
