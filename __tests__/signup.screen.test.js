import React from 'react'
import SignupScreen from '../src/screens/SignupScreen'

import { render, fireEvent } from '@testing-library/react-native'
import renderer from 'react-test-renderer'

describe('Signup Screen', () => {

    it('should render name input in the signup screen', () => {
        const { getByTestId } = render(<SignupScreen />)

        const input = getByTestId('name')
        expect(input).toBeTruthy()
    });

    it('should render email input in the signup screen', () => {
        const { getByTestId } = render(<SignupScreen />)

        const input = getByTestId('email')
        expect(input).toBeTruthy()
    });

    it('should render age input in the signup screen', () => {
        const { getByTestId } = render(<SignupScreen />)

        const input = getByTestId('age')
        expect(input).toBeTruthy()
    });

    it('should render password input in the signup screen', () => {
        const { getByTestId } = render(<SignupScreen />)

        const input = getByTestId('password')
        expect(input).toBeTruthy()
    });

    it('should render re enter password input in the signup screen', () => {
        const { getByTestId } = render(<SignupScreen />)

        const input = getByTestId('re-password')
        expect(input).toBeTruthy()
    });


    it('should render signup button in the signup screen', () => {
        const page = render(<SignupScreen />)

        const signupBtn = page.getByTestId('signupButton')
        expect(signupBtn).toBeTruthy()

    });

    it('should work signup button in the signup screen correctly', () => {
        const { getByTestId } = render(<SignupScreen />)

        const signupBtn = getByTestId('signupButton')
        fireEvent.press(signupBtn)

    });

    test('renders signup page correctly ', () => {
        const tree = renderer.create(<SignupScreen />).toJSON()
        expect(tree).toMatchSnapshot()
    })
});