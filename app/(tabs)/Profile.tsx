import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";

import { SvgUri } from "react-native-svg";

import { SimpleGrid } from "react-native-super-grid";

import CollectionCard from "@/components/CollectionCard";

import { doc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

type Thumbnail = {
	name: string;
	url: string;
}

export default function Profile() {
	const [collectionThumbs, setCollectionThumbs] = useState<Thumbnail[]>([]);

	const defaultThumb = "https://images.unsplash.com/photo-1709833226150-8eaeb6f291d1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

	useEffect(() => {
		getDocs(collection(db, "Liked"))
			.then((sn) => {
				const thumb: Thumbnail = {
					name: "Liked",
					url: sn.docs[0].data().url
				}

				setCollectionThumbs(prev => [...prev, thumb]);
			});
	}, []);

	return (
		<View className="w-screen h-screen p-5">
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View>
					<View className="w-full mt-20"></View>
					<View className="flex flex-col w-full gap-2 items-center">
						<SvgUri
							uri="https://source.boringavatars.com/beam/"
							className="w-1/3"
						/>
						<Text className="text-3xl mt-5 dark:text-white font-bold">ProfileName</Text>
						<Text className="text-lg dark:text-white">@username</Text>
					</View>
					<View className="flex flex-col w-full mt-20 gap-2">
						<Text className="text-3xl dark:text-white font-bold">Collections</Text>
						<View className="flex flex-row flex-wrap gap-1">
							<CollectionCard
								name="Liked Posts"
								thumb={collectionThumbs.find(cT => cT.name === "Liked")?.url || defaultThumb}
							/>
							<CollectionCard
								name="Liked Posts"
								thumb={collectionThumbs.find(cT => cT.name === "Liked")?.url || defaultThumb}
							/>
						</View>
					</View>
				</View>
			</ScrollView>

		</View>
	);
}

