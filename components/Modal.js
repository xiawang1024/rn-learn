import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, Keyboard } from 'react-native';
import Modal from 'react-native-modal'; // 2.4.0

export default class Example extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visibleModal: null,
			name: '',
			mobile: ''
		};
	}

	_renderButton = (text, onPress) => (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.button}>
				<Text>{text}</Text>
			</View>
		</TouchableOpacity>
	);

	_renderModalContent = () => (
		<View style={styles.modalContent}>
			<Text style={{ textAlign: 'center' }}>Hello!</Text>
			<View>
				<TextInput
					ref="input"
					style={styles.textInput}
					onChangeText={(name) => this.setState({ name })}
					value={this.state.name}
					placeholder={'名字'}
				/>
				<TextInput
					ref="input"
					style={styles.textInput}
					onChangeText={(mobile) => this.setState({ mobile })}
					value={this.state.mobile}
					placeholder={'手机号'}
				/>
			</View>
			<View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
				{this._renderButton('取消', () => this.setState({ visibleModal: null }))}
				{this._renderButton('确定', () => this.setState({ visibleModal: null }))}
			</View>
		</View>
	);
	showModal = () => {
		this.setState({ visibleModal: 1 });
	};
	hideKeyWord = () => {
		Keyboard.dismiss();
	};

	render() {
		return (
			<View style={styles.container}>
				{/* {this._renderButton('Default modal', () => this.setState({ visibleModal: 1 }))} */}
				{/* {this._renderButton('Sliding from the sides', () => this.setState({ visibleModal: 2 }))}
				{this._renderButton('A slower modal', () => this.setState({ visibleModal: 3 }))}
				{this._renderButton('Fancy modal!', () => this.setState({ visibleModal: 4 }))}
				{this._renderButton('Bottom half modal', () => this.setState({ visibleModal: 5 }))} */}
				<Modal isVisible={this.state.visibleModal === 1} onBackdropPress={this.hideKeyWord}>
					{this._renderModalContent()}
				</Modal>
				<Modal
					onBackdropPress={this.hideKeyWord}
					isVisible={this.state.visibleModal === 2}
					animationIn={'slideInLeft'}
					animationOut={'slideOutRight'}
				>
					{this._renderModalContent()}
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textInput: {
		marginTop: 20,
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 4,
		paddingLeft: 6
	},
	button: {
		backgroundColor: 'lightblue',
		padding: 12,
		margin: 16,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderColor: 'rgba(0, 0, 0, 0.1)'
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 22,
		justifyContent: 'center',
		// alignItems: 'center',
		borderRadius: 4,
		borderColor: 'rgba(0, 0, 0, 0.1)'
	},
	bottomModal: {
		justifyContent: 'flex-end',
		margin: 0
	}
});
