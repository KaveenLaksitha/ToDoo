import { View, StyleSheet, Pressable, Text } from 'react-native'
import React, { useEffect } from 'react'
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';

const SigninScreen = ({ navigation }) => {

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '354041699727-c21srjuqmgs9iqv2t70brfc5fqmpgmpk.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    }, []);

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("data>>>", userInfo)
        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log("cancelled")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log("in progress")

            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log("in progress")
            } else {
                // some other error happened
                console.log("error", error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome to ToDoo</Text>
            <GoogleSigninButton
                onPress={() => { signIn() }}
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
            // style={styles.signinbtn}
            />
            <Pressable onPress={() => { navigation.replace('home') }} style={styles.signinbtn}>
                <Text style={styles.text}>home</Text>
            </Pressable>
        </View>
    )
}


//styles
const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 36,
        color: 'black'
    },
    signinbtn: {
        backgroundColor: 'red',
        padding: 10
    },
    text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        color: 'white'
    }
})

export default SigninScreen