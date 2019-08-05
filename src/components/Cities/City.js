import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Keyboard } from 'react-native';

/* Import Components */
import CenterMessage from '../messages/CenterMessage';

const City = (props) => {
	const [ state, setState ] = useState({
		name: '',
		description: ''
	})

	const onSubmit = () => {
		if (state.name === "" || state.description === "") return;

		const { city } = props.navigation.state.params;

		const location = {
			name: state.name,
			description: state.description
		}

		props.screenProps.addLocation(location, city);

		setState(prev => ({...prev, name: '', description: ''}))
	}

	return (
		<View style={{ flex: 1 }}>

			{!props.navigation.state.params.city.locations.length ? <CenterMessage message='No locations' /> : null}

			{props.navigation.state.params.city.locations.map((location, index) => (
				<View style={styles.locationContainer} key={index}>
					<Text style={styles.locationName}>{location.name}</Text>
					<Text style={styles.locationDescription}>{location.description}</Text>
				</View>
			))}

			<TextInput
				placeholder="Add Location Name"
				value={state.name}
				style={styles.input}
				placeholderTextColor='white'
				onChangeText={text => setState(prev => ({...prev, name: text}))}
			/>
			<TextInput
				placeholder="Add Location Description"
				value={state.description}
				style={[styles.input, styles.input2]}
				placeholderTextColor='white'
				onChangeText={text => setState(prev => ({...prev, description: text}))}
			/>

			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={onSubmit}>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Add Location</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default City;

const styles = StyleSheet.create({

	locationContainer: {
		padding: 10,
		borderBottomColor: '#e8075d',
		borderBottomWidth: 2
	},

	locationName: {
		fontSize: 30
	},

	locationDescription: {
		color: 'rgba(0, 0, 0, .5)'
	},

	input: {
		position: 'absolute',
		height: 50,
		backgroundColor: '#e8075d',
		width: '100%',
		bottom: 104,
		left: 0,
		color: 'white'
	},

	input2: {
		bottom: 52
	},

	buttonContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%'
	},

	button: {
		height: 50,
		backgroundColor: '#e8075d',
		justifyContent: 'center',
		alignItems: 'center'
	},

	buttonText: {
		color: 'white',
		fontSize: 24
	}
})