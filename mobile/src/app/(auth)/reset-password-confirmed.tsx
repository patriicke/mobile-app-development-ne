import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import * as Yup from "yup";

import { reset_password } from "@/api/auth";
import { Button } from "@/components/elements/button";
import { TextInput } from "@/components/elements/input";

export type ResetPasswordPayload = {
  password: string;
  confirm_password: string;
};

const ResetPasswordConfirmed = () => {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Short password"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required")
  });

  const initialValues: ResetPasswordPayload = {
    password: "",
    confirm_password: ""
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (payload: ResetPasswordPayload) => {
    try {
      setError("");
      setIsLoading(true);
      const resetToken = await AsyncStorage.getItem("reset_token");
      if (!resetToken) {
        router.push("/(auth)/reset-password");
        return;
      }
      await reset_password({
        newPassword: payload.password,
        resetToken
      });
      await AsyncStorage.removeItem("reset_token");
      await AsyncStorage.setItem("reset_success", "true");
      router.push("/(auth)/reset-password-success");
    } catch (error: any) {
      setError(error.response.message);
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
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                error={touched.password ? errors.password : ""}
                placeholder='Password'
                icon={<FontAwesome name='user-o' size={18} color='#b1b6c8' />}
                isSecret={true}
              />

              <TextInput
                onChangeText={handleChange("confirm_password")}
                onBlur={handleBlur("confirm_password")}
                value={values.confirm_password}
                error={touched.confirm_password ? errors.confirm_password : ""}
                placeholder='Confirm Password'
                icon={<FontAwesome name='user-o' size={18} color='#b1b6c8' />}
                isSecret={true}
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

export default ResetPasswordConfirmed;
