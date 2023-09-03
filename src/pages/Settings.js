import React, { useState } from 'react';
import {
	View,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TitleText, Text } from '../assets/styles/Text';
import button from '../assets/styles/button.style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	faCircleArrowRight,
	faArrowUpRightFromSquare,
	faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import page from '../assets/styles/page.style';
import useAuthentication from '../utils/hooks/useAuthentication';
import { signOut, getAuth } from 'firebase/auth';
import NavService from '../navigation/NavService';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function Settings() {
	const { user } = useAuthentication();
	const auth = getAuth();
	const navigation = useNavigation();

	return (
		<ScrollView
			style={[
				page.container,
				{
					height: 100,
					width: '100%',
					backgroundColor: 'white',
				},
			]}
		>
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
					Hello {user?.displayName}
				</Text>

				<View style={page.section}>
					<TouchableOpacity
						style={button.list}
						onPress={() => {
							navigation.navigate('UpdateTrackScreen');
						}}
					>
						<Text style={button.listText}>Change Track</Text>
						<View style={button.listIcon}>
							<Text style={{ marginRight: 10 }}>
								{global.usrSettngs?.track}
							</Text>
							<FontAwesomeIcon
								icon={faCircleArrowRight}
								color={'#424142'}
								size={16}
							/>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={button.list}
						onPress={() => {
							signOut(auth);
							global.usrSettngs = null;
							global.user = null;
							global.userReadings = [];
							NavService.resetStack('AuthStack');
						}}
					>
						<Text style={button.listText}>Sign Out</Text>
						<View style={button.listIcon}>
							<FontAwesomeIcon
								icon={faCircleArrowRight}
								color={'#424142'}
								size={16}
							/>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={button.list}
						onPress={() => {
							navigation.navigate('Translation');
						}}
					>
						<Text style={button.listText}>Translation</Text>
						<View style={button.listIcon}>
							<Text style={{ marginRight: 10 }}>ESV</Text>
							<FontAwesomeIcon
								icon={faCircleArrowRight}
								color={'#424142'}
								size={16}
							/>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={button.list}
						onPress={() => {
							Linking.openURL(
								'https://cornerstonebillings.org/privacy-policy/'
							);
						}}
					>
						<Text style={button.listText}>Privacy Policy</Text>
						<View style={button.listIcon}>
							<FontAwesomeIcon
								icon={faArrowUpRightFromSquare}
								color={'#424142'}
								size={16}
							/>
						</View>
					</TouchableOpacity>

					<Text style={styles.version}>v{global.versionNumber}</Text>
				</View>
			</SafeAreaView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	version: {
		fontSize: 14,
		marginTop: 20,
		textAlign: 'center',
	},
});
