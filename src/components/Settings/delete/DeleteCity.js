import React, { Component } from 'react';
import { View, Text, ScrollView, Button, TouchableOpacity, StyleSheet, Modal } from 'react-native';

export default class DeleteCity extends Component {
	state = {showModal: false, city: {}};

	goToAddCity = () => {
		this.props.navigation.navigate('AddCity');
	}

	openModal = (city) => {
		this.setState({showModal: true, city: city});
	}

	deleteCity = () => {
		this.setState({showModal: false, city: {}});

		this.props.screenProps.deleteCity(this.state.city.id);

		this.props.navigation.navigate('Settings');
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
									<TouchableOpacity onPress={() => this.openModal(city)}>
										<View style={styles.buttonCity}>
											<Text style={styles.textCity}>{city.city}</Text>
											<Text style={styles.textCountry}>{city.country}</Text>
										</View>
									</TouchableOpacity>
								</View>

							))}
						</View>
					}

					<Modal transparent={false} visible={this.state.showModal} animationType="slide">
						<View style={{flex: 1}}>
							<Text style={styles.heading}>Are you sure you want to eliminate {this.state.city.city} and all its locations?</Text>

							<View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', position: 'absolute', bottom: 60}}>
							    <View>
							        <TouchableOpacity style={{backgroundColor: '#e8075d'}} onPress={() =>  this.setState({showModal: false, city: {}})}>
							            <Text style={styles.modalsButtons}>CANCEL</Text>
							        </TouchableOpacity>
							    </View>

							    <View>
							        <TouchableOpacity style={{backgroundColor: '#e8075d'}} onPress={() => this.deleteCity()}>
							            <Text style={styles.modalsButtons}>DELETE</Text>
							        </TouchableOpacity>
							    </View>
							</View>
						</View>
					</Modal>
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
	},

	buttonCity: {
		height: 80,
		backgroundColor: '#dbd5d5',
		justifyContent: 'center',
		alignItems: 'flex-start',
		width: '100%',
		borderBottomColor: '#9c9797',
		borderBottomWidth: 1,
		borderTopColor: '#9c9797',
		borderTopWidth: 1,
		marginBottom: 10		
	},

	textCity: {
		fontSize: 19,
		marginLeft: 10,
		color: '#e8075d'
	},

	textCountry: {
		fontSize: 17,
		marginLeft: 10
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