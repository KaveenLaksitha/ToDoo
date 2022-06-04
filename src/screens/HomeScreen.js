import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Modal,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View,
    Dimensions,
    Pressable,
    Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { getAllTodos, deleteSingleToDo } from '../services/todo.service'
import ToDoModal from './modals/ToDoModal';


const windowWidth = Dimensions.get('window').width;

const HomeScreen = () => {

    const [allToDos, setAllToDos] = useState({ value: [], error: "no data" })
    const [filteredData, setFilteredData] = useState([]);

    const [isLoading, setLoading] = useState(true);
    const [modalData, setModalData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);

    const [searchValue, setSearchValue] = useState("")

    // to get todos from API
    useEffect(() => {
        getAllToDosFunc()
    }, [modalVisible])

    // function get todos from API
    const getAllToDosFunc = () => {
        getAllTodos().then((res) => {
            if (res.ok) {
                setAllToDos({ ...allToDos, value: res.data })
                setFilteredData(res.data)
            }
        }).catch((err) => {
            console.log('err');
        }).finally(() => {
            setLoading(false);
        })
    }

    //function used to search todo by description
    const searchByName = async () => {
        const result = allToDos.value.filter((value) => {
            if (searchValue === '' || !searchValue) {
                return allToDos.value
            }
            else if (value.description.toLowerCase().includes(searchValue.toLowerCase())) {
                return value
            } else {
                return null
            }
        })
        setFilteredData(result)
    }

    //function to open modal - update todo
    const openModalUpdateToDo = (user) => {
        setModalData({ ...user, isUpdate: true })
        changeModalVisibility(true)
    }

    //function to open modal - add todo
    const openModalAddTodo = (user) => {
        setModalData({ ...user, isUpdate: false })
        changeModalVisibility(true)
    }

    //function to set modal visibility
    const changeModalVisibility = (state) => {
        setModalVisible(state)
    }

    //to call delete to do API method
    const deleteToDoFunc = async (id) => {

        Alert.alert(
            "This will delete this task",
            "Do you want to continue?",
            [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "OK", onPress: async () => { await deleteSingleToDo(id); getAllToDosFunc() } }
            ]
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#52007a" />
            <View style={styles.searchField}>
                <TextInput
                    style={styles.input}
                    onChangeText={setSearchValue}
                    value={searchValue}
                    placeholder={"Search"}
                />
                <TouchableHighlight onPress={() => { searchByName() }} underlayColor="none">
                    <View style={styles.button}>
                        <Text style={styles.btnText}>Search</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <View
                style={styles.listContainer}>
                <Text style={styles.listTitle}>Your todos</Text>
                {isLoading ? <ActivityIndicator /> : (

                    <FlatList
                        data={filteredData}
                        keyExtractor={({ _id }, index) => _id}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => { openModalUpdateToDo(item) }} onLongPress={() => { deleteToDoFunc(item._id) }}>
                                <View style={styles.listItem} >
                                    <Text style={styles.text}>Task : {item.description}</Text>
                                    <Text style={styles.text}>Status : {item.completed ? 'Completed' : 'Pending'}</Text>
                                </View>
                            </Pressable>
                        )}
                    />
                )}

            </View>

            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    position: 'absolute',
                    bottom: 10,
                    right: 15,
                    height: 50,
                    backgroundColor: '#52007a',
                    borderRadius: 100,
                }}
                onPress={() => {
                    openModalAddTodo()
                }}>
                <Icon name="plus" size={35} color="#fff" />
            </TouchableOpacity>


            <Modal
                animationType="slide"
                transparent={true}
                onHide={() => setModalVisible(false)}
                visible={modalVisible}
            >
                <ToDoModal data={modalData} changeModalVisibility={changeModalVisibility} />
            </Modal>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchField: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 20,
        backgroundColor: 'white',
    },
    input: {
        fontSize: 18,
        height: 40,
        width: windowWidth - 180,
        borderWidth: 0,
        backgroundColor: "white",
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    listTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20
    },
    listContainer: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        padding: 15
    },

    listItem: {
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 15,
        width: '100%',
        padding: 15,
        marginBottom: 20,
        elevation: 2,
    },
    button: {
        width: 120,
        height: 38,
        backgroundColor: "#52007a",
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "white",
        fontSize: 18,
    },
    text: {
        fontWeight: '500',
        fontSize: 18,
        color: 'black'
    }
})

export default HomeScreen