import React, {useEffect} from 'react';
import {View, Text, FlatList, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useItemContext} from '../context/ItemContext';

const ListScreen = () => {
  const navigation = useNavigation();
  const {items, fetchItems} = useItemContext();

  useEffect(() => {
    fetchItems();
  }, []);

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
      />
      <Button title="Add Item" onPress={() => navigation.navigate('AddItem')} />
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
});

export default ListScreen;
