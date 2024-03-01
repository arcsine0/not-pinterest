import React, { useState } from "react";
import { Text, View, Image } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

export default function Post(props: {
    name: string;
    author: string;
    pfp: string;
    desc: string;
    url: string;
    likes: string;
    date: string;
}) {

    const formatUploadTime = (uploadDateString: string): string => {
        const uploadDate = new Date(uploadDateString);
        const currentDate = new Date();

        const timeDifference = Math.abs(currentDate.getTime() - uploadDate.getTime());
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        if (hoursDifference > 0) {
            return `uploaded ${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
        } else {
            return `uploaded ${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
        }
    }

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
                <Text className="dark:text-white text-md font-semibold line-clamp-1">{props.name}</Text>
            </View>
            <View className="flex flex-row w-full gap-1">
                <Text className="shrink dark:text-slate-300 text-md font-normal line-clamp-1">{formatUploadTime(props.date)}</Text>
                <View className="grow" />
                <View className="shrink flex flex-row gap-1 p-1 items-center border-2 dark:border-white rounded-md">
                    <AntDesign name="hearto" size={13} color="white" />
                    <Text className="dark:text-white text-md font-normal line-clamp-1">{props.likes}</Text>
                </View>
            </View>
        </View>
    )
}