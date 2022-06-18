import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	faHouse,
	faToolbox,
	faSliders,
	faPlay,
	faPause,
	faRepeat,
	faClose,
} from '@fortawesome/free-solid-svg-icons';
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import HomePage from '../pages/Home';
import ReadScreen from '../pages/scriptures/ReadScreen';
import Toolbox from '../pages/Toolbox';
import ToolboxModal from '../pages/toolbox/ToolboxModal';
import Settings from '../pages/Settings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import SelectTrackScreen from '../pages/users/SelectTrackScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { PlayerAction } from '../redux/Actions';

const Home = createNativeStackNavigator();
const ToolboxStack = createNativeStackNavigator();

const BottomSheet = ({ bottomSheetRef, children }) => {
	return (
		<BottomSheetModalProvider>
			<BottomSheetModal
				handleIndicatorStyle={{ backgroundColor: '#454C57' }}
				ref={bottomSheetRef}
				snapPoints={['30%', '50%', '95%']}
				onDismiss={() => {
					bottomSheetRef.current.dismiss();
				}}
				enablePanDownToClose={true}
				onAnimate={() => console.log('on animate')}
				backgroundStyle={{
					backgroundColor: 'white',
					shadowColor: '#454C57',
					shadowRadius: 10,
					shadowOpacity: 0.2,
					borderRadius: 0,
				}}
			>
				{children}
			</BottomSheetModal>
		</BottomSheetModalProvider>
	);
};

var HomeStack = ({ setHeaderTitle, bottomSheetRef1, bottomSheetRef2 }) => (
	<>
		<Home.Navigator
			screenOptions={() => ({
				gestureEnabled: true,
			})}
			initialRouteName='Home'
		>
			<Home.Screen
				name='Home'
				options={{
					header: () => null,
				}}
			>
				{(props) => (
					<HomePage {...props} setHeaderTitle={setHeaderTitle} />
				)}
			</Home.Screen>
			<Home.Screen
				name='Read'
				component={ReadScreen}
				options={{
					header: () => null,
				}}
				// options={{
				//   header: () => <Header title={headerTitle} />,
				// }}
			/>
			<Home.Screen
				name='Select Track'
				component={SelectTrackScreen}
				options={{
					header: () => null,
				}}
			/>
		</Home.Navigator>
		<BottomSheet bottomSheetRef={bottomSheetRef1} children={Settings} />
		<BottomSheet bottomSheetRef={bottomSheetRef2} children={ToolBoxStack} />
	</>
);

var ToolBoxStack = () => (
	<NavigationContainer independent={true}>
		<ToolboxStack.Navigator
			screenOptions={() => ({
				gestureEnabled: true,
			})}
		>
			<ToolboxStack.Screen
				name='Toolbox'
				component={Toolbox}
				options={{
					header: () => null,
				}}
			/>
			<ToolboxStack.Screen
				name='Toolbox Modal'
				component={ToolboxModal}
				options={{
					header: () => null,
					...TransitionPresets.ModalSlideFromBottomIOS,
				}}
			/>
		</ToolboxStack.Navigator>
	</NavigationContainer>
);

