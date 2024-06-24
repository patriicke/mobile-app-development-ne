import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Link } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import * as Yup from "yup";

import { request_reset_password } from "@/api/auth";
import { Button } from "@/components/elements/button";
import { TextInput } from "@/components/elements/input";
import { CustomError } from "@/libs";
import { AuthRequestResetPasswordRequestPayload } from "@/types/auth";

const ResetPassword = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address")
  });

  const initialValues: AuthRequestResetPasswordRequestPayload = {
    email: ""
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    payload: AuthRequestResetPasswordRequestPayload
  ) => {
    try {
      setError("");
      setIsLoading(true);
      await request_reset_password(payload);
      await AsyncStorage.setItem("resetting_email", payload.email);
      router.push("/(auth)/reset-password-verification-code");
    } catch (error: any) {
      if (error instanceof CustomError) setError(error.message);
    } finally {
      setIsLoading(false);
    }
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
            Reset Password
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
            values,
            errors,
            touched,
            isValid
          }) => (
            <>
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                error={touched.email ? errors.email : ""}
                placeholder='Email'
                icon={<FontAwesome name='user-o' size={18} color='#b1b6c8' />}
              />

              <View className='w-full py-2'>
                <Text className='text-red-500'>{error}</Text>
              </View>

              <Button
                disabled={!isValid}
                title='Submit'
                onPress={() => handleSubmit()}
                isLoading={isLoading}
              />
            </>
          )}
        </Formik>
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
