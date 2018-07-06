import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Alert,
	TouchableWithoutFeedback,
	TouchableHighlight,
	TouchableNativeFeedback,
	TouchableOpacity
} from 'react-native';

export default class Touch extends React.Component {
	constructor() {
		super();
		this.state = {
			count: 0,
			text: ''
		};
	}
	onPress = () => {
		this.setState({
			text: 'press'
		});
		this.setState((previousState) => {
			return {
				count: previousState.count + 1
			};
		});
	};
	onLongPress = () => {
		// Alert.alert('提示', '确定要删除吗?', [
		// 	{ text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
		// 	{ text: '确实', onPress: () => console.log('OK Pressed') }
		// ]);
	};
	onPressIn = () => {
		this.setState({
			text: 'pressIn'
		});
	};
	onPressOut = () => {
		this.setState({
			text: 'pressOut'
		});
	};
	render() {
		return (
			<View style={styles.container}>
				<TouchableWithoutFeedback
					style={styles.button}
					onPressIn={this.onPressIn}
					onPressOut={this.onPressOut}
					onPress={this.onPress}
					onLongPress={this.onLongPress}
				>
					<View style={{ borderColor: '#000', borderWidth: 1 }}>
						<Text style={{ padding: 10 }}> Touch Here </Text>
					</View>
				</TouchableWithoutFeedback>
				<TouchableHighlight
					style={styles.button}
					onPress={this.onPress}
					underlayColor={'#f00'}
					onHideUnderlay={() => {
						this.setState({
							text: 'hide'
						});
					}}
					onShowUnderlay={() => {
						this.setState({
							text: 'show'
						});
					}}
					style={{ backgroundColor: 'green', padding: 10 }}
				>
					<Text> Touch Here </Text>
				</TouchableHighlight>
				{/* <TouchableOpacity style={styles.button} onPress={this.onPress}>
					<Text> Touch Here </Text>
				</TouchableOpacity>
				
				<TouchableNativeFeedback
					onPress={this._onPressButton}
					background={TouchableNativeFeedback.SelectableBackground()}
				>
					<View style={{ width: 150, height: 100, backgroundColor: 'red' }}>
						<Text style={{ margin: 30 }}>Button</Text>
					</View>
				</TouchableNativeFeedback> */}
				<View>
					<Text>{this.state.count}</Text>
					<Text>{this.state.text}</Text>
				</View>
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
	button: {
		alignItems: 'center',
		backgroundColor: 'orange',
		padding: 10
	}
});
