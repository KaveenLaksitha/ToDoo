import React, { useState, useEffect } from 'react'
import {
    Modal,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Alert
} from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { addToDo, updateSingleToDo } from '../../services/todo.service';

const AddToDo = (props) => {

    const inputRef = React.useRef(null);

    const [modalVisible, setModalVisible] = useState(props.visible);
    const [isUpdate, setIsUpdate] = useState(props.data.isUpdate)

    const [description, setDescription] = useState('')
    const [status, setStatus] = useState({ todo: true, completed: false });

    //to close the modal
    const closeModal = (bool) => {
        props.changeModalVisibility(bool)
    }

    //to check whether update or add
    useEffect(() => {
        if (isUpdate) {
            setDescription(props?.data?.description)
            props?.data?.completed ? setStatus({ ...status, completed: true, todo: false }) : setStatus({ ...status, completed: false, todo: true })
        }
    }, [])

    //to add a todo
    const addToDoFunc = async () => {
        const payload = {
            // description: "test task 01"
            description
        }

        console.log("for insert>>>", payload);

        if (description != "") {
            try {
                const res = await addToDo(payload);
                if (res.ok) {
                    showAlert()
                } else {
                    console.log("error")
                }
            } catch (err) {
                console.log("error")
            }
        }

    }

    //to update a todo
    const updateToDoFunc = async () => {
        const payload = {
            description,
            completed: status.completed
        }

        if (description != "") {
            try {
                const res = await updateSingleToDo(props.data._id, payload, payload);
                if (res.ok) {
                    showAlert()
                } else {
                    console.log("error")
                }
            } catch (err) {
                console.log("error")
            }
        }
    }

    //function related to display alert
    const showAlert = () => {
        Alert.alert(
            "Success!",
            "your request has been completed",
            [
                { text: "OK", onPress: async () => closeModal(false) }
            ]
        );
    }

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.horizontal}>
                        <View style={styles.vertical}>
                            <Text style={styles.textTitle}>Description: </Text>
                            <View style={styles.inputField}>
                                <TextInput
                                    ref={inputRef}
                                    placeholder=""
                                    placeholderTextColor="#808080"
                                    style={styles.input}
                                    onChangeText={e => {
                                        setDescription(e);
                                    }}
                                    value={description}
                                />
                            </View>
                            {isUpdate &&
                                (
                                    <>
                                        <Text style={styles.textTitle}>Status: </Text>
                                        <View style={styles.checkBoxRow}>
                                            <BouncyCheckbox
                                                size={25}
                                                isChecked={status.todo}
                                                text="Todo"
                                                disabled={!isUpdate}
                                                disableBuiltInState
                                                onPress={() => setStatus({ ...status, todo: true, completed: false })}
                                            />

                                            <BouncyCheckbox
                                                size={25}
                                                fillColor="green"
                                                iconStyle={{ borderColor: "green" }}
                                                isChecked={status.completed}
                                                text="Completed"
                                                disabled={!isUpdate}
                                                disableBuiltInState
                                                onPress={() => setStatus({ ...status, completed: true, todo: false })}
                                            />
                                        </View>
                                    </>
                                )}
                        </View>

                    </View>
                    <View style={styles.btnGroup}>
                        {isUpdate ?
                            (
                                <TouchableHighlight
                                    onPress={() => updateToDoFunc()}
                                    underlayColor="none">
                                    <View
                                        style={styles.button}>
                                        <Text style={styles.textStyle}>Update</Text>
                                    </View>
                                </TouchableHighlight>
                            ) :
                            (
                                <TouchableHighlight
                                    onPress={() => addToDoFunc()}
                                    underlayColor="none">
                                    <View
                                        style={styles.button}>
                                        <Text style={styles.textStyle}>Add</Text>
                                    </View>
                                </TouchableHighlight>
                            )}
                        <TouchableHighlight
                            onPress={() => closeModal(false)}
                            underlayColor="none">
                            <View
                                style={[styles.button, { backgroundColor: "red" }]}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </Modal >
    )
}

//styles
const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: "95%",
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    checkBoxRow: {
        width: '95%',
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    inputField: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        lineHeight: 20,
        height: 40,
        borderBottomWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        color: 'black',
        backgroundColor: '#FFF',
        borderColor: '#CBCBD4',
        fontSize: 14,
        fontWeight: '600',
    },
    btnGroup: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-evenly'
    },
    button: {
        width: 100,
        height: 40,
        backgroundColor: "#52007a",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15
    },
    textStyle: {
        color: "white",
        fontSize: 18,
    },

    textTitle: {
        marginBottom: 15,
        fontSize: 18,
        fontWeight: "bold"
    },
    text: {
        fontSize: 18,
        fontWeight: "normal"
    },
    vertical: {
        flexDirection: "column",
        width: '100%',
        marginBottom: 20
    },
    horizontal: {
        flexDirection: "row",
        alignItems: "flex-start"
    }
})

export default AddToDo;
