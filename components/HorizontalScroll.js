import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground, ScrollView, TextInput } from 'react-native';

export default class ImageBox extends React.Component {
	render() {
		let screenWidth = Dimensions.get('window').width;
		let screenHeight = Dimensions.get('window').height;
		return (
			<ScrollView horizontal={true} contentContainerStyle={{ marginTop: 20 }} pagingEnabled={true}>
				<View
					style={{
						backgroundColor: 'tomato',
						width: screenWidth,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Text style={{ fontSize: 28 }}>Screen 1</Text>
				</View>
				<View
					style={{
						backgroundColor: 'orange',
						width: screenWidth,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Text style={{ fontSize: 28 }}>Screen 2</Text>
				</View>
				<View
					style={{
						backgroundColor: 'green',
						width: screenWidth,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Text style={{ fontSize: 28 }}>Screen 3</Text>
				</View>
			</ScrollView>
		);
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
