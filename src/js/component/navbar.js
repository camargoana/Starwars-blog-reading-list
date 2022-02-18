import React,{ useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/starwars.png"
import grogu from "../../img/grogu.gif"
import { Context } from "../store/appContext";

function unlike(name, index, actions){
	const targetOff = "#"+name+"_off";
	const targetOn = "#"+name+"_on";

	const starOff = document.querySelector(targetOff);
	const starOn = document.querySelector(targetOn);
	
	if(starOff != null){
		starOff.classList.remove('d-none');
		starOn.classList.add('d-none');
	}
	actions.removeFavorite(index);
  }

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
						Favorites <span className="badge rounded-pill bg-secondary">{context.store.favorites.length}</span>
					</button>

					<div className="dropdown-menu dropdown-menu-end" >
						{context.store.favorites.map((fav, index) => {
							return <div className="dropdown-item text-nowrap" key={`item_${fav.resource}_${fav.uid}`} id={`item_${fav.resource}_${fav.uid}`} >
								<Link to={`/${fav.resource}/${fav.uid}`}>{fav.name}</Link> <a className="float-end" href="#" onClick={(e) => unlike(`${fav.resource}_${fav.uid}`, index, context.actions)} ><i className="fas fa-trash text-black"></i></a></div>
						})}
						{
							<div className="text-center">{context.store.favorites.length == 0?"(empty)":""}</div>
						}
					</div>
				</div>
			</div>
		</nav>
	);
};
