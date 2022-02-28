import {TextInput} from "react-native";

export default function PasswordInput(props){
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
                width: 250,
            }}
            placeholderTextColor={"#C7C7CD"}
            placeholder={props.placeholder}
            keyboardType="phone-pad"
            maxLength={4}
            returnKeyType="done"
            onEndEditing={props.onEndEditing}
        />
    );
}