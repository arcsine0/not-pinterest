import React, { useState } from "react";
import { Text, View } from 'react-native';

export default function Post(props: {
    name: string;
    author: string;
}) {
    return (
        <View className="flex flex-col w-full border-2 dark:border-white rounded-md">
            <View className="flex flex-row w-full p-2">
                <Text className="dark:text-white text-sm font-semibold">{props.name}</Text>
            </View>
        </View>
    )
}