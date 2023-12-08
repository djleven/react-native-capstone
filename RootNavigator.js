import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardingScreen from "./screens/Onboarding";
// import WelcomeScreen from "../screens/WelcomeScreen";
import ProfileScreen from "./screens/Profile";

const Stack = createNativeStackNavigator();

const RootNavigator = ({userData}) => {

  const isRegistered = Boolean(userData?.firstname)
  console.log(isRegistered, 'isRegisteredisRegistered')
  return (
    <Stack.Navigator
      screenOptions={{ headerTitleAlign: 'center'}
    }>
      {isRegistered ? (
      <Stack.Screen name="Profile" component={ProfileScreen} /> 
      ) : (

      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      )}
   
    </Stack.Navigator>
  );
};

export default RootNavigator;
