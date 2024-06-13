import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemContext = createContext();

export const ItemProvider = ({children}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('items');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Failed to fetch items from storage', error);
    }
  };

  const addItem = async item => {
    const newItem = {...item, id: Date.now().toString()};
    const newItemsList = [...items, newItem];
    setItems(newItemsList);
    await AsyncStorage.setItem('items', JSON.stringify(newItemsList));
  };

  const editItem = async editedItem => {
    const updatedItems = items.map(item =>
      item.id === editedItem.id ? editedItem : item,
    );
    setItems(updatedItems);
    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const deleteItem = async itemId => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const clearItems = async () => {
    setItems([]);
    await AsyncStorage.removeItem('items');
  };

  return (
    <ItemContext.Provider
      value={{items, addItem, editItem, deleteItem, fetchItems, clearItems}}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => useContext(ItemContext);
