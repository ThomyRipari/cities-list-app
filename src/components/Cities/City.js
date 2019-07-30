import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

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
		})
	}

	render() {
		return (
			<View>
				<TextInput
					placeholder="Add Location Name"
					state={this.state.name}
					style={styles.input}
					placeholderTextColor='white'
					onChangeText={text => this.onChangeText('name', text)}
				/>
				<TextInput
					placeholder="Add Location Description"
					state={this.state.description}
					style={styles.input}
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
	input: {

	},

	button: {

	},

	buttonText: {

	}
})