import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
} from 'react-native';

import { TitleText } from '../../assets/styles/Text';
import button from '../../assets/styles/button.style';
import input from '../../assets/styles/input.style';
import page from '../../assets/styles/page.style';
import useAuthentication from '../../utils/hooks/useAuthentication';
import { addTrack } from '../../config/firebase';

const SelectTrackScreen = () => {
	const [option, setOption] = useState(null);
	const user = useAuthentication();

	const data = [
		{ value: 'Track 1' },
		{ value: 'Track 2' },
		{ value: 'Track 3' },
	];

	const submit = (track) => {
		if (user && track) {
			let props = {
				user: user.user,
				option: track,
			};

			return addTrack(props);
		} else {
			console.log('no user');
		}
	};

	return (
		<ScrollView
			style={[page.container, { paddingBottom: 50 }]}
			contentInsetAdjustmentBehavior='automatic'
		>
			<SafeAreaView>
				<TitleText style={{ marginBottom: 20, marginTop: 40 }}>
					Select Track to Begin
				</TitleText>

				<View style={page.section}>
					<Text style={input.title}>Track 1</Text>

					<TouchableOpacity
						style={[button.button, button.blue]}
						onPress={() => submit('Track 1')}
					>
						<Text style={button.text}>New Testament</Text>
						<Text style={[button.text, local.textXXL]}>3X</Text>
					</TouchableOpacity>
				</View>

				<View style={page.section}>
					<Text style={input.title}>Track 2</Text>

					<TouchableOpacity
						style={[button.button, button.tan]}
						onPress={() => submit('Track 2')}
					>
						<Text style={button.text}>Track 1</Text>
						<Text style={button.text}>+</Text>
						<View style={{ flexDirection: 'row' }}>
							<Text style={[button.text, local.textXXL]}>2X</Text>
							<View
								style={{ textAlign: 'left', paddingLeft: 20 }}
							>
								<Text style={button.text}>Proverbs</Text>
								<Text style={button.text}>Through</Text>
								<Text style={button.text}>Psalms</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>

				<View style={page.section}>
					<Text style={input.title}>Track 3</Text>
					<TouchableOpacity
						style={[button.button, button.red]}
						onPress={() => submit('Track 3')}
					>
						<Text style={button.text}>Track 2</Text>
						<Text style={button.text}>+</Text>
						<Text style={button.text}>Old Testament</Text>
						<Text style={[button.text, local.textXXL]}>1X</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</ScrollView>
	);
};

const local = StyleSheet.create({
	textXXL: {
		fontSize: 54,
	},
});

export default SelectTrackScreen;
