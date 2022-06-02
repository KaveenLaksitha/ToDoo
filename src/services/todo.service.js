import axios from 'axios'

var config = {
    method: 'post',
    url: 'https://api-nodejs-todolist.herokuapp.com/task',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGRjY2JlYzZiNTVkYTAwMTc1OTcyMmMiLCJpYXQiOjE1NzQ3NTE2ODh9.GPbsl9FLX4VrsGVErodiXypjuz1us4tfD0jwg2_UrzY',
        'Content-Type': 'application/json'
    },
    data: data
};