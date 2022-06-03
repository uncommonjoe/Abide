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
import page from '../assets/styles/page.style';
import button from '../assets/styles/button.style';

const Toolbox = () => {
	const [toolboxItems, setToolboxItems] = useState({});
	const [isLoading, setLoading] = useState(true);

	const buttonStyle = (color) => {
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
	};

	useEffect(() => {
		const fetchToolbox = async () => {
			const response = await getToolbox();
			setToolboxItems(response);
			setLoading(false);
			return response;
		};
		fetchToolbox();
	}, []);

	return (
		<ScrollView style={[page.container, { paddingTop: 70 }]}>
			<SafeAreaView>
				<StatusBar style='dark' />

				<TitleText>Toolbox</TitleText>

				{isLoading ? (
					<ActivityIndicator />
				) : (
					<FlatList
						// sort by id decending
						data={toolboxItems.sort(function (obj1, obj2) {
							return obj1.id - obj2.id;
						})}
						keyExtractor={(item) => item.id}
						contentContainerStyle={styles.container}
						scrollEnabled={false}
						renderItem={({ item }) => (
							<TouchableOpacity
								key={item}
								onPress={() => selectBox(item)}
								style={[
									button.button,
									buttonStyle(item.color),
									{ marginBottom: 20, height: 100 },
								]}
							>
								<Text style={button.text}>{item.title}</Text>
							</TouchableOpacity>
						)}
					/>
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
