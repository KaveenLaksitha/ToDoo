import axios from 'axios'

const instance = axios.create({
    baseURL: "https://api-nodejs-todolist.herokuapp.com"
})

instance.interceptors.request.use(
    async config => {

        // const token = getToken();

        const headers = {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjk4Y2YzNjI4MDY4ZTAwMTdjYTI4OTUiLCJpYXQiOjE2NTQyMzQ2NDV9.vJl4XJrG61-uq4ipLPaInnwmX1jYYDxBMnN4nxizJLU',
            'Content-Type': 'application/json'
        }
        config.headers = headers

        // if (token) {
        //     config.headers = headers
        // } else {
        //     console.log('no token')
        // }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

export default instance