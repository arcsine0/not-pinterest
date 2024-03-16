import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, Link, router } from "expo-router";

import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Collection() {
    const [accountID, setAccountID] = useState("");

    const [coll, setColl] = useState<Pic[]>([]);
    const [deleteList, setDeleteList] = useState<string[]>([]);

    const [showMultiSelect, setShowMultiSelect] = useState(false);

    const params = useLocalSearchParams();
    const { name } = params;

    const collectionName: string = name ? name.toString() : "Liked";

    type Pic = {
        id: string;
        url: string;
        isSelected: boolean;
    }

    useEffect(() => {
        setColl([]);

        const getData = async () => {
            const dataStr = await AsyncStorage.getItem("data");
            if (dataStr) {
                const data = JSON.parse(dataStr);
                setAccountID(data.id);

                getDocs(collection(db, "Accounts", data.id, collectionName))
                    .then((sn) => {
                        sn.docs.forEach((dc) => {
                            const pic = {
                                id: dc.id,
                                url: dc.data().url,
                                isSelected: false
                            }
                            setColl((prev) => [...prev, pic])
                        });
                    });
            }
        }
        getData();
    }, []);

    useEffect(() => {
        let temp = [...coll];

        temp.forEach((c) => {
            if (deleteList.includes(c.id)) {
                c.isSelected = true;
            } else {
                c.isSelected = false;
            }
        })

        setColl(temp);
    }, [deleteList]);

    const handleDelete = () => {
        deleteList.forEach(async (pic) => {
            await deleteDoc(doc(db, "Accounts", accountID, collectionName, pic))
                .then(() => {
                    setColl(coll.filter(cl => cl.id !== pic));
                });
        })
    }

    const hideMultiSelect = () => {
        setDeleteList([]);
        setShowMultiSelect(false);
    }

    const handleMultiSelect = async (id: string) => {
        setShowMultiSelect(true);
        setDeleteList(prev => [...prev, id]);
    }

    const handlePress = async (id: string) => {
        if (showMultiSelect === false) {
            router.push(`/post/${id}`)
        } else {
            if (!deleteList.includes(id)) {
                setDeleteList(prev => [...prev, id]);
            } else {
                const temp = deleteList.filter(post => post !== id);
                setDeleteList(temp);
            }
        }
    }

    return (
        <View className="w-screen h-screen p-5">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex flex-row flex-wrap w-full">
                    {coll.map((pic, i) => (
                        <View key={i} className="basis-1/2" style={{ borderWidth: pic.isSelected ? 4 : 2, borderColor: pic.isSelected ? "#ff4d4d" : "#000" }}>
                            <Pressable
                                onLongPress={() => handleMultiSelect(pic.id)}
                                onPress={() => handlePress(pic.id)}
                                className="w-full"
                            >
                                <Image
                                    source={{ uri: pic.url }}
                                    className="w-full aspect-square"
                                />
                            </Pressable>
                        </View>
                    ))}
                </View>
            </ScrollView>
            {showMultiSelect ?
                <View className="absolute w-full z-10 bottom-32 flex flex-row gap-2 justify-center items-center">
                    <Pressable
                        className="flex px-5 py-2 bg-red-500 active:opacity-50 rounded-md items-center"
                        onPress={() => handleDelete()}
                    >
                        <Text className="text-lg text-white font-semibold">Delete</Text>
                    </Pressable>
                    <Pressable
                        className="flex px-5 py-2 bg-gray-500 active:opacity-50 rounded-md items-center"
                        onPress={() => hideMultiSelect()}
                    >
                        <Text className="text-lg text-white font-semibold">Cancel</Text>
                    </Pressable>
                </View>
                : <></>}
        </View>
    )
}