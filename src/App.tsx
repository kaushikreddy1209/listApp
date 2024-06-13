import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ListScreen from './components/ListScreen';
import AddItems from './components/AddItems';
import {ItemProvider} from './context/ItemContext';
import EditItems from './components/EditItems';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ItemProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="AddItem" component={AddItems} />
          <Stack.Screen name="EditItem" component={EditItems} />
        </Stack.Navigator>
      </NavigationContainer>
    </ItemProvider>
  );
};

export default App;
