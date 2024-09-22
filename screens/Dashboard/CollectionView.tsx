import React, { useRef, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressCard, faMessage, faPersonShelter, faGraduationCap, faClipboardQuestion, faBlog, faLink, faNewspaper, faBellSlash, faAddressBook, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '../../Constants/GlobalData';
import { getActiveAlertCount } from '../../Networking/SafetyAlerts/AlertsServices';

interface Item {
  id: string;
  title: string;
}

interface CollectionViewProps {
  data: Item[];
  alertsVisited: boolean;
  onItemPress: (title: string) => void;
}

const numColumns = 2;
const { width } = Dimensions.get('window');
const itemWidth = width / numColumns;

const getIcon = (title: string) => {
  switch (title) {
    case 'TOP MANAGEMENT MESSAGES':
      return faMessage;
    case 'ENDORSE YOUR SAFETY ISSUE':
      return faPersonShelter;
    case 'SCHEDULE IN CLASS TRAINING':
      return faGraduationCap;
    case 'QUERIES':
      return faClipboardQuestion;
    case 'E-TRAINING':
      return faBlog;
    case 'LINKS':
      return faLink;
    case 'SAFETY NEWS':
      return faNewspaper;
    case 'SAFETY ALERTS':
      return faBellSlash;
    case 'ABOUT':
      return faAddressBook;
    case 'ADMIN':
      return faUserTie;
    default:
      return faAddressCard;
  }
};

const CollectionView: React.FC<CollectionViewProps> = ({ data, alertsVisited, onItemPress }) => {
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [alertCount, setAlertCount] = useState<string | null>(null); // State to store alert count

  // Fetch active alert count from the API

  useEffect(() => {
    const fetchAlertCount = async () => {
      try {
        const response = await getActiveAlertCount();
        console.log('\nAlert Count', response)
        setAlertCount(response.ActiveAlertCount); // Update state with the alert count
      } catch (error) {
        console.error('Failed to fetch alert count:', error);
      }
    };
    fetchAlertCount();
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    if (!alertsVisited) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shakeAnimation, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: -1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [alertsVisited]);

  const handleItemPress = (title: string) => {
    onItemPress(title); // Notify parent component about the click
    if (title === 'SAFETY ALERTS') {
      setAlertCount('0'); // Set alert count to zero
    }
  };

  const renderItem = ({ item }: { item: Item }) => {
    const iconStyle = [
      styles.iconStyle,
      item.title === 'SAFETY ALERTS' && !alertsVisited && {
        transform: [{
          translateX: shakeAnimation.interpolate({
            inputRange: [-1, 1],
            outputRange: [-2, 2],
          })
        }]
      },
    ];

    return (
      <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item.title)}>
        <Animated.View style={iconStyle}>
          <FontAwesomeIcon icon={getIcon(item.title)} size={45} color={COLORS.white} />
        </Animated.View>
        <Text style={styles.title}>{item.title}</Text>
        {item.title === 'SAFETY ALERTS' && (
          <View style={styles.badgeContainer}>
            {/* Display the count dynamically */}
            <Text style={styles.badgeText}>{alertCount !== null ? alertCount : '0'}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
      numColumns={numColumns}
      columnWrapperStyle={styles.row}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    height: 130,
  },
  item: {
    backgroundColor: COLORS.appThemeBlue,
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 8,
    width: itemWidth - 20,
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'column',
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  iconStyle: {
    marginTop: 10,
  },
  badgeContainer: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: 'red',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CollectionView;