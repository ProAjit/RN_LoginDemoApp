import { Dimensions, StyleSheet } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const segmentStyle = StyleSheet.create({
    segmentedControlContainer: {
        marginVertical: 10,
        paddingHorizontal: 40,
    },

    segmentedControl: {
        height: 35,
        borderColor: 'black',
        borderWidth: 0.2,
    },
});

export default segmentStyle;