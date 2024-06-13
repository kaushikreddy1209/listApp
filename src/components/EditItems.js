import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useItemContext} from '../context/ItemContext';

const EditItems = ({route}) => {
  const navigation = useNavigation();
  const {item} = route.params;
  const {editItem} = useItemContext();
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);

  const handleSave = () => {
    const editedItem = {
      ...item,
      name,
      description,
    };
    editItem(editedItem);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Edit Item</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default EditItems;
