import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const page = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 40,
		paddingHorizontal: 25,
		backgroundColor: '#F3F2F8',
	},
	statusBarOffset: {
		marginTop: getStatusBarHeight(),
	},
	section: {
		flex: 1,
	},
	page: {
		padding: 25,
	},
});

export default page;
