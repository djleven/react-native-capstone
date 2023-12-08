import { Alert, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserInfoStorage } from './storage';
import { useUpdateEffect } from './storage/utils.js'

import SplashScreen from "./screens/Splash";
import OnBoardingScreen from "./screens/Onboarding";
import ProfileScreen from "./screens/Profile";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [state, dispatch] = useState(null);

  const setData = async (data) => {

    try {
      if(data === null) {
        const userData = await (new UserInfoStorage().removeData());
      } else {
        const userData = await (new UserInfoStorage({...data})).saveData();
      }
      dispatch(data);
    } catch (e){
      console.error(e)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const userData = await (new UserInfoStorage()).getData();
      await dispatch(userData);
    }

    fetchData()
    .catch(console.error)
    .finally(setAppIsReady(true))
  }, []);


  useUpdateEffect(() => {
    (async () => {
      try {
        let isRegistered = false
        if(state?.firstName) {
          isRegistered = true
        }
        setIsRegistered(isRegistered)
      } catch (e) {
        Alert.alert(e ?? 'And error occured');
      }
    })();
  }, [state]);

  if (!appIsReady) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerTitleAlign: 'center'}
    }>
      {isRegistered ? (
      <Stack.Screen name="Profile" > 
        {(props) => <ProfileScreen {...props} data={state} setData={setData} />}
      </Stack.Screen>
      ) : (

      <Stack.Screen name="OnBoarding">
        {(props) => <OnBoardingScreen {...props} setData={setData} />}
      </Stack.Screen>
      )}
   
    </Stack.Navigator>
  );
};

export default RootNavigator;
