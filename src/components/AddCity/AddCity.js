import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import uuidV4 from 'uuid/v4'

export default class AddCity extends Component {
	state = {
		city: '',
		country: ''
	}

	onChangeText = (key, text) => {
		this.setState({
			[key]: text
		})
	}

	submit = () => {
		if (this.state.city === '' || this.state.country === '') return;

		const city = {
			city: this.state.city,
			country: this.state.country,
			locations: [],
			id: uuidV4()
		}

		this.props.screenProps.addCity(city)

		this.setState({city: '', country: '',}, () => { 
			this.props.navigation.navigate('Cities')
		})

	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.heading}>Cities List App</Text>
				<TextInput 
					state={this.state.city}
					style={styles.input}
					placeholder="City name"
					onChangeText={text => this.onChangeText('city', text)} 
				/>
				<TextInput
					state={this.state.country}
					style={styles.input}
					placeholder="Country name"
					onChangeText={text => this.onChangeText('country', text)} 
				/>

				<TouchableOpacity onPress={this.submit}>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Add City</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
}

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