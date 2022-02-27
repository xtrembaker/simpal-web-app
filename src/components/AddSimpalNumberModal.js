import {View, StyleSheet, Modal, Text, TextInput} from "react-native";
import {useEffect, useState} from "react";
import {getSimpalPhoneNumber, setSimpalPhoneNumber} from "../services/simpalPhoneNumber";

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16
    },
    inputText: {
        fontSize: 20,
        padding: 5,
        marginBottom: 20,
        width: 200,
        borderColor: "#000000",
        borderWidth: 1
    }
});

export default function AddSimpalNumberModal(){
    const [modalVisible, setModalVisible] = useState(true);
    useEffect(() => {
        getSimpalPhoneNumber().then((value) => {
            setModalVisible(value === null);
        })
    }, []);
    const onSetSimpalPhoneNumber = async (number) => {
        return setSimpalPhoneNumber(number).then(() => {
            console.log('setSimpalPhoneNumber', number);
            setModalVisible(false);
        });
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="none"
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Quel est le numéro de l’appareil Simpal ?</Text>
                        <TextInput
                            placeholder=""
                            placeholderTextColor="#000000"
                            keyboardType="numeric"
                            returnKeyType="done"
                            onEndEditing={({nativeEvent: {text}}) => onSetSimpalPhoneNumber(text)}
                            clearTextOnFocus={true}
                            style={styles.inputText}
                            autoCorrect={false}
                            maxLength={10}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}