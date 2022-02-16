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
			favorites:[{id:"film_1", name:"Item1"},{id:"film_2", name:"Item2"},{id:"film_3", name:"Item3"}],
			currentItem: undefined,
			
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
					list.forEach(
						obj => obj.name = FilmName[parseInt(obj.uid)-1]
					);
				}
				setStore({
					[resource]: list
				});
			}
		}

	};
};

export default getState;
