import { Text, View, Image, Pressable } from "react-native";
import { Stack, Link } from "expo-router";

export default function (props: {
    name: string;
    thumb: string;
}) {

    return (
        <View className="flex flex-col basis-1/2 h-60 gap-2 border-2 dark:border-black">
            <Stack.Screen
                options={{
                    title: props.name,
                    headerTitle: props.name
                }}
            />
            <Link
                className="w-full aspect-square"
                href={`/collection/${props.name}`}
                asChild
            >
                <Pressable className="w-full">
                    <Image
                        source={{ uri: props.thumb }}
                        className="w-full h-full border-2 dark:border-white rounded-md"
                    />
                    <Text className="h-1/3 text-lg dark:text-white font-semibold">{props.name}</Text>
                </Pressable>
            </Link>
        </View>
    )
};