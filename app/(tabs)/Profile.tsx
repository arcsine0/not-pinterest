import { Text, View } from 'react-native';

export default function TabTwoScreen() {
	return (
		<View className="flex flex-col w-screen h-screen p-2 justify-start gap-2 items-start">
			<View className="flex flex-row w-full p-2 gap-2">
				<Text>ProfilePic</Text>
				<Text className="text-3xl dark:text-white font-bold">ProfileName</Text>
			</View>
		</View>
	);
}

