import React, { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";

import { router } from "expo-router";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {
    const handleLogout = () => {
        signOut(auth).then(async () => {
            await AsyncStorage.removeItem("data");

            router.replace("/Login");
        });
    };

    return (
        <View className="flex flex-col w-screen h-screen p-5 justify-center items-end">
            <View className="flex w-full py-2 bg-red-500 rounded-md items-center">
                <Pressable onPress={handleLogout}>
                    <Text className="text-lg text-white font-semibold">Logout</Text>
                </Pressable>
            </View>
        </View>
    )
}