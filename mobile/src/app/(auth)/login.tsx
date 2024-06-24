import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { router, Link } from "expo-router";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { login_user } from "@/api/auth";
import { Button } from "@/components/elements/button";
import { TextInput } from "@/components/elements/input";
import { CustomError } from "@/libs";
import { addTokensRedux } from "@/redux/slices/tokensSlice";
import { adduserRedux } from "@/redux/slices/userSlice";
import { AuthLoginRequestPayload } from "@/types/auth";

const Login = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Email or Username is required"),
    password: Yup.string().required("Password is required")
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();

  const initialValues: AuthLoginRequestPayload = {
    username: "",
    password: ""
  };

  const handleSubmit = async (payload: AuthLoginRequestPayload) => {
    try {
      setError("");
      setIsLoading(true);
      const data = await login_user(payload);
      const { tokens, user } = data.payload;
      dispatch(adduserRedux(user));
      dispatch(addTokensRedux(tokens));
      router.push("/(tabs)/home");
      toast.show("Login Successful", {
        type: "success",
        duration: 1000
      });
    } catch (error: any) {
      if (error instanceof CustomError) setError(error.response.message);
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
            <Text className='text-fifth'>Share</Text>
          </Text>
        </TouchableOpacity>
        <View className='flex flex-col items-center gap-2 py-5'>
          <Text className='font-bold text-secondary text-lg'>
            Sign In to Continue
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
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                error={touched.username ? errors.username : ""}
                placeholder='First Name'
                icon={<FontAwesome name='user-o' size={18} color='#b1b6c8' />}
              />

              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                error={touched.password ? errors.password : ""}
                placeholder='Password'
                isSecret={true}
                icon={
                  <MaterialIcons
                    name='lock-outline'
                    size={18}
                    color='#b1b6c8'
                  />
                }
              />

              <View className='w-full py-2'>
                <Text className='text-red-500'>{error}</Text>
              </View>

              <Button
                isLoading={isLoading}
                disabled={!isValid}
                title='Sign In'
                onPress={() => handleSubmit()}
              />
            </>
          )}
        </Formik>
        <View className='flex flex-col items-center pt-5 gap-4'>
          <Text className='text-third mt-2'>
            Don't have an account?{" "}
            <Link href='/(auth)/signup' className='text-fifth font-bold'>
              Register
            </Link>
          </Text>
          <Text className='text-third mt-2'>
            Forgot Password?{" "}
            <Link
              href='/(auth)/reset-password'
              className='text-fifth font-bold'
            >
              Reset
            </Link>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
