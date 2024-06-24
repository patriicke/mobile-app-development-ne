import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
  LogBox
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { PostsProvider } from "./PostsProvider";

import { useThemeColor } from "@/hooks";
import { persistor, store } from "@/redux/store";

type AppProviderProps = {
  children: React.ReactNode;
};

export default function AppProvider(props: AppProviderProps) {
  const { children } = props;
  const colorScheme = useColorScheme();
  const color = useThemeColor("background");

  useEffect(() => {
    LogBox.ignoreLogs(["API request error"]);
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ToastProvider>
              <PostsProvider>
                <SafeAreaView
                  className='h-full w-full'
                  style={{ backgroundColor: color }}
                >
                  {children}
                </SafeAreaView>
              </PostsProvider>
            </ToastProvider>
          </PersistGate>
        </Provider>
      </TouchableWithoutFeedback>
    </ThemeProvider>
  );
}
