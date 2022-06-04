import API from "./API";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signIn = async (payload) => {
    try {
        const res = await API.post("/user/login", payload)
        if (res.status === 200) {
            await AsyncStorage.setItem('token', res.data.token)
                .then(() => {
                    console.log('saved successfully')
                })
                .catch(() => {
                    console.log('error when saving')
                })
            return { ok: true }
        } else {
            return { ok: false }
        }
    } catch (err) {
        console.log("err>>", err)
        return { ok: false }
    }
}