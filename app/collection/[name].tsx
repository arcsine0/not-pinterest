import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { FontAwesome5 } from "@expo/vector-icons";

export default function Collection() {
    const [coll, setColl] = useState<Pic[]>([]);

    const params = useLocalSearchParams();
    const { name } = params;

    const collectionName: string = name ? name.toString() : "Liked";

    type Pic = {
        id: string;
        url: string;
    }

    useEffect(() => {
        setColl([]);

        const getData = async () => {
            const dataStr = await AsyncStorage.getItem("data");
            if (dataStr) {
                const data = JSON.parse(dataStr);

                getDocs(collection(db, "Accounts", data.id, collectionName))
                    .then((sn) => {
                        sn.docs.forEach((doc) => {
                            const pic = {
                                id: doc.id,
                                url: doc.data().url
                            }
                            setColl((prev) => [...prev, pic])
                        });
                    });
            }
        }
        getData();
    }, []);

    return (
        <View className="w-screen h-screen p-5">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex flex-row flex-wrap w-full">
                    {coll.map((pic, i) => (
                        <View key={i} className="basis-1/2 border-2 dark:border-black">
                            <Image
                                source={{ uri: pic.url }}
                                className="w-full aspect-square"
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}