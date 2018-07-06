import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Flex extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View
					style={{
						width: 50,
						height: 50,
						backgroundColor: 'red',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Text style={{ color: '#fff', fontSize: 20 }}>Hello</Text>
				</View>
				<View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
				<View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around'
	}
});
