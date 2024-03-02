import React, { useState, useEffect } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { FontAwesome5 } from '@expo/vector-icons';

import Tag from '@/components/Tag';

export default function Post() {
    const [photo, setPhoto] = useState<Photo>();
    const [user, setUser] = useState<User>();

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

    type Tag = {
        title: string;
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

    useEffect(() => {
        getPhoto().then((ph: Photo) => {
            setPhoto(ph);
            getUser(ph.username).then((us: User) => {
                setUser(us);
            })
        })
    }, []);

    return (
        <ScrollView className="flex flex-col w-screen grow">
            <View className="flex w-screen h-3/4 mb-2 justify-center items-center">
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
                        <Text className="text-lg dark:text-white">{photo.created_at}</Text>
                        <View className="flex flex-row gap-2 flex-wrap">
                            {photo.tags.forEach((tag: Tag) => (
                                <Tag title={tag.title} />
                            ))}
                        </View>
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
        </ScrollView>
    );
}
