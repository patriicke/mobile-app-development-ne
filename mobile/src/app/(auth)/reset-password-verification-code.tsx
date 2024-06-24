import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Formik } from "formik";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import * as Yup from "yup";

import { Button } from "@/components/elements/button";
import { TextInput } from "@/components/elements/input";
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

  const handleSubmit = (data: AuthVerifyResetPasswordRequestPayload) => {
    console.log(data);
    router.push("/(auth)/reset-password-confirmed");
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

              <Button
                disabled={!isValid}
                title='Submit'
                onPress={() => handleSubmit()}
              />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default ResetPasswordVerificationCode;
