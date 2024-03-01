import React, { useState, useEffect } from "react";
import { Text, TextInput, View, ScrollView } from 'react-native';

import Post from "@/components/Post";

export default function TabOneScreen() {
	const [query, setQuery] = useState("");

	return (
		<View className="flex flex-col w-screen h-screen px-3 py-10 gap-5 justify-start items-center">
			<TextInput
				className="px-5 py-2 w-full sticky mt-5 dark:text-white border-2 dark:border-white rounded-md"
				placeholder="Search for any pictures..."
				placeholderTextColor="#AAA"
				onChangeText={e => setQuery(e)}
				defaultValue={query}
			/>
			<ScrollView className="flex flex-col w-full gap-2">
				<Post name="test" author="test" />
			</ScrollView>
		</View>
	);
}

