import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableWithoutFeedback, StyleSheet } from 'react-native';

/* Import Components */
import CenterMessage from '../messages/CenterMessage';

export default class Cities extends Component {

	viewCity = (city) => {
		this.props.navigation.navigate('City', {city})
	}

	render() {
		return (
			<ScrollView>
				<View>
					{!this.props.screenProps.cities.length ? 

						<CenterMessage message="You have not added cities" /> 
					: 
						this.props.screenProps.cities.map((city, index) => (
							<View key={index}>
								<TouchableWithoutFeedback onPress={() => this.viewCity(city)}>
									<View style={styles.cityContainer}>
										<Text style={styles.city}>{city.city}</Text>
										<Text style={styles.country}>{city.country}</Text>
									</View>
								</TouchableWithoutFeedback>
							</View>
						))
					}
					
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