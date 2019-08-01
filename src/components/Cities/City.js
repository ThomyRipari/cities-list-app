import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Keyboard } from 'react-native';

/* Import Components */
import CenterMessage from '../messages/CenterMessage';

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

	state = {
		name: '',
		description: ''
	}

	onChangeText = (key, value) => {
		this.setState({
			[key]: value
		})
	}

	submit = () => {
		if (this.state.name === "" || this.state.description === "") return

		const { city } = this.props.navigation.state.params;

		const location = {
			name: this.state.name,
			description: this.state.description
		}

		this.props.screenProps.addLocation(location, city);

		this.setState({
			name: '',
			description: ''
		}, () => {
			Keyboard.dismiss()
		})
	}

	render() {
		const { city } = this.props.navigation.state.params;
		return (
			<View style={{ flex: 1 }}>

				{!city.locations.length ? <CenterMessage message='No locations' /> : null}

				{city.locations.map((location, index) => (
					<View style={styles.locationContainer} key={index}>
						<Text style={styles.locationName}>{location.name}</Text>
						<Text style={styles.locationDescription}>{location.description}</Text>
					</View>
				))}
				<TextInput
					placeholder="Add Location Name"
					value={this.state.name}
					style={styles.input}
					placeholderTextColor='white'
					onChangeText={text => this.onChangeText('name', text)}
				/>
				<TextInput
					placeholder="Add Location Description"
					value={this.state.description}
					style={[styles.input, styles.input2]}
					placeholderTextColor='white'
					onChangeText={text => this.onChangeText('description', text)}
				/>

				<View style={styles.buttonContainer}>
					<TouchableOpacity onPress={this.submit}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>Add Location</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}


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