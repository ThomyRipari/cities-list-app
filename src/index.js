import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

/* Import Components */
import Cities from './components/Cities/Cities';
import City from './components/Cities/City';
import AddCity from './components/AddCity/AddCity';

const citiesNavigator = createStackNavigator({
	city: { screen: City },
	cities: { screen: Cities }
}, {
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: '#deac21',
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
	render() {
		return (
			<Tabs />
		)
	}
}