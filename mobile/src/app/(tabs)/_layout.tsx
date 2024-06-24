import {
  Ionicons,
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className='items-center justify-center gap-22'>
              <AntDesign
                name='home'
                size={25}
                color={focused ? "#3658f9" : "#484848"}
              />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className='items-center justify-center gap-22'>
              <MaterialIcons
                name='search'
                size={24}
                color={focused ? "#3658f9" : "#484848"}
              />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='notification'
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className='items-center justify-center gap-22'>
              <Ionicons
                name='notifications'
                size={24}
                color={focused ? "#3658f9" : "#484848"}
              />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className='items-center justify-center gap-22'>
              <AntDesign
                name='user'
                size={24}
                color={focused ? "#3658f9" : "#484848"}
              />
            </View>
          )
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
