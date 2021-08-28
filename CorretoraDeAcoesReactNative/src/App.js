import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from './pages/Dashboard';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Portfolio from './pages/Portfolio';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export class App extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Dashboard">
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="Portfolio" component={Portfolio} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

export default App;
