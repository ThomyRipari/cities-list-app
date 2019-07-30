import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableWithoutFeedbacj } from 'react-native';

export default class Cities extends Component {
	static navigationOptions = {
		title: 'Cities',

		headerTitleStyle: {
			color: 'white',
			fontSize: 20,
			fontWeight: '400',
			textAlign: 'center',
			flex: 1
		}
	}

	render() {
		console.log(this.props.screenProps);
		return (
			<Text>HELLO FROM CITIES</Text>
		)
	}
}