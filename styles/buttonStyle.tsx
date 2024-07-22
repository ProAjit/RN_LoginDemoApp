
import { Dimensions, StyleSheet } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const buttonStyles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 100,
      width: '100%', 
    },
    button: {
      width: 100,
      height: 100,
      borderRadius: 10, // Optional: round the corners of the button
      justifyContent: 'center',
    },
    image: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      tintColor: 'rgba(157, 251, 54, 1.0)',
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 20,
      justifyContent: 'center',
    },
  });

  export default buttonStyles;
  