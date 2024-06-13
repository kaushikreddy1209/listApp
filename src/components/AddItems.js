// screens/AddItemScreen.tsx

import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useItemContext} from '../context/ItemContext';

const AddItemScreen: React.FC = () => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const {addItem} = useItemContext();
  const navigation = useNavigation();

  const handleAddItem = () => {
    addItem({
      id: Math.random().toString(),
      name: itemName,
      description: itemDescription,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        onChangeText={text => setItemName(text)}
        value={itemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Description"
        onChangeText={text => setItemDescription(text)}
        value={itemDescription}
      />
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default AddItemScreen;
