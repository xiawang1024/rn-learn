import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, FlatList, Alert, PixelRatio } from 'react-native';
import SwipeOut from 'react-native-swipeout';

import ModalBox from './ModalBox';

class FlatListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeRowKey: null,
			changeItem: {}
		};
	}
	deleteItem = (index, openId) => {
		this.props.delCb(index, openId);
	};
	editorItem = (index, openId) => {
		this.props.editorCb(index, openId, this, this.state.changeItem);
	};
	refreshFlatListItem = (changeItem) => {
		this.setState({ changeItem });
	};
	render() {
		const SwipeSetting = {
			autoClose: true,
			onClose: (secId, rowId, direction) => {
				if (this.state.activeRowKey != null) {
					this.setState({
						activeRowKey: this.props.item.openId
					});
				}
			},
			onOpen: (secId, rowId, direction) => {
				this.setState({
					activeRowKey: this.props.item.openId
				});
			},
			right: [
				{
					onPress: () => {
						console.log(this.state.changeItem);
						this.editorItem(this.props.index, this.state.activeRowKey);
					},
					text: 'Editor',
					type: 'primary'
				},
				{
					onPress: () => {
						Alert.alert(
							'Alert',
							'Are you sure you want to delete?',
							[
								{
									text: 'No',
									onPress: () => {
										console.log('Cancel');
									},
									style: 'cancel'
								},
								{
									text: 'Yes',
									onPress: () => {
										console.log('Cancel');
										// this.deleteItem(this.state.activeRowKey);
										this.deleteItem(this.props.index, this.state.activeRowKey);
									},
									style: 'cancel'
								}
							],
							{
								cancelable: true
							}
						);
					},
					text: 'Delete',
					type: 'delete'
				}
			],
			scroll: (event) => {
				console.log(event); //水平滑动返回false，竖直滑动返回true，可以设置 ScrollView 和 ListView 的scrollEnabled
			}
		};
		return (
			<SwipeOut {...SwipeSetting}>
				<View style={{ flex: 1, flexDirection: 'column' }}>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							backgroundColor: 'mediumseagreen'
						}}
					>
						<Image source={{ uri: this.props.item.icon }} style={{ width: 100, height: 100, margin: 5 }} />

						<View style={{ flex: 1 }}>
							<Text style={styles.flatListItem}>
								{this.state.changeItem.name || this.props.item.name}
							</Text>
							<Text style={styles.flatListItem}>
								{this.state.changeItem.mobile || this.props.item.mobile}
							</Text>
						</View>
					</View>
					<View
						style={{
							height: 1,
							backgroundColor: 'white'
						}}
					/>
				</View>
			</SwipeOut>
		);
	}
}
export default class FlatListBox extends React.Component {
	constructor() {
		super();
		this.state = {
			flatListData: [],
			editorItemData: {}
		};
	}
	componentDidMount() {
		return fetch('http://192.168.9.41:3000/api/rnGet/all').then((res) => res.json()).then((resJson) => {
			this.setState({
				flatListData: resJson
			});
		});
	}
	deleteItem = async (delIndex, delOpenId) => {
		console.log('childrenMsg', delIndex, delOpenId);

		let delFlag = await this.fetchDeleteItem(delOpenId);
		if (delFlag === 0) {
			this.setState((previousState) => {
				let data = previousState.flatListData;
				data.splice(delIndex, 1);
				return {
					flatListData: data
				};
			});
			alert('删除成功！');
		} else {
			alert('删除失败！');
		}
	};
	editorItem = async (editorIndex, editorOpenId, _this, changeItem) => {
		let editorItemData = this.state.flatListData.filter((item) => {
			return item.openId === editorOpenId;
		})[0];

		if (Object.keys(changeItem).length !== 0) {
			editorItemData.name = changeItem.name;
			editorItemData.mobile = changeItem.mobile;
		}
		console.log(editorItemData);
		this.setState({ editorItemData: editorItemData });
		this.refs.modalBox.showModal(_this, changeItem);
	};
	fetchEditItem = async ({ _id, name, mobile }) => {
		try {
			let response = await fetch('http://192.168.9.41:3000/api/rnEdit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id, name, mobile })
			});
			let resJson = await response.json();
			return resJson.status;
		} catch (err) {
			console.log(err);
		}
	};
	fetchDeleteItem = async (delOpenId) => {
		try {
			let response = await fetch('http://192.168.9.41:3000/api/rnDelete/all', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ openId: delOpenId })
			});

			let responseJson = await response.json();
			return responseJson.status;
		} catch (err) {
			console.log(err);
		}
	};
	render() {
		return (
			<View style={{ flex: 1, marginTop: 20 }}>
				<FlatList
					data={this.state.flatListData}
					renderItem={({ item, index }) => (
						<FlatListItem
							item={item}
							index={index}
							ref="children"
							delCb={this.deleteItem}
							editorCb={this.editorItem}
							fatherRefresh={this}
						/>
					)}
					keyExtractor={(item, index) => item._id}
					extraData={this.state}
				/>
				<ModalBox ref={'modalBox'} parentFlatList={this} editorItem={this.state.editorItemData} />
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
	flatListItem: {
		padding: 10,
		color: 'white',
		fontSize: 16
	}
});
