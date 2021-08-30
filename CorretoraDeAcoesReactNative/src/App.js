import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Dashboard from './pages/Dashboard';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Portfolio from './pages/Portfolio';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PortfolioProvider} from './services/portfolioContext';
import ErrorBoundary from './components/ErrorBoundary';

const Tab = createBottomTabNavigator();

export class App extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <ErrorBoundary>
          <NavigationContainer>
            <PortfolioProvider>
              <Tab.Navigator initialRouteName="Dashboard">
                <Tab.Screen name="Dashboard" component={Dashboard} />
                <Tab.Screen name="Portfolio" component={Portfolio} />
              </Tab.Navigator>
            </PortfolioProvider>
          </NavigationContainer>
        </ErrorBoundary>
      </SafeAreaProvider>
    );
  }
}

export default App;
