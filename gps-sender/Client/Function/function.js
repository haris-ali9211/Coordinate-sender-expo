import { decode } from "@mapbox/polyline"; //please install this package before running!
const getDirections = async (startLoc, destinationLoc) => {
    try {
        const KEY = "YOUR GOOGLE API KEY"; //put your API key here.
        //otherwise, you'll have an 'unauthorized' error.
        let resp = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
        );
        let respJson = await resp.json();
        let points = decode(respJson.routes[0].overview_polyline.points);
        console.log(points);
        let coords = points.map((point, index) => {
            return {
                latitude: point[0],
                longitude: point[1]
            };
        });
        return coords;
    } catch (error) {
        return error;
    }
};