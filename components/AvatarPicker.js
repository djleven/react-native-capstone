import { Image, View, Text, Pressable, StyleSheet } from 'react-native';
import { formStyles } from '../styles';
import Avatar from './Avatar';

import * as ImagePicker from 'expo-image-picker';

function AvatarPicker({firstName, lastName, imageURI, setImage}) {

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = async () => {
    setImage(null)
  }

  return (
    <View style={styles.container}>
    <Avatar
      firstName={firstName}
      lastName={lastName}
      imageURI={imageURI}
      accessibilityLabel={'User profile avatar'}
    />
    <Pressable onPress={ removeImage } disabled={!imageURI}>
        <Text style={[{opacity: imageURI ? 1 : 0.5}, formStyles.buttonSecondary]} >
          Remove
        </Text>
      </Pressable>
      <Pressable onPress={pickImage}>
        <Text style={formStyles.button}>
          Change
        </Text>
      </Pressable>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: "#fff",
    justifyContent: 'space-evenly',
    paddingHorizontal: 0,
    paddingBottom: 30,
    gap: 15,
    alignItems: 'center'
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 150,
  },
  placeholder: {
    width: 80,
    height: 80,
    backgroundColor: 'grey',
    borderRadius: 100,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingRight: 5,
    gap: -10
  },
  placeholderText: {
    color: 'white',
    fontSize: 25,
  }
});

export default AvatarPicker;