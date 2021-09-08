import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// pages
import { Dashboard } from '../screens/Dashboard';
import { Search } from '../screens/Search';
import { Portfolio } from '../screens/Portfolio';
import { DetailsAction } from '../screens/DetailsAction';

const Stack = createStackNavigator();

function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
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
      <Stack.Screen
        name="Portfolio"
        options={{ headerShown: false }}
        component={Portfolio}
      />
      <Stack.Screen
        name="DetailsAction"
        options={{ headerShown: false }}
        component={DetailsAction}
      />
    </Stack.Navigator>
  );
}

export { AppRoutes };
