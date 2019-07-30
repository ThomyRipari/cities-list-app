import React, { Component } from 'react';
import { Text } from 'react-native';

export default class City extends Component {
	static navigationOptions = (props) => {
		return {
			title: props.navigation.state.params.city.city,

			headerTitleStyle: {
				fontSize: 20,
				fontWeight: '400',
				textAlign: 'center',
				flex: 1
			}
		}
	}

	render() {
		return (
			<Text>HELLO FROM CITY</Text>
		)
	}
}