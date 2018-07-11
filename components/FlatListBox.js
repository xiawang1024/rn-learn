import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, FlatList, PixelRatio } from 'react-native';
import SwipeOut from 'react-native-swipeout';

class FlatListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeRowKey: null
		};
	}
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
			rowId: this.props.index,
			sectionId: 1
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
export default class ImageBox extends React.Component {
	constructor() {
		super();
		this.state = {
			flatListData: []
		};
	}
	componentDidMount() {
		fetch('http://rap2api.taobao.org/app/mock/1942/rndemo').then((res) => res.json()).then((resJson) => {
			this.setState({
				flatListData: resJson.list
			});
		});
	}
	render() {
		return (
			<View style={{ flex: 1, marginTop: 20 }}>
				<FlatList
					data={this.state.flatListData}
					renderItem={({ item, index }) => <FlatListItem item={item} index={index} />}
					keyExtractor={(item, index) => item.openId}
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
