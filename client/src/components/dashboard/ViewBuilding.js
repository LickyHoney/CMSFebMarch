import React, { useRef, useEffect, useState, useMap, createRef } from "react";
import service from './services';
import { EditControl } from "react-leaflet-draw";
import LayersControl2, { ControlledLayerItem } from "./LayerControl2";
import 'leaflet-editable';
import ReactLeafletEditable from 'react-leaflet-editable';
import {
  Map, TileLayer, FeatureGroup, useLeaflet, LayersControl, Marker, Polygon,
  Popup, LayerGroup, Circle, GeoJSON
} from "react-leaflet";
import Control from 'react-leaflet-control';

import L from "leaflet";

import { CardBody, Card, ButtonGroup, ButtonToolbar, Form, FormGroup, Label, Input, ModalHeader, Modal, ModalBody, ModalFooter } from 'reactstrap';

function EditableLayer(props) {
  const leaflet = useLeaflet();
  const editLayerRef = React.useRef();
  const mapRef = props.mapRef;

  let drawControlRef = React.useRef();

  let { map } = leaflet;

  useEffect(() => {

    if (!props.showDrawControl) {
      map.removeControl(drawControlRef.current);
    } else {
      map.addControl(drawControlRef.current);
    }

    editLayerRef.current.leafletElement.clearLayers();

    editLayerRef.current.leafletElement.addLayer(props.layer);
    props.layer.on("click", function (e) {
      props.onLayerClicked(e, drawControlRef.current);
    });
  }, [props, map]);

  function onMounted(ctl) {
    drawControlRef.current = ctl;
  }

  return (
    <div>
      <FeatureGroup ref={editLayerRef}>
        <EditControl
          position="bottomright"
          onMounted={onMounted}
          {...props}
        />
      </FeatureGroup>
    </div>
  );
}

function EditableGroup(props) {

  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);

  function handleLayerClick(e, drawControl) {
    setSelectedLayerIndex(e.target.feature.properties.editLayerId);
  }




  let dataLayer = new L.GeoJSON(props.data);
  let layers = [];
  let i = 0;
  dataLayer.eachLayer((layer) => {
    layer.feature.properties.editLayerId = i;
    layer.pathOptions = { color: 'red' };
    layers.push(layer);
    i++;
  }).bind(this);
  const purpleOptions = { color: 'purple' }
  return (
    <div>
      {layers.map((layer, i) => {

        return (
          <EditableLayer
            key={i}
            layer={layer}
            pathOptions={purpleOptions}
            showDrawControl={i === selectedLayerIndex}
            onLayerClicked={handleLayerClick}
            mapRef={props.map}
          />
        );

      })}
    </div>
  );
}


const ViewBuilding = (props) => {

  const [markers, setMarkers] = useState([])
  const [details, setDetails] = useState('')
  const [newPosition, setNewPosition] = useState([])

  const [mapLayers, setMapLayers] = useState([]);
  const [customLayer, setCustomLayer] = useState('');
  const purpleOptions = { color: 'purple' }
  const mapRef = useRef();
  const fgRef = useRef();
  const refno = window.location.pathname.replace('/ViewBuilding/', '');
  const mRef = createRef();
  const eRef= createRef();
  const leaflet = useLeaflet();
  const editLayerRef = React.useRef();
  //const mapRef = props.mapRef;

  let drawControlRef = React.useRef();

  let { map } = leaflet;

  useEffect(() => {

    if (!props.showDrawControl) {
      map.removeControl(drawControlRef.current);
    } else {
      map.addControl(drawControlRef.current);
    }

    editLayerRef.current.leafletElement.clearLayers();

    editLayerRef.current.leafletElement.addLayer(props.layer);
    props.layer.on("click", function (e) {
      props.onLayerClicked(e, drawControlRef.current);
    });
  }, [props, map]);

  function onMounted(ctl) {
    drawControlRef.current = ctl;
  }


  const polygon = [
    
  ]
  const center = [51.505, -0.09]
  const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
  ]

  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);

  const _onFeatureGroupReady = (ref) => {
    if (ref !== undefined && ref !== null) {
      let leafletFG = ref.leafletElement;
      if (customLayer.length > 0) {
        customLayer.eachLayer(layer => leafletFG.addLayer(layer));
      }
    }
  }

 const editPolygon = () => {
    eRef.current.startPolygon()
}

  function onFloorSelect(e, data) {
    const index = e.target.value;
    // let localFloorLayers = customLayer;
    // localFloorLayers = mapLayers[0].layers.getLayers()[0];
    //localFloorLayers= [];
    // localFloorLayers.push(mapLayers[index].layers);
    setCustomLayer(markers[index]);


    debugger;
  }
  function handleLayerClick(e, drawControl) {
    setSelectedLayerIndex(e.target.feature.properties.editLayerId);
  }

  const addressCardStyle = {
    backgroundImage: `url(${require('./33.png')})`,

    backgroundSize: 'cover',

    height: "423px",

  }
  let layers = [];
  let i = 0;
  let floor = {};
  useEffect(() => {

    service
      .getBuilding(refno)
      .then(selBuilding => {
        console.log("returning", selBuilding)

        setMarkers(selBuilding[0].floors);
        const detailsLcl = details;
        
          setDetails(selBuilding[0]);  
        let ml = mapLayers;
        ml = [];


        for (let ix = 0; ix < selBuilding[0].floors.length; ix++) {
          floor = selBuilding[0].floors[ix];

          let dataLayer = new L.GeoJSON(floor.features);
          //let ml = mapLayers;

          // dataLayer.eachLayer((layer) => {
          //   //layer.data = floor;
          //   layer.feature.properties.editLayerId = i;
          //   layer.pathOptions = { color: 'red' };
          //   layers.push(layer);
          //   i++;
          // });

          ml.push({ layers: dataLayer, floor: floor });

        }


        setMapLayers(ml);
        // let dataLayer2 = new L.GeoJSON(selBuilding[0].floors);
        //         let loclLayer = customLayer;


        //         loclLayer.push(dataLayer2.getLayers());
        //          let newLayer = loclLayer[0];
        //         setCustomLayer(newLayer);



      })
  }, [])



  // useEffect(() => {


  //     service
  //         .getBuilding(refno)
  //         .then(latlng => {
  //             //console.log(LayersControl.getActiveBaseLayer().name)
  //          //   console.log("returning", latlng)

  //             setMarkers(...markers, latlng)
  //             //setMarkers(latlng[0])
  //             console.log("markers", markers)


  //         })


  // }, [])
  var selectedFeature = null;
