import React from "react";
import { ActivityIndicator } from "react-native";

type LoaderProps = {
  className?: string;
};

const Loader = (props: LoaderProps) => {
  return <ActivityIndicator size='small' color='#0000ff' />;
};

export default Loader;
