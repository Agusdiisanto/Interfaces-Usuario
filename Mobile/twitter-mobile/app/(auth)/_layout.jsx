import { Stack} from "expo-router";

export default function AuthLayout(){
    return (
        <Stack > 
        <Stack.Screen 
                name = 'Verification'
                options={{
                    headerStyle: {
                        backgroundColor: 'black',
                    },
                    headerTitleStyle: {
                        color: 'white',
                        fontFamily: 'System',
                        fontSize: 22,
                        fontWeight: "bold",
                    },
                }}
            />
            <Stack.Screen
                name = 'Register'
                options={{
                    headerStyle: {
                        backgroundColor: 'black',
                    },
                    headerTitleStyle: {
                        color: 'white',
                        fontFamily: 'System',
                        fontSize: 22,
                        fontWeight: "bold",
                    },
                }}
            />
        </Stack>
    
    );
}