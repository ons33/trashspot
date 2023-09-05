import satellite from '../assets/img/satellite.png';
import street from '../assets/img/street.png';
import plastic from '../assets/img/trashSpotIcons/plastic.png';
import steel from '../assets/img/trashSpotIcons/steel.png';
import paper from '../assets/img/trashSpotIcons/paper.png';
import other from '../assets/img/trashSpotIcons/other.png';
import './map.css';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { Marker } from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken =
  'pk.eyJ1IjoibWFoZGktZ2hhbGkiLCJhIjoiY2tzbWRsejdpMTVuOTJ6cW9zODZ5cXV6NyJ9.__WVxi-9jg_W9Tqp4OnfwA';

function MapTrashSpot(props) {
  var markerHtml, markerOnMap, markerOnMapNewMark, markerHtmlNewMark;
  const [currentLat, setCurrLat] = useState(0);
  const [currentLong, setCurrLong] = useState(0);
  const [lng, setLng] = useState(10.186485650856355);
  const [lat, setLat] = useState(36.800332419382556);
  const [zoom, setZoom] = useState(9);
  const [north, setNorth] = useState(11.616843847969932);
  const [south, setSouth] = useState(7.5377456491581825);
  const [west, setWest] = useState(31.30138219902);
  const [east, setEast] = useState(37.49987062838234);
  const [mapStyle, setMapStyle] = useState(
    'mapbox://styles/mapbox/streets-v11'
  );
  const [selectedLat, setSelectedLat] = useState(0);
  const [selectedLong, setSelectedLong] = useState(0);
  const mapContainer = useRef(null);
  var map = useRef(null);
  var selectedLat1 = 0;
  var selectedLong1 = 0;

  var markerHtml = document.createElement('div');
  markerHtml.style.display = 'block';
  markerHtml.className = 'marker MarkerByUser';
  markerHtml.textContent = 'Add';
  markerHtml.addEventListener('click', function (e) {
    e.stopPropagation();
    if (props.currLat != 0) {
      props.getPosition({ lat: props.currLat, long: props.currLong });
      props.openCloseModal();
    } else {
      alert('You need to give position access to the website!');
    }
  });

  var markerHtmlNewMark = document.createElement('div');
  markerHtmlNewMark.style.display = 'block';
  markerHtmlNewMark.className = 'marker MarkerByUser';
  markerHtmlNewMark.textContent = 'Add';
  markerHtmlNewMark.addEventListener('click', function (e) {
    e.stopPropagation();
    props.getPosition({ lat: selectedLat1, long: selectedLong1 });
    props.openCloseModal();
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on('click', (e) => {
      console.log([e.lngLat.lng, e.lngLat.lat]);
      markerOnMapNewMark = new mapboxgl.Marker(markerHtmlNewMark, {
        offset: [0, -50 / 2],
      });
      markerOnMapNewMark.setLngLat([e.lngLat.lng, e.lngLat.lat]);

      deleteMarkers();
      markerOnMapNewMark.addTo(map.current);
      selectedLat1 = e.lngLat.lat;
      selectedLong1 = e.lngLat.lng;
      // }
    });
  }, [map.current]);

  const bounds = [
    [south, west],
    [north, east],
  ]; // Tunisia boundary

  // useEffect(()=>{
  //   setCurrLong(props.currLong)
  //   setCurrLat(props.currLat)
  //   setSelectedLat(props.currLat)
  //   setSelectedLong(props.currLong)
  // },[]);

  useEffect(() => {
    if (!map.current) return;
    map.current.on('move', () => {
      var south = map.current.getBounds()._sw.lng;
      var east = map.current.getBounds()._ne.lat;
      if (markerOnMapNewMark) {
        if (
          markerOnMapNewMark._lngLat.lng < south ||
          markerOnMapNewMark._lngLat.lat > east
        ) {
          markerHtmlNewMark.style.display = 'none';
        } else {
          markerHtmlNewMark.style.display = 'block';
        }
      }

      if (markerOnMap) {
        if (markerOnMap._lngLat.lng < south || markerOnMap._lngLat.lat > east) {
          markerHtml.style.display = 'none';
        } else {
          markerHtml.style.display = 'block';
        }
      }
    });
  }, []);

  useEffect(() => {
    if (map.current) {
      if (currentLat != 0 && !markerHtml) {
        map.current.setZoom(15);
        map.current.setCenter([currentLong, currentLat]);
      }
      return;
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      maxBounds: bounds,
      zoom: zoom,
    });
  }, [currentLat]);

  const changeStyle = () => {
    if (mapStyle.includes('satellite')) {
      document.getElementById(
        'changestyle'
      ).style.backgroundImage = `url(${street})`;
      setMapStyle('mapbox://styles/mapbox/streets-v11');
    } else {
      document.getElementById(
        'changestyle'
      ).style.backgroundImage = `url(${satellite})`;
      setMapStyle('mapbox://styles/mapbox/satellite-streets-v11');
    }
  };

  const deleteMarkers = () => {
    let markers = document.getElementsByClassName('MarkerByUser');
    for (let i = 0; i < markers.length; i++) {
      markers[i].remove();
    }
  };

  useEffect(() => {
    if (
      props.trashMarks.length > 0 &&
      props.trashMarks.filter((trash) => trash == undefined).length !=
        props.trashMarks.length
    ) {
      props.trashMarks.forEach((trash) => {
        addASpotMarker(trash);
      });
    }
  }, [props.trashMarks]);

  useEffect(() => {
    if (Object.keys(props.addMapMarker).length > 0) {
      deleteMarkers();
      addASpotMarker(props.addMapMarker);
    }
  }, [props.addMapMarker]);

  useEffect(() => {
    if (props.jumpTo[0] != 0) {
      map.current.jumpTo({
        center: [props.jumpTo[1], props.jumpTo[0]],
        zoom: 12,
      });
    }
  }, [props.jumpTo]);

  const addASpotMarker = (trash) => {
    createANewMarker(trash, trash.id);
    
    var checkMark = document.getElementsByClassName("rounded"+trash.id)
    if (checkMark.length>0){
      return ;
    }
    var blueCircleRange = document.createElement('div');
    blueCircleRange.className = 'roundedGround rounded' + trash.id;
    const scale = Math.pow(2, map.current.getZoom());
    blueCircleRange.style.width = scale * 0.04 * 0.76 + 'px';
    blueCircleRange.style.height = scale * 0.04 * 0.76 + 'px';

    map.current.on('zoom', function () {
      const scale = Math.pow(2, map.current.getZoom());
      blueCircleRange.style.width = scale * 0.04 * 0.76 + 'px';
      blueCircleRange.style.height = scale * 0.04 * 0.76 + 'px';
      var newTop = '0px';
      if (scale < 3500) {
        newTop =
          3.9473684210526e-6 * scale ** 2 -
          0.0041973684210526 * scale +
          10.1073684210526 +
          'px';
      }
      blueCircleRange.style.top = newTop;
      // set css size based on scale
    });
    var doura = new mapboxgl.Marker(blueCircleRange, { offset: [0, -50 / 2] });
    doura.setLngLat([trash.longitude, trash.latitude]);
    doura.addTo(map.current);
  };

  useEffect(() => {
    if (props.deleteRoundedAndCreateAnother.length > 0) {
      let roudedMarker = document.getElementsByClassName(
        'rounded' + props.deleteRoundedAndCreateAnother[1]
      );
      console.log("this is roundedMarker",roudedMarker)
      if (roudedMarker.length>0) {
        // roudedMarker.remove();
        for (let i = 0; i < roudedMarker.length; i++) {
          roudedMarker[i].remove();
        }
        console.log("this is yes",roudedMarker)
        if (props.deleteRoundedAndCreateAnother[0]['ownerId']) {
          let typeTrash = {
            id: props.deleteRoundedAndCreateAnother[0]._id,
            longitude:
              props.deleteRoundedAndCreateAnother[0].location.coordinates[1],
            latitude:
              props.deleteRoundedAndCreateAnother[0].location.coordinates[0],
            ownerId: props.deleteRoundedAndCreateAnother[0].ownerId._id,
            type: props.deleteRoundedAndCreateAnother[0].type,
          };
          addASpotMarker(typeTrash);
        }
      }
    }
  }, [props.deleteRoundedAndCreateAnother]);

  const createANewMarker = (trash, directTo, theTrash = '') => {
    var checkMark = document.getElementsByClassName("marker"+trash.id)
    if (checkMark.length>0){
      return;
    }
    var markerTrashHtml = document.createElement('div');
    markerTrashHtml.style.display = 'block';
    switch (trash.type) {
      case 'plastic':
        markerTrashHtml.style.backgroundImage = `url(${plastic})`;
        markerTrashHtml.style.backgroundColor = '#eeff5c';
        break;
      case 'steel':
        markerTrashHtml.style.backgroundImage = `url(${steel})`;
        markerTrashHtml.style.backgroundColor = 'black';
        break;
      case 'paper':
        markerTrashHtml.style.backgroundColor = 'white';
        markerTrashHtml.style.backgroundImage = `url(${paper})`;
        break;
      default:
        markerTrashHtml.style.backgroundColor = 'green';
        markerTrashHtml.style.backgroundImage = `url(${other})`;
    }
    if (trash.ownerId == props.myid) {
      markerTrashHtml.style.backgroundColor = '#d55e00';
    }
    markerTrashHtml.className = 'marker trashSpot marker' + trash.id;
    // markerTrashHtml.hidden = "true"
    // markerTrashHtml.id = 'marker' + trash.id;
    var markerTrashMark = new mapboxgl.Marker(markerTrashHtml, {
      offset: [0, -50 / 2],
    });
    markerTrashMark.setLngLat([trash.longitude, trash.latitude]);
    markerTrashMark.addTo(map.current);
    markerTrashHtml.addEventListener('click', function (e) {
      e.stopPropagation();
      props.showTheRightTrash(directTo, theTrash);
      // if (trash.ownerId==props.myid){
      //   props.showMyTrashSpots()
      // }else{
      //   props.showAllTrashSpotsSaufMine()
      // }
      console.log('redirecting to ...', directTo);
      // window.location = "#"+directTo;
    });

    map.current.on('move', () => {
      var south = map.current.getBounds()._sw.lng;
      var east = map.current.getBounds()._ne.lat;
      if (markerTrashMark) {
        if (
          markerTrashMark._lngLat.lng < south ||
          markerTrashMark._lngLat.lat > east
        ) {
          markerTrashHtml.style.display = 'none';
        } else {
          markerTrashHtml.style.display = 'block';
        }
      }
    });
  };

  useEffect(() => {
    if (props.newTrash != '') {
      let typeTrash = {
        id: props.newTrash[0]._id,
        longitude: props.newTrash[0].location.coordinates[1],
        latitude: props.newTrash[0].location.coordinates[0],
        ownerId: props.newTrash[0].ownerId._id,
        type: props.newTrash[0].type,
        hide_id: props.newTrash[1]._id,
      };
      createANewMarker(typeTrash, props.newTrash[1], props.newTrash[0]);
      let markToRemove = document.getElementsByClassName(
        'marker' + props.newTrash[0].hide_id
      );
      if (markToRemove.length>0){
        for (let i = 0; i < markToRemove.length; i++) {
          markToRemove[i].remove();
        }
      } 
    }
  }, [props.newTrash]);

  const locateMe = () => {
    if (props.currLong != 0) {
      markerOnMap = new mapboxgl.Marker(markerHtml, { offset: [0, -50 / 2] });
      deleteMarkers();
      markerOnMap.setLngLat([props.currLong, props.currLat]);
      markerOnMap.addTo(map.current);
      map.current.setZoom(15);
      map.current.setCenter([props.currLong, props.currLat]);
    }
  };
  useEffect(() => {
    if (map.current) map.current.setStyle(mapStyle);
    if (mapStyle.includes('satellite')) {
      document.getElementById(
        'changestyle'
      ).style.backgroundImage = `url(${street})`;
    } else {
      document.getElementById(
        'changestyle'
      ).style.backgroundImage = `url(${satellite})`;
    }
  }, [mapStyle]);

  useEffect(() => {
    if (props.mapMarkerRemoverTrigger.length > 0) {
      console.log(props.mapMarkerRemoverTrigger, "remove the marker")
      let marker = document.getElementsByClassName(
        'marker' + props.mapMarkerRemoverTrigger
      );
      for (let i = 0; i < marker.length; i++) {
        marker[i].remove();
      }
      marker = document.getElementsByClassName('MarkerByUser');
      for (let i = 0; i < marker.length; i++) {
        marker[i].remove();
      }
    }
  }, [props.mapMarkerRemoverTrigger]);

  return (
    <>
      <div ref={mapContainer} className="map-container">
        <button
          className="changestyle"
          id="changestyle"
          onClick={changeStyle}
        ></button>
        <button className="locateMe" onClick={locateMe}>
          Locate Me
        </button>
      </div>
    </>
  );
}

export default MapTrashSpot;
