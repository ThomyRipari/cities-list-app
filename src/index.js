import React, { Component } from 'react';
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

	addCity = (city) => {
		const { cities } = this.state;

		cities.push(city);

		this.setState({cities});
	}

	render() {
		return (
			<Tabs screenProps={{cities: this.state.cities, addCity: this.addCity}} />
		)
	}
}