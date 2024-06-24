import { FontAwesome } from "@expo/vector-icons";
import { router, Link } from "expo-router";
import { Formik } from "formik";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import * as Yup from "yup";

import { Button } from "@/components/elements/button";
import { TextInput } from "@/components/elements/input";
import { AuthRequestResetPasswordRequestPayload } from "@/types/auth";

const ResetPassword = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Password is required")
      .email("Invalid email address")
  });

  const initialValues: AuthRequestResetPasswordRequestPayload = {
    email: ""
  };

  const handleSubmit = (data: AuthRequestResetPasswordRequestPayload) => {
    console.log(data);
    router.push("/(auth)/reset-password-verification-code");
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

              <Button
                disabled={!isValid}
                title='Submit'
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
        </View>
      </View>
    </ScrollView>
  );
};

export default ResetPassword;
