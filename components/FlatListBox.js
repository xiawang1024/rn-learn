import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, FlatList } from 'react-native';

export default class ImageBox extends React.Component {
	render() {
		return <FlatList data={[ { key: 'a' }, { key: 'b' } ]} renderItem={({ item }) => <Text>{item.key}</Text>} />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	imgStyle: {
		width: Dimensions.get('window').width,
		height: 200,
		justifyContent: 'center'
	},
	textStyle: {
		padding: 10,
		textAlign: 'center',
		color: '#fff',
		backgroundColor: '#0081dc'
	}
});
