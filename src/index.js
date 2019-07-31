import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

/* Import Components */
import Cities from './components/Cities/Cities';
import City from './components/Cities/City';
import AddCity from './components/AddCity/AddCity';

const citiesNavigator = createStackNavigator({
	Cities: { screen: Cities },
	City: { screen: City }
}, {
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: '#e8075d'
		},
		headerTintColor: '#fff'
	}
})

const Tabs = createAppContainer(
	createBottomTabNavigator({
		Cities: { screen: citiesNavigator },
		AddCity: { screen: AddCity }
	})
)

export default class App extends Component {
	state = {
		cities: []
	}

	async componentDidMount() {
		try {
			const cities = await AsyncStorage.getItem('cities');
			console.log(cities);
			this.setState({
				cities: JSON.parse(cities) || []
			})
		} catch (e) {
			console.log('error: ', e);
		}
	}

	addCity = (city) => {
		const { cities } = this.state;

		cities.push(city);

		AsyncStorage.setItem('cities', JSON.stringify(cities))

		.then(() => console.log('CITIES STORED'))
		.catch(error => console.log('error: ', error))

		this.setState({cities});
	}

	addLocation = (location, city) => {
		const cityIndex = this.state.cities.findIndex(item => item.id === city.id);

		const cityToAddLocation = this.state.cities[cityIndex];
		cityToAddLocation.locations.push(location);

		const cities = [
			...this.state.cities.slice(0, cityIndex),
			cityToAddLocation,
			...this.state.cities.slice(cityIndex + 1)
		]

		this.setState({cities}, () => {
			AsyncStorage.setItem('cities', JSON.stringify(cities))

			.then(() => console.log('CITIES WITH NEW LOCATIONS STORED'))
			.catch(error => console.log('error: ', error))
		})

	}

	render() {
		return (
			<Tabs screenProps={{cities: this.state.cities, addCity: this.addCity, addLocation: this.addLocation}} />
		)
	}
}