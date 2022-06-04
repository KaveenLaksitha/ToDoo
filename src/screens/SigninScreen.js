import { View, StyleSheet, Pressable, Text, TextInput, ImageBackground, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { signIn } from '../services/user.services';



const SigninScreen = ({ navigation }) => {

    const [username, setUsername] = useState("saman@yopmail.com");
    const [password, setPassword] = useState("12345678");

    //method related to sign in
    const login = async () => {
        const payload = {
            email: username,
            password
        }

        if (username != "" && password != "") {
            try {
                const res = await signIn(payload)
                if (res.ok) {
                    navigation.replace('home')
                } else {
                    Alert.alert("Oops! error occured!")
                }
            } catch (err) {
                Alert.alert("Oops! error occured!")
            }
            navigation.navigate("home")
        } else {
            Alert.alert("All the fields are required!")
        }
    }

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '354041699727-c21srjuqmgs9iqv2t70brfc5fqmpgmpk.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    }, []);

    signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
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
            <View style={styles.formContainer}>
                <ImageBackground
                    style={styles.image}
                    source={{
                        uri: 'https://i.ibb.co/jRhgq3W/undraw-Shared-goals-re-jvqd.png'
                    }}
                />
                <View>
                    <TextInput style={styles.input} placeholder="email" placeholderTextColor="grey" onChangeText={(e) => { setUsername(e) }}></TextInput>
                </View>
                <View>
                    <TextInput secureTextEntry={true} style={styles.input} placeholder="password" placeholderTextColor="grey" onChangeText={(e) => { setPassword(e) }}></TextInput>
                </View>
            </View>
            <Pressable onPress={() => { login() }} style={styles.signinbtn}>
                <Text style={styles.text}>Signin</Text>
            </Pressable>

            {/* <GoogleSigninButton
                onPress={() => { signInWithGoogle() }}
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
            /> */}

            <View style={styles.textGroup}>
                <Text style={styles.textSignup}>Don't have a account? </Text>
                <Pressable onPress={() => { navigation.replace('signup') }}>
                    <Text style={{ color: "blue" }}>
                        Signup
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}


//styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 36,
        color: 'black'
    },
    image: {
        // marginTop: 50,
        resizeMode: 'cover',
        height: 250,
        width: 250,
    },
    formContainer: {
        marginTop: 15,
        width: '100%',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "black",
        width: 350,
        padding: 10,
        color: 'black',
        fontSize: 16,
        marginBottom: 20
    },
    signinbtn: {
        backgroundColor: "#52007a",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        width: "85%",
        padding: 10
    },
    text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        color: 'white'
    },
    textSignup: {
        color: "black",
        alignItems: 'center'
    },
    textGroup: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default SigninScreen