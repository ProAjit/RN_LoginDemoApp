import { Dimensions, StyleSheet } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const componentStyle = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
     flex: 1,
    },
    scrollView: {
      flexGrow: 1,
    },
    backgroundImage: {
      alignItems: 'center',
      width: '100%',
      height: '100%',
      flex: 1,
      resizeMode: 'cover',
      marginTop: 0, // Adjust this value according to the height of your navigation bar  
    },
    innerView: {
      flexGrow: 1,
      paddingLeft: 30,
      paddingRight: 30,
      marginTop: 200,
      width: width,
      height: height,
    },
    inputText: {
      height: 40,
      borderColor: 'rgba(2, 28, 52, 0.1)',
      borderWidth: 0.5,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 10,  // Rounded corners
    },
    text: {
      height: 40,
      paddingTop: 10,
      fontSize: 15,
    },
    loginButton: {
      backgroundColor: 'rgba(2, 28, 52, 1.0)',  // Button color
      padding: 15,
      borderRadius: 10,  // Rounded corners
      alignItems: 'center',  // Center text horizontally
      marginTop: 20,
    },
    button: {
      backgroundColor: 'rgba(2, 28, 52, 1.0)',  // Button color
      padding: 15,
      borderRadius: 10,  // Rounded corners
      alignItems: 'center',  // Center text horizontally
    },
    buttonText: {
      color: '#fff',  // Text color
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  const cameraStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  export default componentStyle;