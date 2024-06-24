import { Stack } from "expo-router";

import AppProvider from "@/provider/AppProvider";

const RootLayout = () => {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='(auth)'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='(tabs)'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='post/[id]'
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </AppProvider>
  );
};

export default RootLayout;
