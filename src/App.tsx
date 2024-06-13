import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ListScreen from './components/ListScreen';
import AddItemScreen from './components/AddItems';
import {ItemProvider} from './context/ItemContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ItemProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="AddItem" component={AddItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ItemProvider>
  );
};

export default App;
