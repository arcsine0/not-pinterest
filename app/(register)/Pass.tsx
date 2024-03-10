import React, { useState } from "react";

import { View, Text, TextInput, Button, Pressable } from "react-native";
import { Link, router } from "expo-router";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../firebase/config";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Pass() {
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const handleSubmit = async () => {
        // await createUserWithEmailAndPassword(auth, )
    };
    
    return (
        <View className="flex flex-col w-screen h-screen justify-start items-center gap-5">
            <View className="flex flex-col w-full mt-44 px-5 gap-5">
                <Text className="mb-2 text-5xl dark:text-white font-bold">Account Setup</Text>
                <View className="flex flex-col w-full gap-2">
                    <Text className="text-md dark:text-white">Password</Text>
                    <TextInput
                        className="px-5 py-2 w-full dark:text-white border-2 dark:border-white rounded-md"
                        placeholder="Enter your password"
                        placeholderTextColor="#AAA"
                        onChangeText={(e) => setPass(e)}
                        defaultValue={pass}
                    />
                </View>
                <View className="flex flex-col w-full gap-2">
                    <Text className="text-md dark:text-white">Confirm Password</Text>
                    <TextInput
                        className="px-5 py-2 w-full dark:text-white border-2 dark:border-white rounded-md"
                        placeholder="Make sure that this is equal to password"
                        placeholderTextColor="#AAA"
                        onChangeText={(e) => setConfirmPass(e)}
                        defaultValue={confirmPass}
                    />
                </View>
                <View className="flex w-full gap-2">
                    <View className="flex w-full py-2 bg-indigo-500 rounded-md items-center">
                        <Pressable onPress={handleSubmit}>
                            <Text className="text-lg text-white font-semibold">Create Account</Text>
                        </Pressable>
                    </View>
                </View>
                <Link push href={"/(register)"} className="text-lg text-blue-500">Go Back</Link>
            </View>

        </View>
    )
}