import { View, Text, Alert, SafeAreaView, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { signUp } from '../services/user.services'

const SignupScreen = ({ navigation }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [age, setAge] = useState(0);

    //method used to signup
    const signupFunc = async () => {
        const payload = {
            name,
            email,
            password,
            age
        }

        if (name != "" && email != "" && password != "" && age != "") {
            if (password === repassword) {
                try {
                    const res = await signUp(payload);
                    if (res.ok) {
                        Alert.alert("Success!")
                        navigation.replace('signin')
                    } else {
                        Alert.alert("Oops! error occured")
                    }
                } catch (err) {
                    Alert.alert("Oops! error occured")
                }
            } else {
                Alert.alert("Passwords are not matching!")
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.text}>Name :</Text>
                <TextInput testID='name' style={styles.input} placeholder="" onChangeText={(e) => { setName(e) }}></TextInput>
            </View>

            <View style={{ marginTop: 10 }}>
                <Text style={styles.text}>Email :</Text>
                <TextInput testID='email' style={styles.input} placeholder="" onChangeText={(e) => { setEmail(e) }}></TextInput>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.text}>Age : </Text>
                <TextInput testID='age' style={styles.input} placeholder="" keyboardType="numeric" onChangeText={(e) => { setAge(e) }}></TextInput>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.text}>Password :</Text>
                <TextInput testID='password' style={styles.input} secureTextEntry={true} placeholder="" onChangeText={(e) => { setPassword(e) }}></TextInput>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.text}>Re enter the Password :</Text>
                <TextInput testID='re-password' style={styles.input} secureTextEntry={true} placeholder="" onChangeText={(e) => { setRepassword(e) }}></TextInput>
            </View>
            <Pressable testID='signupButton' onPress={() => { signupFunc() }} style={styles.btnSubmit}>
                <Text style={[styles.text, { color: "white" }]}>Signup</Text>
            </Pressable>
        </SafeAreaView>
    )
}

//styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "black",
        width: 350,
        padding: 10,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    },
    text: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5
    },
    btnSubmit: {
        marginTop: 30,
        backgroundColor: "#52007a",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        width: "95%",
        padding: 10

    },
});

export default SignupScreen