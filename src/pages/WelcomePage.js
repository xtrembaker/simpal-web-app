import Onboarding from 'react-native-onboarding-swiper';
import {Text, View, Button} from "react-native";
import PhoneNumberInput from "../components/PhoneNumberInput";
import {setSimpalPhoneNumber} from "../services/simpalPhoneNumber";
import {useState} from "react";
import {CANCELLED_STATE, sendSMS} from "../services/sendSMS";
import {createMessageDefineMaster, createMessageSwitchPassword} from "../services/message";
import PasswordInput from "../components/PasswordInput";
import mainStyle from "../styles/main";

export default function WelcomePage(props){
    const [showNext, setShowNext] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const onSetSimpalPhoneNumber = async (number) => {
        return setSimpalPhoneNumber(number).then(() => {
            setShowNext(true);
        });
    };
    const disableNext = () => {
        setShowNext(false);
    }
    const onMasterPhoneDefined = (value) => {
        if(value === 'yes'){
            return sendSMS(createMessageDefineMaster()).then((response) => {
                if(response.result === CANCELLED_STATE){
                    return;
                }
                setShowNext(true);
            });
        }
        props.onDone();
    }

    const onChangePassword = () => {
        return sendSMS(createMessageSwitchPassword(oldPassword, newPassword)).then((response) => {
            if(response.result === CANCELLED_STATE){
                return;
            }
            props.onDone();
        })
    };

    return (
        <Onboarding
            onDone={() => props.onDone}
            showDone={false}
            showSkip={false}
            showNext={showNext}
            flatlistProps={{scrollEnabled: false}}
            pageIndexCallback={() => disableNext()}
            pages={[
                {
                    image: (
                        <View>
                            <Text style={{textAlign: "center", fontSize: 35, marginBottom: 20}}>Bienvenue dans votre compagnon Simpal !</Text>
                            <Text style={{textAlign: "center", fontSize: 25, marginBottom: 0}}>Veuillez entrer le numéro de téléphone de l’appareil :</Text>
                            <PhoneNumberInput onSubmitEditing={({nativeEvent: {text}}) => onSetSimpalPhoneNumber(text)}/>
                        </View>
                    ),
                    title: '',
                    subtitle: '',
                    backgroundColor: '#FFF',
                },
                {
                    image: (<View>
                        <Text style={{fontSize: 25, textAlign: "center"}}>Définir ce téléphone comme{"\n"}étant le maitre ?</Text>
                        <View>
                            <Button title={"Oui"} onPress={() => onMasterPhoneDefined('yes')}/>
                            <Button title={"Non"} onPress={() => onMasterPhoneDefined('no')}/>
                        </View>
                    </View>),
                    title: '',
                    subtitle: '',
                    backgroundColor: '#FFF',
                },
                {
                    image: (<View>
                        <Text style={{fontSize: 25, textAlign: "center"}}>Définir un mot de passe{"\n"}pour l’appareil</Text>
                        <View>
                            <PasswordInput placeholder={"Ancien"} onEndEditing={({nativeEvent: {text}}) => {setOldPassword(text); }}/>
                            <PasswordInput placeholder={"Nouveau"} onEndEditing={({nativeEvent: {text}}) => {setNewPassword(text);}}/>
                            <Button title={"Valider"} onPress={onChangePassword}/>
                        </View>
                    </View>),
                    title: '',
                    subtitle: '',
                    backgroundColor: '#FFF',
                }
            ]}
            containerStyles={mainStyle.pageContainer}
        />
    );
}