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
      backgroundColor: 'white',
      padding: 10, 
      paddingTop: 30,
      width: width * 0.8,  // 80% of screen width
      height: height * 0.25,
    },
    inputText: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    text: {
      height: 40,
      paddingTop: 10,
      fontSize: 15,
    },
    button: {
      marginTop: 10,
      width: width * 0.8,  // 80% of screen width
      backgroundColor: 'rgb(50, 130, 130)',  // Button color
      padding: 15,
      marginLeft: 30,
      marginRight: 30,
      borderRadius: 0,  // Rounded corners
      alignItems: 'center',  // Center text horizontally
    },
    buttonText: {
      color: '#FFFFFF',  // Text color
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