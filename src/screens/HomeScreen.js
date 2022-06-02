import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Bileeta Mobile</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 36,
        color: 'black'
    }
})

export default HomeScreen