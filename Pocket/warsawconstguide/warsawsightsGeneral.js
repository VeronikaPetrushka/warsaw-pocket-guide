import { LazienkiPark, OldTown, PlacKulturyNauki, WarsawUprisingMuseum, RoyalCastle } from "../warsawimprtsguide/warsawimgs";

const warsawsightsGeneral = [
    {
        heading: 'The Royal Castle (Zamek Królewski)',
        address: 'plac Zamkowy 4, 00-277 Warszawa',
        description: [
            'The Royal Castle is a historic castle located in the heart of Warsaw. It served as the official residence of the Polish monarchs and is a symbol of Poland`s history and culture. ',
            'The castle was reconstructed after its destruction during World War II and now houses a museum featuring stunning art collections, royal apartments, and historical exhibitions.'
        ],
        image: RoyalCastle,
        coordinates: [21.001459, 52.248204]
    },
    {
        heading: 'Łazienki Park (Łazienki Królewskie)',
        address: 'Agrykola 1, 00-460 Warszawa',
        description: [
            'Łazienki Park is a beautiful and expansive park in the center of Warsaw, known for its picturesque landscapes, palaces, and gardens. ',
            'The park is home to the famous Chopin Monument, which honors the composer Frédéric Chopin. Visitors can stroll through the park`s serene pathways, enjoy the greenery, and even catch free piano concerts during the summer.'
        ],
        image: LazienkiPark,
        coordinates: [21.03257, 52.21104]
    },
    {
        heading: 'Warsaw Uprising Museum (Muzeum Powstania Warszawskiego)',
        address: 'Grzybowska 79, 00-844 Warszawa',
        description: [
            'The Warsaw Uprising Museum is dedicated to the Warsaw Uprising of 1944, a major event during World War II when Polish resistance fighters attempted to liberate the city from German occupation.',
            'The museum features interactive exhibits, personal stories, and artifacts that provide insight into the struggles and heroism of the Polish people during this tumultuous period.'
        ],
        image: WarsawUprisingMuseum,
        coordinates: [20.98115, 52.23253] 
    },
    {
        heading: 'Palace of Culture and Science (Pałac Kultury i Nauki)',
        address: 'plac Defilad 1, 00-901 Warszawa',
        description: [
            'The Palace of Culture and Science is an iconic skyscraper in Warsaw, gifted to Poland by the Soviet Union in the 1950s. It is one of the tallest buildings in Poland and serves as a cultural and educational center.',
            'Visitors can take an elevator to the observation deck for panoramic views of the city and explore various theaters, museums, and conference halls within the palace.'
        ],
        image: PlacKulturyNauki,
        coordinates: [21.00383, 52.22567]
    },
    {
        heading: 'Old Town (Stare Miasto)',
        address: 'Świętojańska 8, 00-278 Warszawa',
        description: [
            'Warsaw`s Old Town is a UNESCO World Heritage Site, known for its charming cobblestone streets, colorful buildings, and historical significance. The area was meticulously rebuilt after being destroyed during World War II.',
            'Highlights include the Market Square, where visitors can find cafes, shops, and street performers, as well as the Royal Route that connects key historical sites throughout the city.'
        ],
        image: OldTown,
        coordinates: [21.01361, 52.24773]
    }
];

export default warsawsightsGeneral;