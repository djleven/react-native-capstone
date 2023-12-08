import { useState } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, Image, Pressable } from 'react-native';
import { formStyles } from '../styles';
import { validateEmail, validateName} from '../validators';

const validateForm = (name, email) => {
  return validateName(name) && validateEmail(email);
};

const OnBoardingScreen = ({setData}) => {
  const [firstName, onChangeFirstName] = useState('');
  const [email, onChangeEmail] = useState('');

  return (
    <>
      <View style={formStyles.container}>
        <Image
          style={styles.image}
          source={require('../assets/little-lemon-logo.png')}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={'Little Lemon Logo'}
        />
        <Text style={formStyles.text}>
          Let us get to know you
        </Text>

        <Text style={formStyles.label} aria-label="Label for First Name" nativeID="labelFirstname">First Name</Text>
        <TextInput
          style={formStyles.input}
          onChangeText={onChangeFirstName}
          value={firstName}
          placeholder="Your first name"
          keyboardType="default"
          textComntentType="givenName"
      />

        <Text style={formStyles.label} aria-label="Label for Email" nativeID="labelEmail">Email</Text>
        <TextInput
          style={formStyles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Your email"
          keyboardType="email-address"
          textComntentType="emailAddress"
      />
        <Pressable onPress={ ()=>{ setData({firstName, email})}  } disabled={ !validateForm(firstName, email)}>
          <Text style={[{opacity: validateForm(firstName, email) ? 1 : 0.7}, formStyles.button]}> Next
          </Text>
        </Pressable>
      </View>
    </>
    );
  };

  const styles = StyleSheet.create({
    image: {
      width: 150,
      height: 150,
    },
  
  });


export default OnBoardingScreen;
