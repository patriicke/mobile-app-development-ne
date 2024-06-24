import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import * as Yup from "yup";

import { verify_reset_password } from "@/api/auth";
import { Button } from "@/components/elements/button";
import { TextInput } from "@/components/elements/input";
import { CustomError } from "@/libs";
import { AuthVerifyResetPasswordRequestPayload } from "@/types/auth";

const ResetPasswordVerificationCode = () => {
  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .required("OTP is required")
      .min(6, "OTP too short")
      .max(6, "OTP too long")
  });

  const initialValues: AuthVerifyResetPasswordRequestPayload = {
    otp: 0,
    email: ""
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    payload: AuthVerifyResetPasswordRequestPayload
  ) => {
    try {
      const email = await AsyncStorage.getItem("resetting_email");
      if (!email) {
        router.push("/(auth)/reset-password");
        return;
      }
      setIsLoading(true);
      setError("");
      const data = await verify_reset_password({
        email,
        otp: Number(payload.otp)
      });
      await AsyncStorage.removeItem("resetting_email");
      await AsyncStorage.setItem("reset_token", data.payload.resetToken);
      router.push("/(auth)/reset-password-confirmed");
    } catch (error: any) {
      console.log(error);
      if (error instanceof CustomError) setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfEmailExists = async () => {
    const email = await AsyncStorage.getItem("resetting_email");
    if (!email) {
      router.push("/(auth)/reset-password");
    }
  };

  useEffect(() => {
    checkIfEmailExists();
  }, []);

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
            OTP Verification
          </Text>
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
            isValid
          }) => (
            <>
              <TextInput
                onChangeText={handleChange("otp")}
                onBlur={handleBlur("otp")}
                error={touched.otp ? errors.otp : ""}
                placeholder='OTP'
                inputMode='numeric'
                icon={<FontAwesome name='user-o' size={18} color='#b1b6c8' />}
              />

              {error && (
                <View className='w-full py-2'>
                  <Text className='text-red-500'>{error}</Text>
                </View>
              )}

              <Button
                disabled={!isValid}
                title='Submit'
                onPress={() => handleSubmit()}
                isLoading={isLoading}
              />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default ResetPasswordVerificationCode;
