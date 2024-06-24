import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { logout_user } from "@/api/auth";
import PRIVATE_API from "@/api/axios";
import UserIcon from "@/assets/images/user.png";
import { Button } from "@/components/elements/button";
import { TextInput } from "@/components/elements/input";
import { usePosts } from "@/provider/PostsProvider";
import { removeTokensRedux } from "@/redux/slices/tokensSlice";
import { removeUserRedux } from "@/redux/slices/userSlice";
import { RootState } from "@/types/redux";

type CreatePostPayload = {
  title: string;
  body: string;
  userId: string;
};

export default function ProfileScreen() {
  const { userData } = useSelector((state: RootState) => state.user);
  const { tokensData } = useSelector((state: RootState) => state.tokens);
  const [isLoading, setIsLoading] = React.useState(false);
  const { posts, setPosts } = usePosts();
  const toast = useToast();
  const dispath = useDispatch();

  const initialValues = {
    title: "",
    description: ""
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required")
  });

  const handleSubmit = async (
    payload: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          body: payload.description,
          title: payload.title,
          userId: userData.id
        } as CreatePostPayload
      );
      resetForm();
      setPosts([
        { ...response.data, id: Math.floor(Math.random() * 1000000 + 1) },
        ...posts
      ]);
      toast.show("Post created successfully", {
        type: "success",
        duration: 1000
      });
    } catch (error) {
      toast.show("Failed to create post", { type: "danger", duration: 1000 });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout_user({ refreshToken: tokensData.refreshToken });
    } catch (error) {
      console.log(error);
    } finally {
      dispath(removeUserRedux());
      dispath(removeTokensRedux());
      toast.show("Logged out successfully", {
        type: "success",
        duration: 1000
      });
      router.push("/(auth)/login");
    }
  };

  return (
    <ScrollView className='flex gap-2 p-3'>
      <View>
        <Text className='text-3xl font-bold text-gray-900 dark:text-white'>
          Profile
        </Text>
      </View>
      <View className='w-full mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden '>
        <View className='border-b border-b-third px-4 pb-6'>
          <View className='text-center my-4'>
            <Image
              className='h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4'
              source={UserIcon}
            />
            <View className='py-2 flex items-center justify-center'>
              <Text className='font-bold text-2xl text-gray-800 dark:text-white mb-1'>
                {userData.firstName} {userData.lastName}
              </Text>
              <Text className='text-lg text-fifth mb-1 '>{userData.email}</Text>
              <View className='inline-flex text-gray-700 dark:text-gray-300 items-center'>
                <MaterialIcons name='location-on' size={28} />
                <Text>Kigali, Rwanda</Text>
              </View>
            </View>
            <View className='flex flex-row justify-center'>
              <TouchableOpacity onPress={handleLogout}>
                <Text className='text-red-500 pt-3 text-base'>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text className='text-2xl font-bold text-gray-900 dark:text-white'>
          Create Post
        </Text>
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
            <View className='flex'>
              <TextInput
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
                error={touched.title ? errors.title : ""}
                placeholder='Title'
                icon={<MaterialIcons name='title' size={18} color='#b1b6c8' />}
              />

              <TextInput
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                error={touched.description ? errors.description : ""}
                placeholder='Description'
                icon={
                  <MaterialIcons name='description' size={18} color='#b1b6c8' />
                }
              />

              <Button
                title='Post'
                onPress={() => handleSubmit()}
                disabled={!isValid}
                isLoading={isLoading}
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
