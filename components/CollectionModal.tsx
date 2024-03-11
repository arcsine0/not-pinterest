import React, { useState } from "react";
import { Modal, Text, View, TextInput, Pressable } from "react-native";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

import { BlurView } from "expo-blur";
import { Picker } from "@react-native-picker/picker";

import AsyncStorage from "@react-native-async-storage/async-storage";

type Photo = {
    id: string;
    [key: string]: any;
};

export default function CollectionModal(props: { isVisible: boolean; onClose: Function, data: Photo, collections: string[] }) {
    const [selectedCollection, setSelectedCollection] = useState("New");
    const [collectionName, setCollectionName] = useState("");

    const handleSaveToCollection = async () => {
        const dataStr = await AsyncStorage.getItem("data");
        if (dataStr) {
            const user = JSON.parse(dataStr);
            if (selectedCollection === "New") {
                setDoc(doc(db, "Accounts", user.id, "Collections", collectionName), {})
                    .then(() => {
                        setDoc(doc(db, "Accounts", user.id, collectionName, props.data.id), {
                            url: props.data.urls.regular
                        }).then(() => {
                            props.onClose();
                        });
                    });
            } else {
                setDoc(doc(db, "Accounts", user.id, selectedCollection, props.data.id), {
                    url: props.data.urls.regular
                }).then(() => {
                    props.onClose();
                });
            }
        }
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isVisible}
        >
            <BlurView intensity={100} tint="dark" className="w-screen h-screen justify-center items-center">
                <View className="flex flex-col w-2/3 p-5 gap-5 justify-center items-start dark:bg-gray-950 rounded-lg shadow-lg">
                    <Text className="text-2xl font-semibold dark:text-white">Add to Collection</Text>
                    <Picker
                        style={{ width: "100%", backgroundColor: "#0F172A" }}
                        dropdownIconColor={"#FFF"}
                        selectedValue={selectedCollection}
                        onValueChange={(item) => setSelectedCollection(item)}
                        mode="dropdown"
                    >
                        <Picker.Item label="New Collection" value="New" style={{ backgroundColor: "#0F172A", color: "#FFF" }} />
                        <Picker.Item label="Liked" value="Liked" style={{ backgroundColor: "#0F172A", color: "#FFF" }} />
                        {props.collections.map((coll, i) => (
                            <Picker.Item key={i} label={coll} value={coll} style={{ backgroundColor: "#0F172A", color: "#FFF" }} />
                        ))}
                    </Picker>
                    {selectedCollection === "New" ?
                        <TextInput
                            className="px-5 py-2 w-full dark:text-white border-2 dark:border-white rounded-md"
                            placeholder="collection name"
                            placeholderTextColor="#AAA"
                            onChangeText={(e) => setCollectionName(e)}
                            defaultValue={collectionName}
                        />
                        : <></>}
                    <Pressable
                        className="flex w-full py-2 bg-indigo-500 active:opacity-50 rounded-md items-center"
                        onPress={handleSaveToCollection}
                    >
                        <Text className="text-lg text-white font-semibold">Save</Text>
                    </Pressable>
                </View>
            </BlurView>
        </Modal>
    )
}