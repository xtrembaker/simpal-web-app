import React from 'react';
import { StyleSheet, Button } from 'react-native';
import HomePage from "./src/pages/HomePage";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsPage from "./src/pages/SettingsPage";
import FamilyNumbersPage from "./src/pages/FamilyNumbersPage";
import InternalProbePage from "./src/pages/InternalProbePage";
import ExternalProbePage from "./src/pages/ExternalProbePage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
                  name="Home"
                  component={HomePage}
                  options={({navigation}) => ({
                      title: 'Simpal T2',
                      headerRight: () => (
                          <Button title="Paramètres" onPress={() => navigation.navigate('Settings')}/>
                      )
                  })}
              />
              <Stack.Screen name="Settings" title="Paramètres" component={SettingsPage} />
              <Stack.Screen name="FamilyNumbersPage" title="Liste des numéros famille" component={FamilyNumbersPage} />
              <Stack.Screen name="InternalProbePage" title="Sonde interne" component={InternalProbePage} />
              <Stack.Screen name="ExternalProbePage" title="Sonde externe" component={ExternalProbePage} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
