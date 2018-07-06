import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import Flex from './components/Flex';
import Touch from './components/Touch';
export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Touch />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
