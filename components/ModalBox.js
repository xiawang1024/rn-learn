import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, Keyboard, Platform, Dimensions } from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';

const screen = Dimensions.get('window');
export default class ModalBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			mobile: '',
			flatItem: null
		};
	}
	showModal = (_this, changeItem) => {
		this.setState({
			flatItem: _this
		});
		this.setState({ name: '', mobile: '' });
		this.refs.myModal.open();
	};
	render() {
		return (
			<Modal
				ref={'myModal'}
				position={'center'}
				style={{
					justifyContent: 'center',
					borderRadius: Platform.OS === 'ios' ? 30 : 0,
					shadowRadius: 10,
					width: screen.width - 80,
					height: 300
				}}
			>
				<Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>
					Editor Info
				</Text>
				<TextInput
					style={styles.textInput}
					placeholder="姓名"
					onChangeText={(name) => this.setState({ name })}
					value={this.props.editorItem.name}
				/>
				<TextInput
					style={styles.textInput}
					placeholder="手机号"
					onChangeText={(mobile) => this.setState({ mobile })}
					value={this.props.editorItem.mobile}
				/>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-around',
						alignItems: 'center',
						marginTop: 30
					}}
				>
					<Button
						style={{ fontSize: 16, color: 'white' }}
						containerStyle={styles.button}
						onPress={() => {
							this.refs.myModal.close();
						}}
					>
						取消
					</Button>
					<Button
						style={{ fontSize: 16, color: 'white' }}
						containerStyle={styles.button}
						onPress={() => {
							let changeItem = {
								_id: this.props.editorItem._id,
								name: this.state.name || this.props.editorItem.name,
								mobile: this.state.mobile || this.props.editorItem.mobile
							};
							console.log(this.state.name);
							this.props.parentFlatList.fetchEditItem(changeItem).then((result) => {
								if (result === 0) {
									this.state.flatItem.refreshFlatListItem(changeItem);
									this.refs.myModal.close();
									alert('修改成功！');
								} else {
									alert('修改失败！');
								}
							});
						}}
					>
						确定
					</Button>
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	textInput: {
		marginTop: 20,
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 4,
		paddingLeft: 6,
		marginLeft: 30,
		marginRight: 30
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		height: 45,
		overflow: 'hidden',
		borderRadius: 4,
		paddingLeft: 30,
		paddingRight: 30,
		backgroundColor: 'mediumseagreen'
	}
});
