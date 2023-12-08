import { Alert, useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TextInput, Pressable, StyleSheet } from 'react-native';
import AvatarPicker from '../components/AvatarPicker';
import Checkbox from 'expo-checkbox';
import { formStyles } from '../styles';
import { validateEmail, validateName, validatePhoneNumberUSA} from '../validators';

const validateForm = (data) => {
  return validatePhoneNumberUSA(data.phoneNumber) && validateName(data.firstName) && validateName(data.lastName) && validateEmail(data.email);
};

const ProfileScreen = ({data, setData}) => {
  const [imageURI, setImage] = useState('');
  const [firstName, onChangeFirstName] = useState('');
  const [lastName, onChangeLastName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [phoneNumber, onChangePhoneNumber] = useState('');
  const [hasOrderStatus, setHasOrderStatus] = useState(false);
  const [hasPasswordChange, setHasPasswordChange] = useState(false);
  const [hasSpecialOffers, setHasSpecialOffers] = useState(false);
  const [hasNewsletter, setHasNewsletter] = useState(false);

  useEffect(() => {
    setImage(data.imageURI);
    onChangeFirstName(data.firstName);
    onChangeLastName(data.lastName);
    onChangeEmail(data.email);
    onChangePhoneNumber(data.phoneNumber);
    setHasOrderStatus(data.hasOrderStatus);
    setHasPasswordChange(data.hasPasswordChange);
    setHasSpecialOffers(data.hasSpecialOffers);
    setHasNewsletter(data.hasNewsletter);

  }, []);

  const saveData = () => setData(collectData());

  function populateState(data) {
    
  };

  function revertChanges() {
    populateState(stateFreeze);
  };

  const collectData = () => {
    return {
      firstName,
      email,
      imageURI,
      lastName,
      phoneNumber,
      hasOrderStatus,
      hasPasswordChange,
      hasSpecialOffers,
      hasNewsletter,
    }
  };

  return (
    <ScrollView>

      <View style={formStyles.container}>
        <Text style={styles.header}>
          Personal Information
        </Text>
        <AvatarPicker imageURI={imageURI} setImage={setImage} firstName={firstName} lastName={lastName}></AvatarPicker>
      
        <Text style={formStyles.label}  aria-label="Label for First Name" nativeID="labelFirstname">First Name</Text>
        <TextInput
          style={formStyles.input}
          onChangeText={onChangeFirstName}
          value={firstName}
          placeholder="Your first name"
          keyboardType="default"
          textComntentType="givenName"
        />

        <Text style={formStyles.label}  aria-label="Label for Last Name" nativeID="labelLastname">Last Name</Text>
        <TextInput
          style={formStyles.input}
          onChangeText={onChangeLastName}
          value={lastName}
          placeholder="Your Last name"
          keyboardType="default"
          textComntentType="familyName"
        />

        <Text style={formStyles.label}  aria-label="Label for Email" nativeID="labelEmail">Email</Text>
        <TextInput
          style={formStyles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Your email"
          keyboardType="email-address"
          textComntentType="emailAddress"
        />

        <Text style={formStyles.label}  aria-label="Label for Phone Number" nativeID="labelPhoneNumber">Phone Number</Text>
        <TextInput
          style={formStyles.input}
          onChangeText={onChangePhoneNumber}
          value={phoneNumber}
          placeholder="Your Phone Number"
          keyboardType="phone-pad"
          textComntentType="telephoneNumber"
        />

        <Text style={styles.notifications}>
          Email Notification Information
        </Text>
        <View style={styles.checkboxContainer}>
        <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={hasOrderStatus}
              onValueChange={setHasOrderStatus}
              color={hasOrderStatus ? 'darkgreen' : undefined}
            />
            <Text style={styles.paragraph}>Order statuses</Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={hasPasswordChange}
              onValueChange={setHasPasswordChange}
              color={hasPasswordChange ? 'darkgreen' : undefined}
            />
            <Text style={styles.paragraph}>Password changes</Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={hasSpecialOffers}
              onValueChange={setHasSpecialOffers}
              color={hasSpecialOffers ? 'darkgreen' : undefined}
            />
            <Text style={styles.paragraph}>Special offers</Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={hasNewsletter}
              onValueChange={setHasNewsletter}
              color={hasNewsletter ? 'darkgreen' : undefined}
            />
            <Text style={styles.paragraph}>Newsletter</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>

          <Pressable onPress={ ()=>{ setData(null) }}>
            <Text style={formStyles.buttonSecondary}>
              Logout
            </Text>
          </Pressable>
          <Pressable onPress={saveData} disabled={!validateForm(collectData())}>
            <Text style={[{opacity: validateForm(collectData()) ? 1 : 0.5}, formStyles.button]}>
              Save Changes
            </Text>
          </Pressable>
        </View>


      </View>
    </ScrollView>
    );
  };


  const styles = StyleSheet.create({
    buttonContainer: {
      flex:1,
      flexDirection: 'row',
      backgroundColor: "#fff",
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
      gap: 20,
      alignItems: 'center'
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      paddingLeft: 20,
      marginTop: 10,
      marginBottom: 20,
      color: '#333333',
      textAlign: 'left',
      width: 400,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 150,
    },

    checkboxContainer: {
      flex: 1,
      marginRight: 'auto',
      marginVertical: 15,
      paddingLeft: 5,
      alignItems: 'flex-start',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    paragraph: {
      fontSize: 15,
    },
    checkbox: {
      margin: 8,
      padding: 10
    },
    notifications: {
      fontSize: 20,
      fontWeight: 'bold',
      paddingLeft: 20,
      marginTop: 25,
      marginBottom: 0,
      color: '#333333',
      textAlign: 'left',
      width: 400,
    },
  
  });

export default ProfileScreen;
