import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useContext } from 'react/cjs/react.development';
import "../../styles/home.css";
import { Card } from "../component/Card";
import { Title } from "../component/Title";
import { Context } from "../store/appContext";	

export const Home = () => {
	const baseUrl = "https://www.swapi.tech/api";
	const history = useHistory();
	const context = useContext(Context);
	const [films, setFilms] = useState([]);
	const [people, setPeople] = useState([]);
	const [starships, setStarships] = useState([]);
	const [vehicles, setVehicles] = useState([]);
	const [species, setSpecies] = useState([]);
	const [planets, setPlanets] = useState([]);

	const getFilms = async () => {
		const response = await fetch(
			`${baseUrl}/films`
		);
		const body = await response.json();
		if (response.ok) {
			setFilms(body.result);
		}
	};

	const getPeople = async () => {
		const response = await fetch(
			`${baseUrl}/people`
		);
		const body = await response.json();
		if (response.ok) {
			setPeople(body.results);
		}
	};

	const getStarships = async () => {
		const response = await fetch(
			`${baseUrl}/starships`
		);
		const body = await response.json();
		if (response.ok) {
			setStarships(body.results);
		}
	};

	const getVehicles = async () => {
		const response = await fetch(
			`${baseUrl}/vehicles`
		);
		const body = await response.json();
		if (response.ok) {
			setVehicles(body.results);
		}
	};

	const getSpecies = async () => {
		const response = await fetch(
			`${baseUrl}/species`
		);
		const body = await response.json();
		if (response.ok) {
			setSpecies(body.results);
		}
	};

	const getPlanets = async () => {
		const response = await fetch(
			`${baseUrl}/planets`
		);
		const body = await response.json();
		if (response.ok) {
			setPlanets(body.results);
		}
	};

	useEffect(() => {
		getFilms();
		getPeople();
		getStarships();
		getVehicles();
		getSpecies();
		getPlanets();
	}, []);
	return (
	<div className="text-left mt-5 px-5">
		<div className="container">
			<div className="row justify-content-center">
				<button
					className="btn btn-primary"
					onClick={u => history.push("/other-home")}>
					{"ir al otro home"}
				</button>

			</div>
		</div>

		<Title text="Films" />
		<div className="overflow-auto mb-5">
			<div className="row flex-row flex-nowrap">
				{films.map((film, index) => {
					return <Card key={`film_${film.uid}`} item={film} resource="films" />
				})}
			</div>
		</div>

		<Title text="People" />
		<div className="overflow-auto mb-5">
			<div className="row flex-row flex-nowrap">
				{people.map((person, index) => {
					return <Card key={`person_${person.uid}`} item={person} resource="characters" />
				})}
			</div>
		</div>

		<Title text="Starships" />
		<div className="overflow-auto mb-5">
			<div className="row flex-row flex-nowrap">
				{starships.map((starship, index) => {
					return <Card key={`starship_${starship.uid}`} item={starship} resource="starships" />
				})}
			</div>
		</div>

		<Title text="Vehicles" />
		<div className="overflow-auto mb-5">
			<div className="row flex-row flex-nowrap">
				{vehicles.map((vehicle, index) => {
					return <Card key={`vehicle_${vehicle.uid}`} item={vehicle} resource="vehicles" />
				})}
			</div>
		</div>

		<Title text="Species" />
		<div className="overflow-auto mb-5">
			<div className="row flex-row flex-nowrap">
				{species.map((species, index) => {
					return <Card key={`species_${species.uid}`} item={species} resource="species" />
				})}
			</div>
		</div>

		<Title text="Planets" />
		<div className="overflow-auto mb-5">
			<div className="row flex-row flex-nowrap">
				{planets.map((planets, index) => {
					return <Card key={`planets_${planets.uid}`} item={planets} resource="planets" />
				})}
			</div>
		</div>

	</div>
	);
};