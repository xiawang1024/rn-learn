import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import Flex from './components/Flex';
// import Touch from './components/Touch';
import ImageBox from './components/ImageBox';
export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<ImageBox />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
