import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Button } from 'react-native';

export default class DeleteAllCities extends Component {
	state = {showModal: true};

	closeModal = () => {
		this.setState({showModal: false});

		this.props.navigation.navigate('Settings');
	}

	deleteAllCities = () => {
		this.setState({showModal: false});

		this.props.screenProps.deleteAllCities();

		this.props.navigation.navigate('Settings');
		this.props.navigation.navigate('Cities');
	}

	goToAddCity = () => {
		this.setState({showModal: false});

		this.props.navigation.navigate('Settings');
		this.props.navigation.navigate('AddCity');
	}

	render() {
		const { cities } = this.props.screenProps;
		return (
			<Modal transparent={false} visible={this.state.showModal} animationType="slide">
				{!cities.length ?  
					<View>
						<Text style={styles.heading}>You haven't added cities yet</Text>
						<Button title="GO TO ADD CITY" onPress={() => this.goToAddCity()} />
					</View>

					:

					<View style={{flex: 1}}>
						<Text style={styles.heading}>Are you sure you want to remove all cities from the list?</Text>

						<View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', position: 'absolute', bottom: 60}}>
							<View>
								<TouchableOpacity style={{backgroundColor: '#e8075d'}} onPress={() => this.closeModal()}>
								    <Text style={styles.modalsButtons}>CANCEL</Text>
								</TouchableOpacity>
							</View>

							<View>
								<TouchableOpacity style={{backgroundColor: '#e8075d'}} onPress={() => this.deleteAllCities()}>
								    <Text style={styles.modalsButtons}>DELETE</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>						
				}
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	heading: {
		fontSize: 24,
		margin: 14,
		textAlign: 'left',
		color: '#000000'
	},

	modalsButtons: {
		alignSelf: 'center',
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '600',
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 10,
		paddingBottom: 10			
	}

})