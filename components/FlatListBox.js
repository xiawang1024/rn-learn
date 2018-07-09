import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, FlatList, PixelRatio } from 'react-native';
import SwipeOut from 'react-native-swipeout';

class FlatListItem extends React.Component {
	render() {
		const SwipeSetting = {
			autoClose: true,
			onClose: (secId, rowId, direction) => {},
			onOpen: (secId, rowId, direction) => {},
			right: [
				{
					onPress: () => {},
					text: 'Delete',
					type: 'delete'
				}
			]
		};
		return (
			<SwipeOut {...SwipeSetting}>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						backgroundColor: 'mediumseagreen',
						borderBottomColor: 'white',
						borderBottomWidth: 1 / PixelRatio.get()
					}}
				>
					<Image source={{ uri: this.props.item.icon }} style={{ width: 100, height: 100, margin: 5 }} />
					<View style={{ flex: 1 }}>
						<Text style={styles.flatListItem}>{this.props.item.name}</Text>
						<Text style={styles.flatListItem}>{this.props.item.mobile}</Text>
					</View>
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
