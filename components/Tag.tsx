import { Text, View } from "react-native";

export default function Tag(props:{ title: string }) {
    return (
        <View className="flex px-2 py-1 justify-center items-start rounded-md dark:bg-slate-100">
            <Text className="text-sm font-semibold dark:text-white">{props.title}</Text>
        </View>
    )
}