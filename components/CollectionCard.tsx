import { Text, View, Image, Pressable } from "react-native";
import { Link } from "expo-router";

export default function(props: {
    name: string;
    thumb: string;
}) {
    return (
        <View className="flex flex-col h-1/2 gap-2">
            <Image 
                source={{ uri: props.thumb }}
                className="w-1/2 h-2/3 border-2 dark:border-white rounded-md"
            />
            <Text className="h-1/3 text-lg dark:text-white font-semibold">{props.name}</Text>
        </View>
    )
};