import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground } from 'react-native';

export default class ImageBox extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				{/* <Image
					source={require('./img.jpg')}
					style={{
						width: Dimensions.get('window').width,
						height: 200,
						resizeMode: 'center'
					}}
				/> */}
				<Image
					source={{ uri: 'https://img.alicdn.com/tps/TB1OvT9NVXXXXXdaFXXXXXXXXXX-520-280.jpg' }}
					style={styles.imgStyle}
				/>
				<ImageBackground
					source={{ uri: 'https://img.alicdn.com/tps/TB1OvT9NVXXXXXdaFXXXXXXXXXX-520-280.jpg' }}
					style={styles.imgStyle}
				>
					<Text style={styles.textStyle}>Image组件不能放子组件，需要用ImageBackground</Text>
				</ImageBackground>
				{/* <Text>{Dimensions.get('window').width}</Text> */}
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
