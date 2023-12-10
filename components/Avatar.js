import { Image, View, Text, StyleSheet } from 'react-native';

function Avatar({firstName, lastName, imageURI, accessibilityLabel, isSmall}) {

  const getInitial = (str) => {

    return str ? Array.from(str)[0] : '?';
  }

  const styles = isSmall ? small : large

  return (
    <>
    {imageURI ?
        <Image
          style={styles.avatar}
          source={{ uri: imageURI }}
          resizeMode="contain"
          accessible={true}buttonSecondary
          accessibilityLabel={accessibilityLabel}
        /> :
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}> {getInitial(firstName)}</Text>
          <Text style={styles.placeholderText}> {getInitial(lastName)}</Text>
        </ View>
    }
    </>
  );
}

const large = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
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

const small = StyleSheet.create({
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 100,
    },
    placeholder: {
      width: 50,
      height: 50,
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
      fontSize: 20,
    }
  });

export default Avatar;