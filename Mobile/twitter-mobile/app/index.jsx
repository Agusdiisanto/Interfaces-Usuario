import { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index(){

    const router = useRouter()

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem("Authorization");
            if (!token) {
                router.replace('Verification')
            } else{
                router.replace('Home')
            }
        };
        checkToken();
    }, []);
}