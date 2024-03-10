import React, { useState } from "react";

import { View, Text, TextInput, Button } from "react-native";
import { router } from "expo-router";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase/config";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
    return (
        <View>

        </View>
    )
}