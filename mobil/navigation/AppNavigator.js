import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

export default function AppNavigator() {
  const { token } = useContext(AuthContext);

  return token ? <MainStack /> : <AuthStack />;
}