import { router, Link } from "expo-router";
import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";

import Success from "@/assets/images/success.png";
import { Button } from "@/components/elements/button";

const ResetPassword = () => {
  const handleSubmit = () => {
    router.push("/(auth)/login");
  };

  return (
    <ScrollView
      contentContainerStyle={{
        height: "100%",
        marginTop: 160
      }}
    >
      <View className='h-full bg-white w-full rounded-t-[25px] flex items-center px-5 py-6'>
        <TouchableOpacity
          onPress={() => {
            router.push("/");
          }}
        >
          <Text className='text-4xl font-bold'>
            Post
            <Text className='text-primary-500'>Share</Text>
          </Text>
        </TouchableOpacity>
        <View className='flex flex-col items-center gap-2 py-5'>
          <Text className='font-bold text-secondary text-lg'>
            Reset Password Success
          </Text>

          <Image source={Success} style={{ width: 150, height: 150 }} />
        </View>

        <Button title='Done' onPress={() => handleSubmit()} />
        <View className='flex flex-col items-center pt-5 gap-4'>
          <Text className='text-third mt-2'>
            Don't have an account?{" "}
            <Link href='/(auth)/signup' className='text-primary-500 font-bold'>
              Register
            </Link>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResetPassword;
