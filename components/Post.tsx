import React, { useState } from "react";
import { Text, View, Image } from 'react-native';

export default function Post(props: {
    name: string;
    author: string;
    pfp: string;
    desc: string;
    url: string;
}) {
    return (
        <View className="flex flex-col w-full gap-2 p-2 mb-5 border-2 dark:border-white rounded-md">
            <View className="flex flex-row w-full items-center gap-1">
                <Image
                    source={{ uri: props.pfp }}
                    className="w-5 aspect-square rounded-full"
                />
                <Text className="dark:text-white text-md font-semibold">{props.author}</Text>
            </View>
            <View className="flex w-500px h-500px justify-center items-center border-2 dark:border-white rounded-md">
                <Image
                    source={{ uri: props.url }}
                    className="w-full aspect-square"
                />
            </View>
            <View className="flex flex-row w-full">
                <Text className="dark:text-white text-sm font-semibold line-clamp-1">{props.name}</Text>
            </View>
        </View>
    )
}