import {View, StyleSheet, TextInput, Button} from "react-native";
import {CANCELLED_STATE, sendSMS} from "../services/sendSMS";
import {
    createMessageAddFamilyNumber,
    createMessageDeleteFamilyNumber,
} from "../services/message";
import SwitchFamilyNumberAlert from "../components/SwitchFamilyNumberAlert";
import {useEffect, useState} from "react";
import localStorage from "../services/localStorage";

const styles = StyleSheet.create({
    input: {
        borderColor: "#007AFF",
        borderWidth: 1,
        borderStyle: "dashed",
        fontSize: 20,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 25,
    }
});

const STORAGE_KEY = 'familyNumbers';

export default function FamilyNumbersPage(){
    const [familyNumbers, setFamilyNumbers] = useState([]);
    const phoneNumberInputs = [
        {
            id: "15256287-612a-442a-b8b0-8fad08d0c0f1",
            placeholder: "Numéro 1"
        },
        {
            id: "d4bc4119-b468-48b2-b5c0-4624373a6507",
            placeholder: "Numéro 2"
        },
        {
            id: "807f950c-6d66-45ea-8e6e-785e5e5dada6",
            placeholder: "Numéro 3"
        },
        {
            id: "075c7be0-7cb6-404f-935d-4fa521005574",
            placeholder: "Numéro 4"
        }];

    useEffect(() => {
        localStorage().getItem(STORAGE_KEY).then((value) => {
            if(value === null){
                return
            }
            setFamilyNumbers(value);
        })
    }, [])

    const onSubmitPhoneNumber = async(id, number) =>
    {
        return sendSMS(createMessageAddFamilyNumber(number)).then((response) => {
            if(response.result === CANCELLED_STATE) {
                return;
            }
            const newValue = [...familyNumbers, {id, number}];
            return localStorage().setItem(STORAGE_KEY, newValue).then(() => {
                setFamilyNumbers(newValue);
            })
        });
    }

    const onRemovePhoneNumber = (id) => {
        const number = findNumberInCollectionById(id)
        if(!number){
            return;
        }
        return sendSMS(createMessageDeleteFamilyNumber(number)).then(response => {
            if(response.result === CANCELLED_STATE){
                return;
            }
            const newValue = familyNumbers.filter((item) => item.id !== id);
            localStorage().setItem(STORAGE_KEY, newValue).then(() => {
                setFamilyNumbers(newValue);
            })
        })
    }

    const findNumberInCollectionById = (id) => {
        const found = familyNumbers.find((item) => item.id === id)
        if(!found){
            return null;
        }
        return found.number;
    }

    return (
        <View>
            <SwitchFamilyNumberAlert />
            {phoneNumberInputs.map(({id, placeholder}) => {
                return (
                    <View key={id}>
                        <TextInput
                            style={styles.input}
                            defaultValue={findNumberInCollectionById(id)}
                            placeholder={placeholder}
                            keyboardType="phone-pad"
                            returnKeyType="done"
                            onSubmitEditing={({nativeEvent: {text}}) => onSubmitPhoneNumber(id, text)}
                        />
                        <Button title="Supprimer" onPress={() => onRemovePhoneNumber(id)}></Button>
                    </View>)
            })}
        </View>
    );
};