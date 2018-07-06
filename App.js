import React from 'C:/Users/xiawa/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';
import { StyleSheet, Text, View } from 'react-native';

import Flex from './components/Flex';
// import Touch from './components/Touch';
// import ImageBox from './components/ImageBox';
export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Flex />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
