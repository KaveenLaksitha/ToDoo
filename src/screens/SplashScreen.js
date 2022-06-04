import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'


const SplashScreen = ({ navigation }) => {

    //set timeout to display home screen
    useEffect(() => {

        setTimeout(() => {
            navigation.replace('signin')
        }, 2500);

    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>ToDoo</Text>
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
    text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 42,
        color: '#52007a'
    }
})

export default SplashScreen;
