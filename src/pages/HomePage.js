import { View, Button } from 'react-native';
import AppReady from "../components/AppReady";

export default function HomePage({route: {params}, navigation}) {
    return (
        <View style={{borderWidth: 0, borderColor: "green", height: "100%"}}>
            <Button title="Sonde interne" onPress={() => navigation.navigate('InternalProbePage')}/>
            <Button title="Sonde externe" onPress={() => navigation.navigate('ExternalProbePage')}/>
            <AppReady visible={params.appReady ? params.appReady : false}/>
        </View>
    )
}