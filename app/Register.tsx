import React, { useState } from "react";

import { View, Text, TextInput, Button } from "react-native";
import { Link, Stack } from "expo-router";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase/config";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
    return (
        <View className="flex w-screen h-screen justify-center items-center">
            <Link push href={"/Login"} className="text-lg text-blue-500">Create an Account</Link>
        </View>
    )
}