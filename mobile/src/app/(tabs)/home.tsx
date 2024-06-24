import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, ScrollView, TouchableOpacity } from "react-native";

import { View } from "@/components/elements/view";
import { usePosts } from "@/provider/PostsProvider";

export default function HomeSceen() {
  const { posts, setPosts } = usePosts();
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.data;
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = (postId: number) => {};

  return (
    <ScrollView className='flex gap-2 p-3'>
      <View>
        <Text className='text-3xl font-bold text-gray-900 dark:text-white'>
          Home
        </Text>
      </View>

      {isLoading ? (
        <Text className='py-2'>Loading...</Text>
      ) : (
        posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            onPress={() => router.push(`/post/${post.id}`)}
            className='block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 hover:group-[]:'
          >
            <Text className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {post.title}
            </Text>
            <Text className='font-normal text-gray-700 dark:text-gray-400'>
              {post.body}
            </Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}
