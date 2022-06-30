import React, { useEffect, useState } from 'react';
import {
	View,
	Image,
	StyleSheet,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import page from '../../assets/styles/page.style';
import { TitleText } from '../../assets/styles/Text';
import getRNDraftJSBlocks from 'react-native-draftjs-render';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';

const ToolboxModal = (item) => {
	const [payload, setPayload] = useState(item.route.params.item);
	const [convertedText, setConvertedText] = useState();
	const navigation = useNavigation();
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
			case 'pink':
				return { backgroundColor: '#CC9999' };
			case 'black':
				return { backgroundColor: '#424142' };
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
			style={[
				page.container,
				backgroundStyle(payload.color),
				{ paddingTop: 20 },
			]}
			contentInsetAdjustmentBehavior='automatic'
		>
			<SafeAreaView style={{ marginBottom: 500 }}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<FontAwesomeIcon
						icon={faArrowLeft}
						color={'#fff'}
						size={24}
					/>
				</TouchableOpacity>
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
		paddingTop: 20,
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
