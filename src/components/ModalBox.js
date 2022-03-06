import {StyleSheet, Modal, View} from "react-native";

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        borderWidth: 0,
        borderColor: "red"
    },
    modalView: {
        borderWidth: 0,
        borderColor: "green",
        flex: 1,
        justifyContent: "center",
        borderRadius: 20,
        padding: 4,
        alignItems: "center",
    }
});

export default function ModalBox({children, visible}){
    return (
        <Modal visible={visible} presentationStyle="overFullScreen">
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {children}
                </View>
            </View>
        </Modal>
    );
}