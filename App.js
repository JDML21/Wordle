import React from "react";
import { StyleSheet, View } from "react-native";
import { GameProvider } from "./src/context/GameContext";
import AppNav from "./src/navigation/Navigation";

export default function App() {
  return (
    <GameProvider>
      <View style={styles.container}>
        <AppNav/>
      </View>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
});
