import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import img600x400 from "../../img/600x400.jpg"
import img400x400 from "../../img/400x400.jpg"

export const Details = (props) => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	const mapTitle = {
		"films": ["Producer", "Title", "Episode", "Director", "Release"]
		, "people": ["Mass", "Hair", "Skin", "Eye", "Birth", "Gender"]
		, "starships": [, "Model", "Mstarship_class", "Manufacturer", "Length", "Cargo_capacity", "Consumables",]
		, "vehicles": ["Model", "Class", "Manufacturer", "Length", "Capacity", "Consumables",]
		, "species": ["Classification", "Designation", "Height", "Lifespan", "Hair", "Skin", "Eye", "Language",]
		, "planets": ["Diameter", "Rotation", "Orbital", "Gravity", "Population", "Climate", "Terrain", "Surface",]
	}
	const mapValue = {
		"films": ["producer", "title", "episode_id", "director", "release_date"]
		, "people": ["mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender",]
		, "starships": ["model", "mstarship_class", "manufacturer", "length", "cargo_capacity", "consumables",]
		, "vehicles": ["model", "vehicle_class", "manufacturer", "length", "cargo_capacity", "consumables",]
		, "species": ["classification", "designation", "average_height", "average_lifespan", "hair_colors", "skin_colors", "eye_colors", "language",]
		, "planets": ["diameter", "rotation_period", "orbital_period", "gravity", "population", "climate", "terrain", "surface_water",]
	}

	const infoTitle = mapTitle[params.resource];
	const infoValue = mapValue[params.resource];
	const imgResource = params.resource==="people"?"characters":params.resource;

	useEffect(() => {
		if (params.resource && params.id) {
			const detailsResource = params.resource;
			actions.getDetails(params.resource, params.id);
		}
		return () => {
			actions.removecurrentitem();
		}
	}, []);
	return (
		<div className="container">
			{
				store.currentItem && (
					<div>
						<div className="row">
							<div className="col-12 col-sm-6 col-md-4">
								<img src={`https://starwars-visualguide.com/assets/img/${imgResource}/${params.id}.jpg`}
									onError={({ currentTarget }) => {
										let srcImage = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
										switch (params.resource) {
											case "planets":
												srcImage = img400x400;
												break;
											case "starships":
												srcImage = img600x400;
												break;
										}

										currentTarget.onerror = null; // prevents looping
										currentTarget.src = srcImage;
									}}
									className="img-fluid w-100"
								/>
								<br /><br />
							</div>
							<div className="col-6">
								<h2>{store.currentItem.result.properties.name}</h2>

								<p>
									{store.currentItem.result.properties.opening_crawl}
									{store.currentItem.result.description}
								</p>
							</div>
						</div>
						<div className="row border-top border-dark">
							{infoTitle.map((title, index) => {
								let properties = store.currentItem.result.properties;
								let key = infoValue[index];
								return <div className="col" key={`item_${index}`}><h4 style={{ width: "200px" }}>{`${title}`}</h4>{`${properties[key]}`}</div>
							})}
						</div>
					</div>
				)

			}

		</div>

	);
};
Details.propTypes = {
	match: PropTypes.object

};
