import * as React from 'react';
import { Alert, View, Text, TextInput, StyleSheet, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validateName = (name) => {
  return name.length && name.match(/^[a-zA-Z]+$/);
};

const validateForm = (name, email) => {
  return validateName(name) && validateEmail(email);
};

const OnBoardingScreen = () => {
const [name, onChangeName] = React.useState('');
const [email, onChangeEmail] = React.useState('');
const submit = (name, email) => Alert.alert('Thanks!');


const saveData = async (name, email) => {
  try {
    const value = await AsyncStorage.setItem(userInfoStorageKey);
    if (value !== null) {
        setIsRegistered(true)
      }
    } catch (e) {
    // error reading value
    } finally {
      setAppIsReady(true)
    }
  }
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/little-lemon-logo-grey.png')}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={'Little Lemon Logo'}
        />
        <Text style={styles.text}>
          Let us get to know you
        </Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="Your first name"
          keyboardType="default"
          textComntentType="givenName"
      />

        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Your email"
          keyboardType="email-address"
          textComntentType="emailAddress"
      />
        <Pressable onPress={ submit(name, email) } disabled={ !validateForm(name, email)}>
          <Text style={[{opacity: validateForm(name, email) ? 1 : 0.5}, styles.button]}> Next
          </Text>
        </Pressable>
      </View>
    </>
    );
  };


  const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: 'column',
      backgroundColor: "#fff",
      justifyContent: 'baseline',
      padding: 20,
      gap: 5,
      alignItems: 'center'
    },
    text: {
      fontSize: 20,
      padding: 24,
      marginVertical: 12,
      color: '#333333',
      textAlign: 'center',
      width: 400,
    },
    image: {
      width: 150,
      height: 150,
    },
    input: {
      width: 350,
      borderRadius: 5,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    button: {
      borderRadius: 5,
      padding: 10,
      fontSize: 18,
      color: '#EDEFEE',
      textAlign: 'center',
      backgroundColor: 'darkgreen'
    },
  });


export default OnBoardingScreen;
