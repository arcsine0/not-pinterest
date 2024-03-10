import { Stack } from "expo-router";

export default function Register() {
    return ( 
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="Pass" options={{ headerShown: false }} />
        </Stack>
     )
}