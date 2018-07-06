import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class ImageBox extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Image
					style={{ width: 60, height: 60 }}
					source={{ uri: 'http://img5.imgtn.bdimg.com/it/u=415293130,2419074865&fm=27&gp=0.jpg' }}
				/>
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
