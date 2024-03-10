import React, { useState, useEffect } from "react";
import { Text, TextInput, View, ScrollView } from 'react-native';

import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Post from "@/components/Post";

export default function Home() {
	const [uid, setUID] = useState("");
	const [query, setQuery] = useState("");

	const [photoIDList, setPhotoIDList] = useState<(string | number)[]>([]);
	const [photosList, setPhotosList] = useState<Photo[]>([]);
	const [likedPhotos, setLikedPhotos] = useState<LikedPhotoList[]>([]);

	type Photo = {
		id: string;
		[key: string]: any;
	};

	type SearchedPhotos = {
		total: number;
		total_pages: number;
		results: Array<Photo>;
	}

	type LikedPhoto = {
		id: string;
		isLiked: boolean;
	};

	type LikedPhotoList = {
		id: string;
		name: string;
		author: string;
		desc: string;
		date: string;
		pfp: string;
		url: string;
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
	};

	const searchPhotos = async () => {
		try {
			const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=jpWz1czVc9VObwHMBIWVNgCnPbcZb_xvqmb4Fc-ntl8&query=${query}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			});
			const json = await response.json();
			return json;
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmitQuery = () => {
		setPhotosList([]);
		setPhotoIDList([]);

		if (query.length === 0) {
			getPhotos().then((results: Photo[]) => {
				results.forEach((res) => {
					if (!photoIDList.includes(res.id)) {
						setPhotoIDList(prev => [...prev, res.id]);
						setPhotosList(prev => [...prev, res]);
					}
				});
			});
		} else {
			searchPhotos().then((res: SearchedPhotos) => {
				res.results.forEach((pH) => {
					if (!photoIDList.includes(pH.id)) {
						setPhotoIDList(prev => [...prev, pH.id]);
						setPhotosList(prev => [...prev, pH]);
					}
				})
			})

		}
	}

	const handleLiked = async (data: LikedPhoto) => {
		if (data.isLiked) {
			const temp = photosList.find(pL => pL.id === data.id);
			if (temp) {
				await setDoc(doc(db, "Accounts", uid, "Liked", temp.id), {
					url: temp.urls.regular
				  });
				setLikedPhotos(prev => [...prev, {
					id: temp.id,
					name: temp.name,
					author: temp.author,
					desc: temp.desc,
					date: temp.date,
					pfp: temp.pfp,
					url: temp.url
				}]);
			}
		} else {
			const temp = likedPhotos.find(pH => pH.id === data.id);
			if (temp) {
				setLikedPhotos(likedPhotos.filter(pH => pH.id === data.id));
				deleteDoc(doc(db, "Accounts", uid, "Liked", temp.id));
			}
		}
	};

	useEffect(() => {
		const getData = async () => {
			const dataStr = await AsyncStorage.getItem("data");
			if (dataStr) {
				const data = JSON.parse(dataStr);
				setUID(data.id);
			}
		}

		getData();
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
				onSubmitEditing={handleSubmitQuery}
				defaultValue={query}
			/>
			<ScrollView className="flex flex-col w-full h-full">
				{photosList.map(pL => (
					<Post
						key={pL.id}
						id={pL.id}
						name={pL.slug}
						author={pL.user.username}
						desc={pL.description}
						date={pL.updated_at}
						pfp={pL.user.profile_image.small}
						url={pL.urls.regular}
						likes={pL.likes}
						
						onLikeChange={handleLiked}
					/>
				))}
			</ScrollView>
		</View>
	);
}

