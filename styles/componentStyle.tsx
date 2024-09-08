import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../Constants/GlobalData';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const componentStyle = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: COLORS.appBackground,
    },
    container: {
     flex: 1,
     backgroundColor: COLORS.appBackground,
    },
    scrollContainer: {
      flex: 1,
      padding: 5,
      backgroundColor: COLORS.appBackground,
    },
    keyboardScrollContainer: {
       flexGrow: 1,
       padding: 16,
       backgroundColor: COLORS.appBackground,
    },
    scrollView: {
      flexGrow: 1,
      width: width,
      height: height,
      backgroundColor: COLORS.appBackground,
    },
    backgroundImage: {
      alignItems: 'center',
      width: '100%',
      height: '100%',
      flex: 1,
      resizeMode: 'cover',
    },
    innerView: {
      flexGrow: 1,
      paddingLeft: 30,
      paddingRight: 30,
      marginTop: 50,
      width: width,
      height: height,
      backgroundColor: COLORS.appBackground,
    },
    inputText: {
      height: 40,
      borderWidth: 0.5,
      paddingHorizontal: 10,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
      backgroundColor: COLORS.white,
    },
    text: {
      height: 40,
      paddingTop: 10,
      fontSize: 15,
    },
    textHeader: {
      padding: 10,
      fontSize: 13,
      fontWeight: 'bold',
      tintColor: COLORS.appThemeBlue, 
      textAlign: 'center',  // Center text horizontally
      marginBottom: 20,
    },
    loginButton: {
      backgroundColor: COLORS.appThemeBlue,  // Button color
      padding: 10,
      borderRadius: 10,  // Rounded corners
      alignItems: 'center',  // Center text horizontally
      marginTop: 20,
    },
    forgotButton: {
      backgroundColor: COLORS.appBackground,  // Button color
      padding: 10,
      borderRadius: 10,  // Rounded corners
      marginTop: 20,
    },
    button: {
      backgroundColor: COLORS.appThemeBlue,  // Button color
      padding: 10,
      borderRadius: 10,  // Rounded corners
      alignItems: 'center',  // Center text horizontally
    },
    buttonText: {
      color: COLORS.white,  // Text color
      fontSize: 20,
      fontWeight: 'regular',
    },
    forgotButtonText: {
      color: COLORS.appThemeBlue,  // Text color
      fontSize: 14,
      fontWeight: 'regular',
      textAlign: 'right',
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