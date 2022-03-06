import {TextInput} from "react-native";

export default function PhoneNumberInput(props){
    return (
        <TextInput
            style={{
                borderWidth: 2,
                borderColor: "#afafaf",
                borderRadius: 50,
                fontSize: 25,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 0,
                marginRight: "auto",
                marginLeft: "auto",
                textAlign: "center",
                marginTop: 20,
                width: 270,
            }}
            placeholder={"Numéro"}
            keyboardType="phone-pad"
            maxLength={10}
            returnKeyType="done"
            onSubmitEditing={props.onSubmitEditing}
        />
    )
}