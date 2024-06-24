import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

import Loader from "../loader/Loader";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
};

export const Button = (props: ButtonProps) => {
  const { title, isLoading, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      className='bg-primary-500 rounded-md w-full justify-center items-center min-h-[50px]'
      {...props}
    >
      <Text className='text-white font-bold'>
        {isLoading ? <Loader /> : title}
      </Text>
    </TouchableOpacity>
  );
};
