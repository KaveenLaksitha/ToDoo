import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importing screens
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

const defaultTheme = {
  ...DefaultTheme,
  // dark: false,
  colors: {
    card: '#823aa8',
    primary: '#823aa8',
    text: 'white',
    background: 'white',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={defaultTheme}>
      <Stack.Navigator initialRouteName="splashScreen" >
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />

        <Stack.Screen name="splashScreen" component={SplashScreen}
          options={{ title: '', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}