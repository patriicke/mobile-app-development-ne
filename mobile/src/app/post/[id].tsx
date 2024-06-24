import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useToast } from "react-native-toast-notifications";

import Loader from "@/components/elements/loader/Loader";
import Comment from "@/components/ui/Comment";
import { usePosts } from "@/provider/PostsProvider";
import { CommentType } from "@/types/comment";

export default function PostScreen() {
  const { id } = useLocalSearchParams();
  const [comments, setComments] = useState<CommentType[]>();
  const { posts, setPosts } = usePosts();
  const post = posts.find((post) => post.id === Number(id));
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const handleDeletePost = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const updatedPosts = posts.filter((post) => post.id !== Number(id));
      setPosts(updatedPosts);
      toast.show("Post deleted successfully", {
        type: "success",
        duration: 2000
      });
      router.back();
    } catch (error) {
      console.log(error);
      toast.show("Failed to delete post", {
        type: "error",
        duration: 2000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className='flex gap-2 p-3'>
      <View className='flex flex-row items-center gap-2'>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name='arrow-back' size={28} color='#3658f9' />
        </TouchableOpacity>
        <Text className='text-xl font-bold'>Post</Text>
      </View>

      <View className='flex space-y-2 w-full'>
        <View className='block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
          <View className='flex flex-row items-center justify-between'>
            <Text className='w-[90%] mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {post?.title}
            </Text>
            {isLoading ? (
              <Loader />
            ) : (
              <MaterialIcons
                name='delete'
                size={24}
                color='#3658f9'
                onPress={handleDeletePost}
              />
            )}
          </View>
          <Text className='font-normal text-gray-700 dark:text-gray-400'>
            {post?.body}
          </Text>
        </View>

        <View className='py-2'>
          <Text className='text-xl font-bold'>Comments</Text>
          {comments?.length === 0 && <Text>No comments yet!</Text>}
          {comments?.map((comment, idx) => (
            <Comment key={idx} comment={comment} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
