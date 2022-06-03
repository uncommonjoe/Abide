import styled from 'styled-components/native';

const Text = styled.Text`
	font-weight: ${(props) => (props.textbold ? '700' : 'normal')};
	font-size: 16px;
`;

const TitleText = styled.Text`
	font-size: 20px;
	color: #454c57;
	font-weight: 500;
	text-transform: uppercase;
	margin-bottom: 25px;
`;

export { Text, TitleText };
