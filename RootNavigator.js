import { useEffect, useState } from "react";
import { Image, Pressable, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserInfoStorage } from './storage';
import { useUpdateEffect } from './storage/utils.js'

import HomeScreen from "./screens/Home";
import SplashScreen from "./screens/Splash";
import OnBoardingScreen from "./screens/Onboarding";
import ProfileScreen from "./screens/Profile";
import Avatar from "./components/Avatar.js";

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
      if(data) {
        Alert.alert('Your info has been saved!')
      }
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
      initialRouteName="Home"
      screenOptions={{ headerTitleAlign: 'center'}
    }>
      {isRegistered ? (
        <>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerTitle: (props) => ( // App Logo
          <Image
            style={{ width: 150, height: 80 }}
            source={require('./assets/logo.png')}
            resizeMode="contain"
            accessible={true}
            accessibilityLabel={"Little Lemon logo"}
          />
          ),
          headerRight: (props) => ( // Avatar
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Avatar
              firstName={state?.firstName}
              lastName={state?.lastName}
              imageURI={state?.imageURI}
              accessibilityLabel={'User profile avatar'}
              isSmall={true}
            />
          </Pressable>
          )
        })}
      />
      <Stack.Screen
        name="Profile"
        options={({navigation}) => ({
          headerRight: (props) => ( // Avatar
          <Image
            style={{ width: 100, height: 40 }}
            source={require('./assets/logo.png')}
            resizeMode="contain"
            accessible={true}
            accessibilityLabel={"Little Lemon logo"}
          />
          )
        })}
      > 
        {(props) => <ProfileScreen {...props} data={state} setData={setData} />}
      </Stack.Screen>
      </>
      ) : (

      <Stack.Screen name="OnBoarding">
        {(props) => <OnBoardingScreen {...props} setData={setData} />}
      </Stack.Screen>
      )}
   
    </Stack.Navigator>
  );
};

export default RootNavigator;
