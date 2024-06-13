import React, {useEffect} from 'react';
import {View, Text, FlatList, Button, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useItemContext} from '../context/ItemContext';

const ListScreen = () => {
  const navigation = useNavigation();
  const {items, fetchItems, clearItems} = useItemContext();

  useEffect(() => {
    const loadItems = async () => {
      try {
        await fetchItems();
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch items from storage.');
        console.error('Failed to fetch items from storage', error);
      }
    };

    loadItems();
  }, []);

  const handleClearItems = async () => {
    try {
      await clearItems();
      Alert.alert('Items Cleared', 'All items have been cleared successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to clear items.');
      console.error('Failed to clear items', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items found.</Text>
          </View>
        )}
      />
      <Button title="Add Item" onPress={() => navigation.navigate('AddItem')} />
      <Button title="Clear All Items" onPress={handleClearItems} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});

export default ListScreen;
