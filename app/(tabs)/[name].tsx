import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { FontAwesome5 } from "@expo/vector-icons";

export default function Collection() {
    const [coll, setColl] = useState([]);

    const params = useLocalSearchParams();
    const { name } = params;

    const collectionName = name ? name : "Liked";

    useEffect(() => {
        const getData = async () => {
			const dataStr = await AsyncStorage.getItem("data");
			if (dataStr) {
				const data = JSON.parse(dataStr);
				
                
			}
		}
		getData();
    }, []);

    return (
        <View className="w-screen h-screen p-5">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

            </ScrollView>
        </View>
    )
}