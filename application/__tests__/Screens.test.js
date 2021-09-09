import React from 'react';
import HomeScreen from '../src/screens/HomeScreen';
import FinanceScreen from '../src/screens/FinanceScreen';
import DetailsScreen from '../src/screens/DetailsScreen';

import { render } from '@testing-library/react-native';

describe('HomeScreen', () => {
    it('should render HomeScreen', () => {
        render(<HomeScreen />)
    })
})


describe('FinanceScreen', () => {
    it('should render FinanceScreen', () => {
        render(<FinanceScreen />)
    })
})


describe('DetailsScreen', () => {
    it('should render DetailsScreen', () => {
        render(<DetailsScreen />)
    })
})