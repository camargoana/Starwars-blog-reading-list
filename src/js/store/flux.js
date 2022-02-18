const getState = ({ getStore, getActions, setStore }) => {
	return {

		store: {
			baseUrl: "https://www.swapi.tech/api",
			films: [],
			people: [],
			starships: [],
			vehicles: [],
			species: [],
			planets:[],
			favorites:[],
			list:[],
			favorites:[],
			currentItem: undefined
		},

		actions: {
			getDetails: async (resource, uid) => {
				const store = getStore ();
				const response = await fetch(
					`${store.baseUrl}/${resource}/${uid}`
				);
				const body = await response.json();
				if (!response.ok) return;

				const obj = body["result"];
				if(resource === "films"){
					const FilmName = ["Star Wars", "The Empire Strikes Back", "Return of the Jedi", "Ep1 The Phantom Menace"
					, "Ep2 Attack of the clones", "Ep3 Revenge of the Sith"];
					obj.properties.name = FilmName[parseInt(obj.uid)-1]
				}
				setStore({
					currentItem: body
				});
				console.log(store.favorites);
			},
			removecurrentitem: () => setStore({currentItem: undefined}),
			getItems : async (resource) => {
				const store = getStore();
				const response = await fetch(
					`${store.baseUrl}/${resource}`
				);
			
				const body = await response.json();
				if (!response.ok) return;

				const attribute = resource === "films" ? "result": "results";
				const list = body[attribute];

				if(resource === "films"){
					const FilmName = ["Star Wars", "The Empire Strikes Back", "Return of the Jedi", "Ep1 The Phantom Menace"
					, "Ep2 Attack of the clones", "Ep3 Revenge of the Sith"];
					list.forEach(obj => obj.name = FilmName[parseInt(obj.uid)-1]);
				}
				list.forEach( function(obj){
					obj.resource = resource;
					obj.favorite = false;
				});
				setStore({
					[resource]: list
				});
			},

			addFavorite: (item) =>{
				item.favorite = true;
				const store = getStore();
				setStore({
					favorites: [...store.favorites, item]
				});
			},
			
			removeFavorite: (index) =>{
				const store = getStore ();
				let list = store.favorites;
				list[index].favorite = false;
				list.splice(index, 1);
				setStore({
					favorites: [...list]
				});
			}
		}

	};
};

export default getState;