function BottomTab() {
	const Tab = createBottomTabNavigator();
	const [play, setPlay] = useState(true);
	const bottomSheetRef1 = useRef(null);
	const bottomSheetRef2 = useRef(null);
	const playerRef = useRef(null);
	const milliSeconds = useRef(0);
	const [headerTitle, setHeaderTitle] = useState('Abide');
	const soundFile = useSelector((state) => state.PlayerReducer.sound);
	const dispatch = useDispatch();
	// const [sound, setSound] = useState(initialState);
	//console.warn('sound', soundFile.name);

	const onPlay = async () => {
		await playerRef.current.playAsync();
		setPlay(true);
	};

	const onPause = async () => {
		await playerRef.current.pauseAsync();
		setPlay(false);
	};

	const onReplay = async () => {
		console.warn('jd', milliSeconds.current);
		await playerRef.current.setPositionAsync(milliSeconds.current - 10000);
	};

	const onClose = async () => {
		dispatch(PlayerAction.SetSound(null));
		setPlay(true);
		await playerRef.current.unloadAsync();
	};

	useEffect(() => {
		if (soundFile) {
			const play = async () => {
				await Audio.setAudioModeAsync({
					staysActiveInBackground: true,
					interruptionModeAndroid: InterruptionModeIOS.DoNotMix,
					shouldDuckAndroid: true,
					playThroughEarpieceAndroid: true,
					allowsRecordingIOS: false,
					interruptionModeIOS: InterruptionModeAndroid.DoNotMix,
					playsInSilentModeIOS: true,
				});
				const { sound } = await Audio.Sound.createAsync(
					{ uri: soundFile.url },
					{ shouldPlay: true }
				);
				playerRef.current = sound;
				sound.setOnPlaybackStatusUpdate((val) => {
					milliSeconds.current = val.positionMillis;
					// console.warn("sound", val.positionMillis / 1000);
				});
			};
			play();
		}
	}, [soundFile]);

	return (
		<View style={{ flex: 1 }}>
			<Tab.Navigator
				tabBar={(props) => {
					return (
						<>
							{soundFile ? (
								<View
									style={{
										width: '100%',
										height: 80,
										backgroundColor: '#fff',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
										paddingHorizontal: 20,
									}}
								>
									<TouchableOpacity onPress={onClose}>
										<FontAwesomeIcon
											icon={faClose}
											color={'#000'}
											size={32}
										/>
									</TouchableOpacity>
									<View
										style={{
											position: 'absolute',
											alignItems: 'center',
											justifyContent: 'center',
											width: '100%',
											zIndex: -1,
										}}
									>
										<Text>{soundFile?.name}</Text>
									</View>
									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center',
											width: '25%',
											justifyContent: 'space-between',
										}}
									>
										<TouchableOpacity onPress={onReplay}>
											<FontAwesomeIcon
												icon={faRepeat}
												color={'#000'}
												size={32}
											/>
										</TouchableOpacity>
										<TouchableOpacity
											onPress={() =>
												play ? onPause() : onPlay()
											}
										>
											<FontAwesomeIcon
												icon={play ? faPause : faPlay}
												color={'#000'}
												size={32}
											/>
										</TouchableOpacity>
									</View>
								</View>
							) : null}
							<View
								style={{
									height: 80,
									paddingTop: 0,
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: '#fff',
									borderTopWidth: 0,
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								{props.state.routes.map((val, index) => (
									<TouchableOpacity
										activeOpacity={0.7}
										onPress={() => {
											// console.warn(
											// 	'index',
											// 	index,
											// 	val.name
											// );
											if (index == 2) {
												bottomSheetRef1.current.present();
												bottomSheetRef2.current.dismiss();
												return;
											}
											if (index == 1) {
												bottomSheetRef2.current.present();
												bottomSheetRef1.current.dismiss();
												return;
											} else
												props.navigation.navigate(
													'Home'
												);
										}}
										style={{
											alignItems: 'center',
											justifyContent: 'center',
											flex: 1,
											height: '100%',
											// width: "33%",
											// padding: 10
										}}
									>
										<FontAwesomeIcon
											icon={
												index == 0
													? faHouse
													: index == 1
													? faToolbox
													: faSliders
											}
											color={
												props.state.index == index
													? '#424142'
													: '#A29FA2'
											}
											size={32}
										/>
									</TouchableOpacity>
								))}
							</View>
						</>
					);
				}}
				tabBarOptions={{ showLabel: false, keyboardHidesTabBar: true }}
				screenOptions={({ route }) => ({
					headerShown: false,
					activeTintColor: 'blue',
					inactiveTintColor: 'gray',
					style: {
						borderTopWidth: 0,
						elevation: 0,
						...styles.shadow,
					},
					keyboardHidesTabBar: true,
					tabBarStyle: {
						height: 70,
						paddingHorizontal: 5,
						paddingTop: 0,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#fff',
						// position: 'absolute',
						borderTopWidth: 0,
					},
				})}
			>
				<Tab.Screen
					name='Main'
					children={() => (
						<HomeStack
							setHeaderTitle={setHeaderTitle}
							bottomSheetRef1={bottomSheetRef1}
							bottomSheetRef2={bottomSheetRef2}
						/>
					)}
					headerShown={false}
				/>
				<Tab.Screen
					name='Toolbox'
					component={ToolBoxStack}
					// children={() => <></>}
					headerShown={false}
				/>
				<Tab.Screen
					name='Settings'
					children={() => null}
					headerShown={false}
				/>
			</Tab.Navigator>
		</View>
	);
}
export default BottomTab;

const styles = StyleSheet.create({
	shadow: {
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 15.5,
		elevation: 5,
	},
	customStyle: {
		height: 52,
		width: 52,
	},
});
