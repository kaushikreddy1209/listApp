import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Button, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useItemContext} from '../context/ItemContext';

const ListScreen = () => {
  const navigation = useNavigation();
  const {items, fetchItems, clearItems, deleteItem} = useItemContext();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchItems();
    });

    return unsubscribe;
  }, [fetchItems, navigation]);

  const handleDeleteItem = async (itemId, itemName) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete '${itemName}'?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await deleteItem(itemId);
              Alert.alert(
                'Item Deleted',
                `'${itemName}' has been deleted successfully.`,
              );
            } catch (error) {
              Alert.alert('Error', 'Failed to delete item.');
              console.error('Failed to delete item', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleClearItems = async () => {
    if (items.length === 0) {
      Alert.alert('List Empty', 'There are no items to clear.');
      return;
    }

    Alert.alert(
      'Clear All Items',
      'Are you sure you want to clear all items?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await clearItems();
              Alert.alert(
                'Items Cleared',
                'All items have been cleared successfully.',
              );
            } catch (error) {
              Alert.alert('Error', 'Failed to clear items.');
              console.error('Failed to clear items', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
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
            <View style={styles.buttonContainer}>
              <Button
                title="Edit"
                onPress={() => navigation.navigate('EditItem', {item})}
                color="#007BFF"
              />
              <Button
                title="Delete"
                onPress={() => handleDeleteItem(item.id, item.name)}
                color="#DC3545"
              />
            </View>
          </View>
        )}
        refreshing={refreshing}
        onRefresh={fetchItems}
        contentContainerStyle={styles.flatListContent}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items found.</Text>
          </View>
        )}
      />
      <View style={styles.bottomButtonContainer}>
        <Button
          title="Add Item"
          onPress={() => navigation.navigate('AddItem')}
          color="#007BFF"
          style={styles.button}
        />
        <Button
          title="Clear All Items"
          onPress={handleClearItems}
          color="#DC3545"
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  itemContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
  flatListContent: {
    flexGrow: 1,
  },
});

export default ListScreen;
