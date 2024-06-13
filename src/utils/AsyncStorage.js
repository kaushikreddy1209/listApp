import AsyncStorage from '@react-native-async-storage/async-storage';

const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error getting item from AsyncStorage:', error);
    return null;
  }
};

const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting item in AsyncStorage:', error);
  }
};

export default {getItem, setItem};
