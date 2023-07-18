import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout(){
    return(
        <AuthProvider>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name = 'Tweet/[tweetId]'
                 options={{
                        title:'Tweet', 
                        headerShown: true , 
                        headerStyle: {
                            backgroundColor: 'black',
                        }, 
                        headerTitleStyle: {
                            color: "white",
                            fontFamily: "System",
                            fontSize: 22,
                            fontWeight: "bold",
                        }
                    }}/>
                <Stack.Screen name = 'User/[userId]' 
                    options={{
                        title:'Profile', 
                        headerShown: true, 
                        headerStyle: {
                            backgroundColor: 'black',
                        }, 
                        headerTitleStyle: {
                            color: "white",
                            fontFamily: "System",
                            fontSize: 22,
                            fontWeight: "bold",
                        }
                    }}
                />
                <Stack.Screen name = 'Mantenimiento'/>
            </Stack>
        </AuthProvider>
    )
}