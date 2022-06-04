import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
    baseURL: "https://api-nodejs-todolist.herokuapp.com"
})

instance.interceptors.request.use(
    async config => {

        const token = await AsyncStorage.getItem('token')
        const headers = {
            // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjk4Y2YzNjI4MDY4ZTAwMTdjYTI4OTUiLCJpYXQiOjE2NTQzNTQxMzB9.5sWh_5fVjzY2fy9bVjdOak7wCDSIJua5B-WhYk4E4_k',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
        config.headers = headers

        if (token) {
            config.headers = headers
        } else {
            console.log('no token')
        }

        return config
    },
    err => {
        return Promise.reject(err)
    }
)

export default instance