import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class Settings extends Component {

	goToDeleteCity = () => {
		this.props.navigation.navigate('DeleteCity');
	}

	goToDeleteAllCities = () => {
		this.props.navigation.navigate('DeleteAllCities');
	}

	render() {
		return (
			<View>
				<Text style={styles.heading}>Cities List - Settings</Text>

				<TouchableOpacity onPress={() => this.goToDeleteCity()}>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Delete a City</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.goToDeleteAllCities()}>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Delete the List of Cities</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	heading: {
		fontSize: 24,
		margin: 10,
		textAlign: 'left',
		color: '#000000'
	},

	button: {
		height: 80,
		backgroundColor: '#dcdfe3',
		justifyContent: 'center',
		alignItems: 'flex-start',
		width: '100%',
		borderBottomColor: '#e8075d',
		borderBottomWidth: 1,
		borderTopColor: '#e8075d',
		borderTopWidth: 1,
		marginBottom: 10
	},

	buttonText: {
		fontSize: 20,
		marginLeft: 20
	}
})