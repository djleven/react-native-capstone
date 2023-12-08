import * as React from "react";
import { Alert, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserInfoStorage } from './storage';
import SplashScreen from "./screens/Splash";
import RootNavigator from "./RootNavigator";

export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);
  const [userData, setUserData] = React.useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const value = await (new UserInfoStorage()).getData();
        console.log(value, 'isRegisteredisRsdsdsdsdegistered')
        setUserData(value)

      } catch (e) {
        Alert.alert(e.message ?? e);
      } finally {
    
        setAppIsReady(true)
      }
    }
    getData();
  }, []);

  if (!appIsReady) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <RootNavigator userData={userData}/>
    </NavigationContainer>
  );
}
