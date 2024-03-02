import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Post() {
    const params = useLocalSearchParams();
    const { id } = params;

    type Photo = {
        id: string;
		[key: string]: any;
    };

    const getPhoto = async () => {
		try {
			const response = await fetch(`https://api.unsplash.com/photos/?id=${id}&client_id=jpWz1czVc9VObwHMBIWVNgCnPbcZb_xvqmb4Fc-ntl8`, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			});
			const json = await response.json();
			return json;
		} catch (error) {
			console.error(error);
		}
	}

    useEffect(() => {
        getPhoto().then((results: Photo) => {
            console.log(results.id)
        })
    }, []);

	return (
		<View className="flex flex-col w-screen h-screen p-2 justify-start gap-2 items-start">
			<View className="flex flex-row w-full p-2 gap-2">
				<Text>PicDetails</Text>
				<Text className="text-3xl dark:text-white font-bold">{id}</Text>
			</View>
		</View>
	);
}
