import React from "react";
import propTypes from "prop-types";
import img600x400 from "../../img/600x400.jpg"
import img400x400 from "../../img/400x400.jpg"

function prueba(name){
  const targetOff = "#"+name+"_off";
  const targetOn = "#"+name+"_on";

  console.log(targetOff);
  document.querySelector(targetOff).classList.add('d-none');
  document.querySelector(targetOn).classList.remove('d-none');
}

export const Card = ({ item, resource }) => {
  const imgResource = resource==="people"?"characters":resource;

  

  return (
    <div className="card my-3 mx-3 p-0" style={{ width: "18rem" }}>
      <img src={`https://starwars-visualguide.com/assets/img/${imgResource}/${item.uid}.jpg`} 
        onError={({ currentTarget }) => {
          let srcImage = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
          switch(resource){
            case "planets":
              srcImage = img400x400;
              break;
            case "starships":
              srcImage = img600x400;
              break;
          }

          currentTarget.onerror = null; // prevents looping
          currentTarget.src=srcImage;
        }}
        className = "card-img-top w-100"
      />
      <div className="card-body">
          <h5>{item.name}</h5>
      </div>
        
      <div className="card-footer border-0 bg-white">
        <a href={`/${resource}/${item.uid}`} className="btn btn-outline-primary">Learn more!</a>
        <a id={`${resource}_${item.uid}_off`} className="btn btn-outline-warning float-end " onClick={(e) => prueba(`${resource}_${item.uid}`)} >
          <i className= "far fa-heart"></i>
        </a>
        <a id={`${resource}_${item.uid}_on`} className="btn btn-outline-warning float-end d-none">
          <i className= "fas fa-heart"></i>
        </a>
      </div>
    </div>
  );

}

Card.propTypes = {
  item: propTypes.object,
  resource: propTypes.oneOf(["films", "people", "starships", "vehicles", "species", "planets"])


};