import { StyleSheet } from 'react-native';

export const formStyles = StyleSheet.create({
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
    label: {
      fontSize: 18,
      paddingHorizontal: 24,
      color: '#333333',
      textAlign: 'left',
      width: 400,
    },
    input: {
      width: 350,
      borderRadius: 5,
      height: 40,
      marginBottom: 10,
      borderWidth: 1,
      padding: 10,
    },
    button: {
      borderRadius: 5,
      padding: 10,
      fontSize: 18,
      color: '#EDEFEE',
      textAlign: 'center',
      backgroundColor: '#495E57'
    },
    buttonSecondary: {
      borderRadius: 5,
      padding: 10,
      fontSize: 18,
      color: '#495E57',
      textAlign: 'center',
      backgroundColor: '#EDEFEE'
    },
    darkButton: {
      borderRadius: 5,
      padding: 10,
      fontSize: 18,
      color: 'white',
      textAlign: 'center',
      backgroundColor: 'black',
      borderWidth: 0.5,
    },
  });

