import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function SearchScreen() {
  return (
    <ScrollView className='flex gap-2 p-3'>
      <View>
        <Text className='text-3xl font-bold text-gray-900 dark:text-white'>
          Search
        </Text>
      </View>
      <Text>No Search History yet!</Text>
    </ScrollView>
  );
}
