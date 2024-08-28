
import { Dimensions, StyleSheet } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const bottomButtonStyles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        margin: 10,
        marginBottom: 25,
      },
      button: {
        flex: 1,
        backgroundColor: 'rgba(2, 28, 52, 1.0)',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        marginHorizontal: 20,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      whiteButton: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(2, 28, 52, 1.0)',
        marginRight: 20,
      },
      whiteButtonText: {
        color: 'rgba(2, 28, 52, 1.0)',
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default bottomButtonStyles;