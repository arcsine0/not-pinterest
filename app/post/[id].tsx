import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { FontAwesome5 } from "@expo/vector-icons";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

import AsyncStorage from "@react-native-async-storage/async-storage";

import CollectionModal from "../../components/CollectionModal";

export default function Post() {
    const [photo, setPhoto] = useState<Photo>();
    const [user, setUser] = useState<User>();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [collectionNames, setCollectionNames] = useState<string[]>([]);

    const params = useLocalSearchParams();
    const { id } = params;

    type Photo = {
        id: string;
        [key: string]: any;
    };

    type User = {
        id: string;
        [key: string]: any;
    }


    const getPhoto = async () => {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/${id}?client_id=jpWz1czVc9VObwHMBIWVNgCnPbcZb_xvqmb4Fc-ntl8`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    }

    const getUser = async (uname: string) => {
        try {
            const response = await fetch(`https://api.unsplash.com/users/${uname}?client_id=jpWz1czVc9VObwHMBIWVNgCnPbcZb_xvqmb4Fc-ntl8`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddToCollection = () => {
        setIsModalVisible(true);
    }

    const handleCloseModal = () => {
        setIsModalVisible(false);
    }

    useEffect(() => {
        setCollectionNames([]);

        const getData = async () => {
            const dataStr = await AsyncStorage.getItem("data");
            if (dataStr) {
                const data = JSON.parse(dataStr);

                getDocs(collection(db, "Accounts", data.id, "Collections"))
                    .then((sn) => {
                        sn.docs.forEach((doc) => {
                            setCollectionNames(prev => [...prev, doc.id]);
                        });
                    })

                getPhoto().then((ph: Photo) => {
                    setPhoto(ph);
                    getUser(ph.username).then((us: User) => {
                        setUser(us);
                    })
                })
            }
        }
        getData();
        
    }, []);

    return (
        <ScrollView
            className="flex flex-col w-screen grow"
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View className="flex w-full mb-2 justify-center items-center">
                {photo ?
                    <Image
                        source={{ uri: photo.urls.full }}
                        className="w-full aspect-square"
                    /> :
                    <Text className="text-sm dark:text-white">Image Loading...</Text>
                }
            </View>
            <View className="flex flex-col w-full mb-2 p-2 border-2 dark:border-white rounded-md">
                {photo ?
                    <View>
                        <Text className="text-3xl font-semibold dark:text-white">
                            {photo.description ? photo.description : "No Title"}
                        </Text>
                        <Pressable 
                            className="flex w-full py-2 bg-indigo-500 active:opacity-50 rounded-md items-center"
                            onPress={handleAddToCollection}
                        >
                            <Text className="text-lg text-white font-semibold">Add to Collection</Text>
                        </Pressable>
                    </View>
                    : <></>}
            </View>
            <View className="flex flex-row p-2 border-2 items-center dark:border-white rounded-md">
                {user ?
                    <View className="flex flex-row items-center gap-2">
                        <Image
                            source={{ uri: user.profile_image.small }}
                            className="w-10 aspect-square rounded-full"
                        />
                        <View className="flex flex-col gap-1">
                            <Text className="text-md font-semibold dark:text-white">{user.name}</Text>
                            <View className="flex flex-row items-center gap-1">
                                <FontAwesome5 name="user" size={12} color="white" />
                                <Text className="text-sm dark:text-white">{user.followers_count}</Text>
                            </View>
                        </View>
                    </View>
                    : <></>}
            </View>
            {photo ?
                <CollectionModal isVisible={isModalVisible} onClose={handleCloseModal} data={photo} collections={collectionNames} />
            : <></>}
        </ScrollView>
    );
}
