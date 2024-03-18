import React, { useState } from "react";

import { View, Text, TextInput, Button, Pressable } from "react-native";
import { Link, router } from "expo-router";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../firebase/config";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
    const [email, setEmail] = useState("");

    const [displayName, setDisplayName] = useState("");
    const [userName, setUserName] = useState("");

    const [nextDisable, setNextDisable] = useState(false);

    const handleNext = async () => {
        setNextDisable(true);

        const creds = {
            email: email,
            displayName: displayName,
            userName: userName,
            pass: null
        }

        await AsyncStorage.setItem("creds", JSON.stringify(creds));

        setNextDisable(false);
        router.push("/(register)/Pass");
    };

    return (
        <View className="flex flex-col w-screen h-screen justify-start items-center gap-5">
            <View className="flex flex-col w-full mt-44 px-5 gap-5">
                <Text className="mb-2 text-5xl dark:text-white font-bold">Account Setup</Text>
                <View className="flex flex-col w-full gap-2">
                    <Text className="text-md dark:text-white">Email</Text>
                    <TextInput
                        className="px-5 py-2 w-full dark:text-white border-2 dark:border-white rounded-md"
                        placeholder="Enter your email"
                        placeholderTextColor="#AAA"
                        onChangeText={(e) => setEmail(e)}
                        defaultValue={email}
                    />
                </View>
                <View className="flex flex-col w-full gap-2">
                    <Text className="text-md dark:text-white">Display Name</Text>
                    <TextInput
                        className="px-5 py-2 w-full dark:text-white border-2 dark:border-white rounded-md"
                        placeholder="This will be the name in your profile"
                        placeholderTextColor="#AAA"
                        onChangeText={(e) => setDisplayName(e)}
                        defaultValue={displayName}
                    />
                </View>
                <View className="flex flex-col w-full gap-2">
                    <Text className="text-md dark:text-white">Username</Text>
                    <TextInput
                        className="px-5 py-2 w-full dark:text-white border-2 dark:border-white rounded-md"
                        placeholder="This will be your @tag"
                        placeholderTextColor="#AAA"
                        onChangeText={(e) => setUserName(e)}
                        defaultValue={userName}
                    />
                </View>
                <View className="flex w-full gap-2">
                    <Pressable 
                        className="flex w-full py-2 bg-indigo-500 rounded-md items-center" 
                        disabled={nextDisable} 
                        onPress={handleNext}
                    >
                        <Text className="text-lg text-white font-semibold">Next</Text>
                    </Pressable>
                </View>
                <Link push href={"/"} className="text-lg text-blue-500">Go Back</Link>
            </View>

        </View>
    )
}