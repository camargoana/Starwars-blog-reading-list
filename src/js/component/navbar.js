import React from "react";
import { useContext } from 'react/cjs/react.development';
import { Link } from "react-router-dom";
import logo from "../../img/starwars.png"
import grogu from "../../img/grogu.gif"
import { Context } from "../store/appContext";

export const Navbar = () => {
	const context = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-dark mb-3 navbar-black">
			<div className="container">
				<div>
					<Link to="/">
						<img src={logo} /> &nbsp;
						<img src={grogu} width="100px" height="100px" />
					</Link>
				</div>
				<div className="dropdown ml-auto">
					<button className="btn btn-primary btn-lg text-white dropdown-toggle" data-bs-toggle="dropdown">
						Favoritos <span className="badge rounded-pill bg-secondary">0</span>
					</button>

					<div className="dropdown-menu dropdown-menu-end" >
						{context.store.favorites.map((fav, index) => {
							return <div className="dropdown-item text-nowrap" key={`item_${fav.id}`} id={fav.id} ><a href="#">{fav.name}</a> <a className="float-end" href="#"><i className="fas fa-trash text-black"></i></a></div>
						})}
					</div>
				</div>
			</div>
		</nav>
	);
};
