import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, FlatList, Alert, PixelRatio } from 'react-native';
import SwipeOut from 'react-native-swipeout';

class FlatListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeRowKey: null
		};
	}
	deleteItem = (msg) => {
		this.props.callback(msg);
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
				console.log(this.props.fatherRefresh);
			},
			right: [
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
										this.deleteItem(this.state.activeRowKey);
										console.log(this.state.activeRowKey);
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
							<Text style={styles.flatListItem}>{this.props.item.name}</Text>
							<Text style={styles.flatListItem}>{this.props.item.mobile}</Text>
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
			flatListData: []
		};
	}
	componentDidMount() {
		fetch('http://192.168.9.41:3000/api/rnGet').then((res) => res.json()).then((resJson) => {
			this.setState({
				flatListData: resJson
			});
		});
	}
	deleteItem = (childrenMsg) => {
		console.log('childrenMsg', childrenMsg);
		this.setState((previousState) => {
			return {
				flatListData: previousState.flatListData.filter((item, index) => {
					return item.openId !== childrenMsg;
				})
			};
		});
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
							callback={this.deleteItem}
							fatherRefresh={this}
						/>
					)}
					keyExtractor={(item, index) => item.openId}
					extraData={this.state}
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
	},
	flatListItem: {
		padding: 10,
		color: 'white',
		fontSize: 16
	}
});
