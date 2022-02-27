import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Storage() {
    return {
        async getItem(key) {
            return JSON.parse(await AsyncStorage.getItem(key));
        },

        async setItem(key, value) {
            return AsyncStorage.setItem(key, JSON.stringify(value));
        },
        async removeItem(key) {
            return AsyncStorage.removeItem(key);
        },
        async reset(){
            return AsyncStorage.clear();
        }
    }
}