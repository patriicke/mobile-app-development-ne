import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  TextInput as DefaultTextInput,
  Text,
  TextInputProps as DefaultTextInputProps,
  View,
  TouchableOpacity
} from "react-native";

import { useThemeColor } from "@/hooks";

type TextInputProps = DefaultTextInputProps & {
  type?: string;
  error?: string;
  icon?: React.ReactNode;
  isSecret?: boolean;
};

export const TextInput: React.FC<TextInputProps> = (props) => {
  const {
    inputMode = "text",
    className = "",
    placeholder = "",
    error = "",
    isSecret = false,
    icon
  } = props;
  const backgroundColor = useThemeColor("background");
  const textColor = useThemeColor("text");
  const [hidePassword, setHidePassword] = useState(true);

  const handleToggleHidePassword = () => {
    setHidePassword((prev) => !prev);
  };

  return (
    <View className='flex my-2'>
      <View
        className={`flex flex-row items-center justify-between h-[50px] border w-full rounded-md border-third overflow-hidden px-4 ${className}`}
        style={{
          backgroundColor
        }}
      >
        {icon}
        <DefaultTextInput
          onChangeText={() => {}}
          inputMode={inputMode}
          placeholder={placeholder}
          className='flex-1 px-3 items-center h-full'
          style={{
            color: textColor
          }}
          autoCapitalize='none'
          {...props}
          secureTextEntry={isSecret && hidePassword}
        />
        {isSecret && (
          <TouchableOpacity onPress={handleToggleHidePassword}>
            {hidePassword ? (
              <MaterialIcons name='visibility-off' size={18} color='#b1b6c8' />
            ) : (
              <MaterialIcons name='visibility' size={18} color='#b1b6c8' />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className='text-red-500 text-xs pl-3'>{error}</Text>}
    </View>
  );
};
