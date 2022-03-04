import {Animated, Button, Text, View} from "react-native";
import {useEffect, useRef} from "react";
import {getSimpalPhoneNumber} from "../services/simpalPhoneNumber";

export default function AppReady({visible}) {
    const fadeAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 7000,
            useNativeDriver: true
        }).start();
    })
    return (
        <View style={{borderWidth: 0, borderColor: "red", position: "absolute", bottom: 30, width: "100%"}}>
            <Animated.View style={{
                opacity: fadeAnim,
                borderWidth: 0,
                borderColor: "grey",
                borderRadius: 50,
                height: 100,
                padding: 10,
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto"
            }}>
                <Text style={{fontSize: 30, textAlign: "center", marginTop: "auto", marginBottom: "auto"}}>✅</Text>
                <Text style={{fontSize: 20, textAlign: "center", marginTop: "auto", marginBottom: "auto"}}>L’application est prête !</Text>
            </Animated.View>
        </View>
    );
}