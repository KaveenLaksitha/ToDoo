import React from 'react'
import HomeScreen from '../src/screens/HomeScreen'

import { render, fireEvent } from '@testing-library/react-native'
import renderer from 'react-test-renderer'

describe('Home Screen', () => {
    test('renders home page correctly ', () => {
        const tree = renderer.create(<HomeScreen />).toJSON()
        expect(tree).toMatchSnapshot()
    })
});