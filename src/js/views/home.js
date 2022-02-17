import React, { useContext } from 'react';
import "../../styles/home.css";
import { Card } from "../component/Card";
import { Title } from "../component/Title";
import { Context } from "../store/appContext";

export const Home = () => {
	const context = useContext(Context);

	return (
		<div className="container text-left mt-5">

			<Title text="Films" />
			<div className="overflow-auto mb-5">
				<div className="row flex-row flex-nowrap">
					{context.store.films.map((film, index) => {
						return <Card key={`film_${film.uid}`} item={film} resource="films" />
					})}
				</div>
			</div>

			<Title text="People" />
			<div className="overflow-auto mb-5">
				<div className="row flex-row flex-nowrap">
					{context.store.people.map((person, index) => {
						return <Card key={`person_${person.uid}`} item={person} resource="people" />
					})}
				</div>
			</div>

			<Title text="Starships" />
			<div className="overflow-auto mb-5">
				<div className="row flex-row flex-nowrap">
					{context.store.starships.map((starship, index) => {
						return <Card key={`starship_${starship.uid}`} item={starship} resource="starships" />
					})}
				</div>
			</div>

			<Title text="Vehicles" />
			<div className="overflow-auto mb-5">
				<div className="row flex-row flex-nowrap">
					{context.store.vehicles.map((vehicle, index) => {
						return <Card key={`vehicle_${vehicle.uid}`} item={vehicle} resource="vehicles" />
					})}
				</div>
			</div>

			<Title text="Species" />
			<div className="overflow-auto mb-5">
				<div className="row flex-row flex-nowrap">
					{context.store.species.map((species, index) => {
						return <Card key={`species_${species.uid}`} item={species} resource="species" />
					})}
				</div>
			</div>

			<Title text="Planets" />
			<div className="overflow-auto mb-5">
				<div className="row flex-row flex-nowrap">
					{context.store.planets.map((planets, index) => {
						return <Card key={`planets_${planets.uid}`} item={planets} resource="planets" />
					})}
				</div>
			</div>

		</div>
	);
};