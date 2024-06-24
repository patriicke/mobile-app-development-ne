import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { register_user } from "@/api/auth";
import { Button } from "@/components/elements/button";
import { TextInput } from "@/components/elements/input";
import { addTokensRedux } from "@/redux/slices/tokensSlice";
import { adduserRedux } from "@/redux/slices/userSlice";
import { AuthRegisterRequestPayload } from "@/types/auth";

const SignupScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required")
  });
  const toast = useToast();

  const initialValues: AuthRegisterRequestPayload & {
    confirm_password: string;
  } = {
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirm_password: ""
  };

  const handleSubmit = async (
    payload: AuthRegisterRequestPayload & { confirm_password: string }
  ) => {
    try {
      setError("");
      setIsLoading(true);
      const data = await register_user({
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: payload.password,
        username: payload.username
      });
      const { tokens, user } = data.payload;
      dispatch(adduserRedux(user));
      dispatch(addTokensRedux(tokens));
      router.push("/(tabs)/home");
      toast.show("Registerd Successful", {
        type: "success",
        duration: 2000
      });
    } catch (error: any) {
      setError(error.response.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className='flex gap-2 p-3 mt-[160px]'>
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
            Create Account
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
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                error={touched.firstName ? errors.firstName : ""}
                placeholder='First Name'
                icon={<FontAwesome name='user-o' size={18} color='#b1b6c8' />}
              />

              <TextInput
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                error={touched.lastName ? errors.lastName : ""}
                placeholder='Last Name'
                icon={<FontAwesome name='user-o' size={18} color='#b1b6c8' />}
              />

              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                error={touched.email ? errors.email : ""}
                placeholder='Email'
                icon={
                  <MaterialCommunityIcons
                    name='email-outline'
                    size={18}
                    color='#b1b6c8'
                  />
                }
              />

              <TextInput
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                error={touched.username ? errors.username : ""}
                placeholder='Username'
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

              <TextInput
                onChangeText={handleChange("confirm_password")}
                onBlur={handleBlur("confirm_password")}
                value={values.confirm_password}
                error={touched.confirm_password ? errors.confirm_password : ""}
                placeholder='ConfirmPassword'
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
                disabled={!isValid}
                title='Sign Up'
                onPress={() => handleSubmit()}
                isLoading={isLoading}
              />
            </>
          )}
        </Formik>

        <View className='flex flex-col items-center pt-5'>
          <Text className='text-third mt-2'>
            Already have an account?{" "}
            <Link href='/(auth)/login' className='text-primary-500 font-bold'>
              Log In
            </Link>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
