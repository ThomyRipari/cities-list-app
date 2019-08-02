import React, { Component } from 'react';
import { View, Text, ScrollView, Button, TouchableOpacity, StyleSheet } from 'react-native';

export default class DeleteCity extends Component {

	goToAddCity = () => {
		this.props.navigation.navigate('AddCity');
	}

	deleteCity = (city) => {

	}

	render() {
		const { cities } = this.props.screenProps;
		return (
			<ScrollView>
				<View>
					{!cities.length ?

						<View>
							<Text style={styles.heading}>You haven't added cities yet</Text>
							<Button title="GO TO ADD CITY" onPress={() => this.goToAddCity()} />
						</View>
					:
						<View>
							<Text style={styles.heading}>Select the city you want to delete</Text>
							{cities.map((city, index) => (
								<View key={index}>
									<TouchableOpacity onPress={() => this.deleteCity(city)}>
										<View style={styles.button}>
											<Text>{city.city}</Text>
											<Text>{city.country}</Text>
										</View>
									</TouchableOpacity>
								</View>

							))}
						</View>
					}
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	heading: {
		fontSize: 24,
		margin: 14,
		textAlign: 'left',
		color: '#000000'		
	}
})