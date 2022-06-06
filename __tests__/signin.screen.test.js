import React from 'react'
import SigninScreen from '../src/screens/SigninScreen'

import { render, fireEvent } from '@testing-library/react-native'
import renderer from 'react-test-renderer'

describe('Signin Screen', () => {

    it('should render image in the signin screen', () => {
        const { getByTestId } = render(<SigninScreen />)

        const image = getByTestId('image')
        expect(image).toBeTruthy()
    });

    it('should render email input in the signin screen', () => {
        const { getByTestId } = render(<SigninScreen />)

        const input = getByTestId('textInput-email')
        expect(input).toBeTruthy()
    });

    it('should render password input in the signin screen', () => {
        const { getByTestId } = render(<SigninScreen />)

        const input = getByTestId('textInput-password')
        expect(input).toBeTruthy()
    });


    it('should render signin button in the signin screen', () => {
        const page = render(<SigninScreen />)

        const loginBtn = page.getByTestId('loginButton')
        expect(loginBtn).toBeTruthy()

    });

    it('should work signin button in the signin screen correctly', () => {
        const { getByTestId } = render(<SigninScreen />)

        const loginBtn = getByTestId('loginButton')
        fireEvent.press(loginBtn)

    });

    // it('should go to home screen on login button press', () => {
    //     const navigation = { navigate: () => { } }
    //     spyOn(navigation, 'navigate')

    //     const page = render(<SigninScreen navigation={navigation} />)

    //     const loginBtn = page.getByTestId('loginButton')

    //     fireEvent.press(loginBtn)

    //     expect(navigation.navigate).toHaveBeenCalledWith('home');
    // })

    test('renders sign in page correctly ', () => {
        const tree = renderer.create(<SigninScreen />).toJSON()
        expect(tree).toMatchSnapshot()
    })

});
