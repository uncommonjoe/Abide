import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	FlatList,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TitleText } from '../assets/styles/Text';
import { getToolbox } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import page from '../assets/styles/page.style';
import button from '../assets/styles/button.style';

const Toolbox = () => {
	const [toolboxItems, setToolboxItems] = useState({});
	const [isLoading, setLoading] = useState(true);
	const navigation = useNavigation();

	const buttonStyle = (color) => {
		// Need to convert color with convertColor hook
		switch (color) {
			case 'red':
				return { backgroundColor: '#802119' };
			case 'blue':
				return { backgroundColor: '#434D59' };
			case 'green':
				return { backgroundColor: '#556D54' };
			case 'brown':
				return { backgroundColor: '#746756' };
			case 'tan':
				return { backgroundColor: '#C1A98B' };
		}
	};

	const selectBox = (item) => {
		console.log(item);
		navigation.navigate('Toolbox Modal', { item: item });
	};

	useEffect(() => {
		const fetchToolbox = async () => {
			// Get data
			const response = await getToolbox();

			// Order by id descending
			const ordered = response.sort(function (obj1, obj2) {
				return obj1.id - obj2.id;
			});
			setToolboxItems(ordered);
			setLoading(false);
		};
		fetchToolbox();
	}, []);

	return (
		<ScrollView style={[page.container, { backgroundColor: 'white' }]}>
			<SafeAreaView>
				<StatusBar style='dark' />

				<Text
					style={{
						fontSize: 20,
						fontWeight: '500',
						textTransform: 'uppercase',
						marginBottom: 25,
					}}
				>
					Toolbox
				</Text>

				{isLoading ? (
					<ActivityIndicator />
				) : (
					toolboxItems.map((item) => (
						<TouchableOpacity
							item={item}
							key={item.id}
							onPress={() => selectBox(item)}
							style={[
								button.button,
								buttonStyle(item.color),
								{ marginBottom: 20, height: 100 },
							]}
						>
							<Text style={button.text}>{item.title}</Text>
						</TouchableOpacity>
					))
				)}
			</SafeAreaView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
});

export default Toolbox;
