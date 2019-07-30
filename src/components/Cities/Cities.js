import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableWithoutFeedback, StyleSheet } from 'react-native';

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

	viewCity = (city) => {
		this.props.navigation.navigate('City', {city})
	}

	render() {
		return (
			<ScrollView>
				<View>
					
					{this.props.screenProps.cities.map((city, index) => (
						<View key={index}>
							<TouchableWithoutFeedback onPress={() => this.viewCity(city)}>
								<View style={styles.cityContainer}>
									<Text style={styles.city}>{city.city}</Text>
									<Text style={styles.country}>{city.country}</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
					))}
					
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	cityContainer: {
		padding: 10,
		borderBottomWidth: 2,
		borderBottomColor: '#e8075d'
	},

	city: {
		fontSize: 20
	},
	country: {
		color: 'rgba(0, 0, 0, .5)'
	}
})