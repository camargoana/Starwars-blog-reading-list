import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import propTypes from "prop-types";
import img600x400 from "../../img/600x400.jpg"
import img400x400 from "../../img/400x400.jpg"

function like(name, item, actions) {
  const targetOff = "#" + name + "_off";
  const targetOn = "#" + name + "_on";

  console.log(item);

  document.querySelector(targetOff).classList.add('d-none');
  document.querySelector(targetOn).classList.remove('d-none');
  actions.addFavorite(item);
}

export const Card = ({ item, resource }) => {
  const { store, actions } = useContext(Context);
  const imgResource = resource === "people" ? "characters" : resource;

  return (
    <div className="card my-3 mx-3 p-0" style={{ width: "18rem" }}>
      <img src={`https://starwars-visualguide.com/assets/img/${imgResource}/${item.uid}.jpg`}
        onError={({ currentTarget }) => {
          let srcImage = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
          switch (resource) {
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
        className="card-img-top w-100"
      />
      <div className="card-body">
        <h5>{item.name}</h5>
      </div>

      <div className="card-footer border-0 bg-white">
        <Link to={`/${resource}/${item.uid}`} className="btn btn-outline-primary">
          Learn more!
        </Link>
        <a id={`${resource}_${item.uid}_off`} className={`btn btn-outline-warning float-end ${item.favorite?"d-none":""}`} onClick={(e) => like(`${resource}_${item.uid}`, item, actions)} >
          <i className="far fa-heart"></i>
        </a>
        <a id={`${resource}_${item.uid}_on`} className={`btn btn-outline-warning float-end ${item.favorite?"":"d-none"}`}>
          <i className="fas fa-heart"></i>
        </a>
      </div>
    </div>
  );

}

Card.propTypes = {
  item: propTypes.object,
  resource: propTypes.oneOf(["films", "people", "starships", "vehicles", "species", "planets"])
};