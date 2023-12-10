import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = () => {

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/little-lemon-logo.png')}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={'Little Lemon Logo'}
        />
        <Text style={styles.text}>
          Loading something awesome!
        </Text>

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
  });


export default SplashScreen;