//edit the targeted polygon
function onEachFeature1 () {
  debugger;
     //mapLayers.addLayer(layer);
     mapLayers.on('click', function(e){
          if(selectedFeature)
               selectedFeature.editing.disable();
          selectedFeature = e.target;
          e.target.editing.enable();
     });
}

  return (

    <div>

      <div className="row" style={{ margin: ".6%" }}>

        <div className="col-lg-4">
          <div className="iq-card iq-card-block iq-card-stretch iq-card-height bg-transparent">
            <div className="iq-card-body rounded p-0" style={addressCardStyle} >
              <div className="iq-caption">
                <h1>{details.name}</h1>
                <h3>{details.description}</h3>
                <h3>{details.Apartment} {markers.street}</h3>
                <h3>{details.region} {markers.pincode}</h3>
                <h3>{details.country}</h3>
              </div>
            </div>
          </div>
        </div>


        <div className="col-lg-8">
          <div className="iq-card overflow-hidden">

            <div id="home-chart-02">
            <ReactLeafletEditable
                ref={mRef}
             >
              <Map center={[60.21846434365596, 24.811831922452843]} zoom={17} ref={mapRef} >

                <LayersControl position="topright">
                  <LayersControl.BaseLayer
                    checked={false}
                    name="Esri WorldImagery"
                    group="BaseLayers"
                  >
                    <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
                      attribution='&copy; <a href="Esri &mdash">Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community</a> contributors'
                    />
                  </LayersControl.BaseLayer >
                  <LayersControl.BaseLayer
                    checked={true}
                    name="OpenStreetMap"
                    group="BaseLayers"
                  >
                    <TileLayer
                      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                  </LayersControl.BaseLayer >

                </LayersControl>

                <GeoJSON key={Math.random()}
                  data={customLayer}
                  onEachFeature ={onEachFeature1}
                ></GeoJSON>

                <GeoJSON key={Math.random()}
                  data={details.boundary}
                ></GeoJSON>
              {/* <LayersControl2 position="topright">
                <LayerGroup>

               <EditableLayer
            key={i}
            layer={mapLayers}
            pathOptions={purpleOptions}
            showDrawControl={i === selectedLayerIndex}
            onLayerClicked={handleLayerClick}
            mapRef={props.map}
          />
          </LayerGroup>
          </LayersControl2> */}
                <Control position="topright" >
                  {
                    markers.map((mLr, didx) => (



                      <div>

                        <button class="primary" value={didx} onClick={onFloorSelect} style={{"font-size": "1.5rem","margin-left":".05rem"}}>
                          {mLr.name}
                        </button>
                        

                       
                      </div>
                    ))

                  }
                  <button
                        onClick={onEachFeature1}
                        className="editable-btn"
                    >polygon</button>
                </Control>


              </Map>
              </ReactLeafletEditable>
            </div>
          </div>
        </div>
      </div>




    </div>
  )
}


export default ViewBuilding;