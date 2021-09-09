import * as React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// pages
import { Dashboard } from '../screens/Dashboard';
import { Search } from '../screens/Search';
import { Portfolio } from '../screens/Portfolio';
import { DetailsAction } from '../screens/DetailsAction';

import { iconsTabs } from '../utils/iconsTab';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="AppBottomTab">
      <Stack.Screen
        name="AppBottomTab"
        options={{ headerShown: false }}
        component={AppBottomTab}
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

function AppBottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          const { Icon, name, size } = iconsTabs[route.name];
          return (
            <Icon name={name} color={focused ? '#4e4e4e' : color} size={size} />
          );
        },
        tabBarLabel: () => {
          const { title } = iconsTabs[route.name];
          return <Text>{title}</Text>;
        },
        tabBarBadgeStyle: {
          backgroundColor: '#fff',
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: '#fff',
          paddingBottom: 5,
        },
      })}>
      <Tab.Screen
        name="HomeTab"
        options={{
          headerShown: false,
          tabBarLabel: 'Finanças',
          tabBarBadge: undefined,
        }}
        component={Dashboard}
      />
      <Tab.Screen
        name="PortfolioTab"
        options={{
          headerShown: false,
          tabBarLabel: 'Portfólio',
          tabBarBadge: undefined,
        }}
        component={Portfolio}
      />
    </Tab.Navigator>
  );
}

export { AppRoutes };
