import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import uuidV4 from 'uuid/v4'

const AddCity = (props) => {
	const [ state, setState ] = useState({
		city: '',
		country: ''
	})

	onSubmit = () => {
		if (state.city === '' || state.country === '') return;

		const city = {
			city: state.city,
			country: state.country,
			locations: [],
			id: uuidV4()
		}

		props.screenProps.addCity(city)

		setState(prev => ({...prev, city: '', country: ''}))

		props.navigation.navigate('Cities')
	}

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Cities List App</Text>
			<TextInput 
				value={state.city}
				style={styles.input}
				placeholder="City name"
				onChangeText={text => setState(prev => ({...prev, city: text}))} 
			/>
			<TextInput
				value={state.country}
				style={styles.input}
				placeholder="Country name"
				onChangeText={text => setState(prev => ({...prev, country: text}))} 
			/>

			<TouchableOpacity onPress={onSubmit}>
				<View style={styles.button}>
					<Text style={styles.buttonText}>Add City</Text>
				</View>
			</TouchableOpacity>
		</View>
	)
}

export default AddCity;

const styles = StyleSheet.create({
	input: {
		backgroundColor: 'white',
		margin: 10,
		paddingHorizontal: 8,
		height: 50
	},

	button: {
		height: 50,
		backgroundColor: '#666',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10
	},
	buttonText: {
		color: 'white'
	},

	container: {
		backgroundColor: '#e8075d',
		flex: 1,
		justifyContent: 'center'
	},
	heading: {
		fontSize: 30,
		margin: 10,
		textAlign: 'center',
		color: 'white'
	}
})