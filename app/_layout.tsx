import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
        presentation:"card",
        headerStyle:{
          backgroundColor:"purple"
        
        },
        headerTitleStyle:{
          color:"white"
        }
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Todo-App",
        }}
      />
    </Stack>
  );
}
