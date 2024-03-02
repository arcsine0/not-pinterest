import React, { useState, useEffect } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Post() {
    const [photo, setPhoto] = useState<Photo>();

    const params = useLocalSearchParams();
    const { id } = params;

    type Photo = {
        id: string;
        [key: string]: any;
    };

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

    useEffect(() => {
        getPhoto().then((results: Photo) => {
            setPhoto(results);
        })
    }, []);

    return (
        <ScrollView className="flex flex-col w-screen h-screen">
            <View className="flex w-screen h-3/4 mb-5 justify-center items-center">
                {photo ? 
                <Image
                    source={{ uri: photo.urls.full }}
                    className="w-screen aspect-square"
                /> :
                <Text className="text-sm dark:text-white">Image Loading...</Text>
                }
            </View>
            <View className="flex flex-col w-full p-2 border-2 dark:border-white rounded-md">
                {photo ?
                    <View>
                        <Text className="text-3xl font-semibold dark:text-white">{photo.description}</Text>
                        <Text className="text-lg dark:text-white">{photo.created_at}</Text>
                    </View>
                : <></>}
            </View>
        </ScrollView>
    );
}
