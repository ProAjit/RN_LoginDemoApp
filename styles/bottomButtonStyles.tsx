
import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../Constants/globalData';

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
        backgroundColor: COLORS.appThemeBlue,
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
        borderColor: COLORS.appThemeBlue,
        marginRight: 20,
      },
      whiteButtonText: {
        color: COLORS.appThemeBlue,
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default bottomButtonStyles;