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

    const [submitLabel, setSubmitLabel] = useState("Submit");
    const [submitDisable, setSubmitDisable] = useState(false);

    const regex = /^(?=.*[a-zA-Z0-9])(?=.*[_\-#])[a-zA-Z0-9_\-#]+$/;

    const handleSubmit = async () => {
        setSubmitLabel("Submitting...");
        setSubmitDisable(true);

        const credsStr = await AsyncStorage.getItem("creds");
        if (credsStr !== null) {
            const creds = JSON.parse(credsStr);

            if (pass.length >= 6) {
                if (regex.test(pass)) {
                    if (pass === confirmPass) {
                        try {
                            creds.pass = pass;

                            createUserWithEmailAndPassword(auth, creds.email, creds.pass)
                                .then(async (cred) => {
                                    const user = cred.user;
                                    await setDoc(doc(db, "Accounts", user.uid), {
                                        displayName: creds.displayName,
                                        userName: creds.userName
                                    });

                                    await AsyncStorage.removeItem("creds");
                                    router.replace("/Login");
                                });
                        } catch (error) {
                            console.log(error);
                        }
                    } else { console.log("Confirm Password Mismatch") }
                } else { console.log("Password should contain symbols [_, -, #] and numbers") }
            } else { console.log("Password needs to be at least 6 characters long") }
        }

        setSubmitLabel("Submit");
        setSubmitDisable(false);
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
                        <Pressable disabled={submitDisable} onPress={handleSubmit}>
                            <Text className="text-lg text-white font-semibold">{submitLabel}</Text>
                        </Pressable>
                    </View>
                </View>
                <Link push href={"/(register)"} className="text-lg text-blue-500">Go Back</Link>
            </View>

        </View>
    )
}