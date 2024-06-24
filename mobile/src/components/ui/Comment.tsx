import React from "react";
import { View, Text } from "react-native";

import { CommentType } from "@/types/comment";

type CommentProps = {
  comment: CommentType;
};

export default function Comment(props: CommentProps) {
  return (
    <View className='bg-white p-4 my-2 rounded-lg shadow-md'>
      <Text className='text-lg font-bold'>{props.comment.name}</Text>
      <Text className='text-primary-500 text-sm mb-2'>
        {props.comment.email}
      </Text>
      <Text className='text-gray-700'>{props.comment.body}</Text>
    </View>
  );
}
