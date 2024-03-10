import React, { useState } from "react";

import { View, Text, TextInput, Button, Pressable } from "react-native";
import { Link, router } from "expo-router";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db, auth } from "../firebase/config";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleDefaultLogin = async () => {
        if (pass.length > 0) {
            try {
                await signInWithEmailAndPassword(auth, email, pass)
                    .then(async (cred) => {
                        const user = cred.user

                        await AsyncStorage.setItem("id", user.uid);

                        await getDoc(doc(db, "Accounts", user.uid))
                            .then(async (sn) => {
                                try {
                                    await AsyncStorage.setItem("displayName", sn.data()?.displayName);
                                    await AsyncStorage.setItem("userName", sn.data()?.userName);

                                    router.replace("/(tabs)");
                                } catch (error) {
                                    console.log(error);
                                }
                            })
                    })

            } catch (error) {
                console.log(error);
            }
        }
    };

    // const handleGoogleLogin = async () => {
    //     try {
    //         const provider = new GoogleAuthProvider();
    //         await signInWithPopup(auth, provider) 
    //             .then(async (res) => {
    //                 const user = res.user;
    //                 console.log(user.uid);
    //             })
    //     } catch(error) {
    //         console.log(error);
    //     }
    // }

    return (
        <View className="flex flex-col w-screen h-screen justify-center items-center gap-5">
            <View className="flex flex-col w-full px-5 gap-5">
                <Text className="mb-5 text-5xl dark:text-white font-bold">Not-Pinterest</Text>
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
                    <Text className="text-md dark:text-white">Password</Text>
                    <TextInput
                        className="px-5 py-2 w-full dark:text-white border-2 dark:border-white rounded-md"
                        placeholder="Enter your password"
                        placeholderTextColor="#AAA"
                        onChangeText={(e) => setPass(e)}
                        defaultValue={pass}
                    />
                </View>
                <View className="flex w-full py-2 bg-indigo-500 rounded-md items-center">
                    <Pressable onPress={handleDefaultLogin}>
                        <Text className="text-lg text-white font-semibold">Log In</Text>
                    </Pressable>
                </View>
                <Text className="text-lg dark:text-gray-400">No Account Yet?</Text>
                <Link push href={"/Register"} className="text-lg text-blue-500">Create an Account</Link>
                {/* <View className="flex w-full py-2 bg-white rounded-md items-center">
                    <Pressable onPress={handleGoogleLogin}>
                        <Text className="text-lg text-black font-semibold">Log In with Google</Text>
                    </Pressable>
                </View> */}
            </View>

        </View>
    )
}