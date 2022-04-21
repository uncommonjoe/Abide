//https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp

// How to call this page:
// readingPlanAPI().then((data) => {
// 	setData(data);
// });

// export function readingPlanAPI() {
//     const [isLoading, setLoading] = useState(true);
// 	const [data, setData] = useState([]);

// 	return (

//         const getPlan = async () => {
//             	try {
//             		const response = await fetch(
//             			'https://cornerstonebillings.org/api/abide-small.json'
//             		);
//             		const json = await response.json();
//             		setData(json.plans);
//             	} catch (error) {
//             		console.error(error);
//             	} finally {
//             		setLoading(false);
//             	}
//             };

// 		// fetch(`https://cornerstonebillings.org/api/abide-small.json`)
// 		// 	//   , {headers: {"Authorization": "Bearer " + this.user_token}
// 		// 	.then((response) => response.json())
// 		// 	.then((responseJson) => {
// 		// 		return responseJson.plans;
// 		// 	})
// 		// 	.catch((error) => {
// 		// 		console.error(error);
// 		// 	})
// 	);
// }
