import React, { useState, useEffect } from "react";
import { Text, TextInput, View, ScrollView } from 'react-native';

import Post from "@/components/Post";

export default function TabOneScreen() {
	const [query, setQuery] = useState("");

	const [photoIDList, setPhotoIDList] = useState<(string | number)[]>([]);
	const [photosList, setPhotosList] = useState<Photo[]>([]);

	type Photo = {
		id: string;
		[key: string]: any;
	};

	type LikedPhoto = {
		id: string;
		isLiked: boolean;
	}

	const getPhotos = async () => {
		try {
			const response = await fetch("https://api.unsplash.com/photos/?client_id=jpWz1czVc9VObwHMBIWVNgCnPbcZb_xvqmb4Fc-ntl8", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			});
			const json = await response.json();
			return json;
		} catch (error) {
			console.error(error);
		}
	}

	const handleLiked = (data: LikedPhoto) => {
		// setPhotosList((prev) => 
		// 	prev.map((photo) => 
		// 		photo.id === data.id ? { ...photo, isLiked: data.isLiked } : photo
		// 	)
		// );

		setPhotosList((prev) => {
			const temp = prev.map((photo) =>
				photo.id === data.id ? { ...photo, isLiked: data.isLiked } : photo
			);

			console.log(temp.map(pL => pL.isLiked ? pL.id : null));

			return temp;
		})
	};

	useEffect(() => {
		getPhotos().then((results: Photo[]) => {
			results.forEach((res) => {
				if (!photoIDList.includes(res.id)) {
					setPhotoIDList(prev => [...prev, res.id]);
					setPhotosList(prev => [...prev, res]);
				}
			});
		});
	}, []);

	return (
		<View className="flex flex-col w-screen h-screen px-3 py-10 gap-5 justify-start items-center">
			<TextInput
				className="px-5 py-2 w-full sticky mt-5 dark:text-white border-2 dark:border-white rounded-md"
				placeholder="Search for any pictures..."
				placeholderTextColor="#AAA"
				onChangeText={e => setQuery(e)}
				defaultValue={query}
			/>
			<ScrollView className="flex flex-col w-full h-full">
				{photosList.map(pL => (
					<Post 
						key={pL.id} 
						id={pL.id}
						name={pL.slug} 
						author={pL.user.username} 
						pfp={pL.user.profile_image.small}  
						desc={pL.description} 
						url={pL.urls.regular} 
						likes={pL.likes}	
						date={pL.updated_at}

						onLikeChange={handleLiked}
					/>
				))}
			</ScrollView>
		</View>
	);
}

