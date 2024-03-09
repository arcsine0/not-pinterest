import React, { useState } from "react";
import { Text, View, Image, Pressable } from 'react-native';
import { Link } from "expo-router";

import { AntDesign } from '@expo/vector-icons';

type likedPhoto = {
    id: string;
    isLiked: boolean;
}

export default function Post(props: {
    id: string;
    name: string;
    author: string;
    desc: string;
    date: string;
    pfp: string;
    url: string;
    likes: string;

    onLikeChange: (data: likedPhoto) => void;
}) {

    const [isLiked, setIsLiked] = useState(false);

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
    };

    const handleLiked = () => {
        setIsLiked(!isLiked);
        props.onLikeChange({ id: props.id, isLiked: !isLiked });
    };

    return (
        <View className="flex flex-col w-full gap-2 p-2 mb-5 border-2 dark:border-white rounded-md">
            <View className="flex flex-row w-full items-center gap-1">
                <Image
                    source={{ uri: props.pfp }}
                    className="w-5 aspect-square rounded-full"
                />
                <Text className="dark:text-white text-md font-semibold">{props.author}</Text>
            </View>
            <Link push href={{ pathname: "/post/[id]", params: { id: props.id } }} asChild>
                <Pressable>
                    <View className="flex w-500px h-500px justify-center items-center border-2 dark:border-white rounded-md">
                        <Image
                            source={{ uri: props.url }}
                            className="w-full aspect-square"
                        />
                    </View>
                </Pressable>
            </Link>
            <View className="flex flex-row w-full">
                <Text className="dark:text-white text-md font-semibold line-clamp-1">{props.name}</Text>
            </View>
            <View className="flex flex-row w-full gap-1">
                <Text className="shrink dark:text-slate-300 text-md font-normal line-clamp-1">{formatUploadTime(props.date)}</Text>
                <View className="grow" />
                <Pressable onPress={handleLiked}>
                    <View className="shrink flex flex-row gap-1 p-1 items-center border-2 dark:border-white rounded-md">
                        {isLiked ? <AntDesign name="heart" size={13} color="#ff4e47" /> : <AntDesign name="hearto" size={13} color="white" />}
                        <Text className="dark:text-white text-md font-normal line-clamp-1">{isLiked ? parseInt(props.likes, 10) + 1 : parseInt(props.likes, 10)}</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}