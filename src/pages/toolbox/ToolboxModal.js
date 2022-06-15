import React, { useEffect, useState } from 'react';
import {
	View,
	Image,
	StyleSheet,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import page from '../../assets/styles/page.style';
import { TitleText } from '../../assets/styles/Text';
import getRNDraftJSBlocks from 'react-native-draftjs-render';

const ToolboxModal = (item) => {
	const [payload, setPayload] = useState(item.route.params.item);
	const [convertedText, setConvertedText] = useState();

	const backgroundStyle = (color) => {
		// convert color value to Hex value
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

	// Convert image to something React Native can handle
	const atomicHandler = (item) => {
		switch (item.data.type) {
			case 'image':
				return (
					<View key={item.key} style={{ flex: 1 }}>
						<Image
							style={{ width: 288, height: 161 }}
							source={{ uri: item.data.url }}
						/>
					</View>
				);
			default:
				return null;
		}
	};

	useEffect(() => {
		setPayload(item.route.params.item);

		if (payload) {
			// parse JSON object from description string
			const desc = JSON.parse(payload.description);

			// define settings for getRNDraftJSBlocks
			const params = {
				contentState: desc,
				customStyles,
				atomicHandler,
				depthMargin: 32,
				textProps: {
					selectable: true,
				},
			};

			// interperets JSON object to React Native code
			// https://github.com/globocom/react-native-draftjs-render
			const blocks = getRNDraftJSBlocks(params);

			setConvertedText(blocks);
		} else {
			setConvertedText('No text found');
		}
	}, [item]);

	return (
		<ScrollView
			style={[page.container, backgroundStyle(payload.color)]}
			contentInsetAdjustmentBehavior='automatic'
		>
			<SafeAreaView>
				<TitleText style={[styles.white, styles.title]}>
					{payload.title}
				</TitleText>

				<View>{convertedText}</View>
			</SafeAreaView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
	},
	white: {
		color: 'white',
		fontSize: 20,
		lineHeight: 30,
	},
});

const customStyles = StyleSheet.flatten({
	unstyled: {
		fontSize: 18,
		fontWeight: 'normal',
		letterSpacing: -0.75,
		lineHeight: 32,
		marginBottom: 21,
		color: 'white',
	},
	link: {
		color: 'white',
		textDecorationLine: 'underline',
	},
	unorderedListItemContainer: {
		marginBottom: 16,
		position: 'relative',
		color: 'white',
	},
	unorderedListItemBullet: {
		marginRight: 10,
		position: 'relative',
		top: 14,
		width: 6,
		height: 6,
		alignSelf: 'flex-start',
		color: 'white',
	},
	'unordered-list-item': {
		fontSize: 18,
		lineHeight: 32,
		alignSelf: 'flex-start',
		flex: 1,
		color: 'white',
	},
	orderedListContainer: {
		marginBottom: 16,
		color: 'white',
	},
	orderedListItemContainer: {
		marginBottom: 5,
		position: 'relative',
		color: 'white',
		marginLeft: 0,
	},
	orderedListItemNumber: {
		fontSize: 18,
		lineHeight: 32,
		//marginRight: 10,
		marginHorizontal: 10,
		alignSelf: 'flex-start',
		color: 'white',
	},
	'ordered-list-item': {
		alignSelf: 'flex-start',
		fontSize: 18,
		lineHeight: 32,
		flex: 1,
		color: 'white',
	},
	blockquote: {
		fontWeight: 'bold',
		lineHeight: 33,
		paddingTop: 24,
		marginBottom: 24,
		fontSize: 33,
		letterSpacing: -2,
		color: 'white',
	},
	viewAfterList: {
		marginBottom: 32,
		color: 'white',
	},
});

export default ToolboxModal;
