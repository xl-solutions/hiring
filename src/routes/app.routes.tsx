import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// pages
import { Dashboard } from '../screens/Dashboard';
import { Search } from '../screens/Search';

const Stack = createStackNavigator();

function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        options={{ headerShown: false }}
        component={Dashboard}
      />
      <Stack.Screen
        name="Search"
        options={{ headerShown: false }}
        component={Search}
      />
    </Stack.Navigator>
  );
}

export { AppRoutes };
