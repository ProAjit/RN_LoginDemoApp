
import { StyleSheet } from 'react-native';

const navStyle = StyleSheet.create ({
    navbar: {
      backgroundColor: '#f8f8f8',
      width: '100%',  // Full width of the parent view
      justifyContent: 'center',
      alignItems: 'center',  // Center text horizontally
      paddingBottom: 10,
      paddingTop: 5,
      marginBottom: '10%',
      marginTop: -250,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 16,
      color: '#666',
    },
  })

  export default navStyle;