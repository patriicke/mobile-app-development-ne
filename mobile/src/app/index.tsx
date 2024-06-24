import { Redirect, router } from "expo-router";
import { ImageBackground, Text, View } from "react-native";
import { useSelector } from "react-redux";

import client from "@/assets/images/client.jpg";
import { Button } from "@/components/elements/button";
import { RootState } from "@/types/redux";

const App = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const { tokensData } = useSelector((state: RootState) => state.tokens);

  if (userData.id && tokensData.accessToken)
    return <Redirect href='/(tabs)/home' />;

  return (
    <View className='h-full w-full'>
      <ImageBackground source={client} className='h-full w-full'>
        <View
          className='h-full w-full'
          style={{
            backgroundColor: "rgba(0,0,0,.4)"
          }}
        />
        <View className='w-full px-6 items-center justify-center'>
          <View className='flex-col items-center justify-around absolute w-full h-[270px] bg-white bottom-8 rounded-md px-6 py-5'>
            <Text className='text-secondary text-xl font-bold'>
              Connect with your Friends
            </Text>
            <Text className='text-center text-gray-600 leading-5 text-[12px]'>
              Share your thoughts with your friends and family. Stay connected
            </Text>
            <Button
              title='Continue'
              onPress={() => router.push("/(auth)/login")}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default App;
