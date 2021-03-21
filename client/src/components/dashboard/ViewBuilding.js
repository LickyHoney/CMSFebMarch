
import React, { useRef, useEffect, useState, useMap } from "react";
import service from './services';

import {
  Map, TileLayer, FeatureGroup, useLeaflet, LayersControl, Marker, Polygon,
  Popup, LayerGroup, Circle
} from "react-leaflet";

import { EditControl } from "react-leaflet-draw";
import L from "leaflet";

import LayersControl2, { ControlledLayerItem } from "./LayerControl2";

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
          position="topright"
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
  const [newPosition, setNewPosition] = useState([])

  const [mapLayers, setMapLayers] = useState([]);
  const [customLayer, setCustomLayer] = useState([]);

  const mapRef = useRef();
  const refno = window.location.pathname.replace('/ViewBuilding/', '');
  const center = [51.505, -0.09]
  const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
  ]

  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);

  function handleLayerClick(e, drawControl) {
    setSelectedLayerIndex(e.target.feature.properties.editLayerId);
  }
  const purpleOptions = { color: 'purple' }

  const addressCardStyle = {
    backgroundImage: `url(${require('./33.png')})`,

    backgroundSize: 'cover',

    height: "423px",

  }
  let layers = [];
  let i = 0;
  
  useEffect(() => {

    service
      .getBuilding(refno)
      .then(selBuilding => {
        console.log("returning", selBuilding)

        setMarkers(selBuilding)


        for (let ix = 0; ix < selBuilding[0].floors.length; ix++) {
          const floor = selBuilding[0].floors[ix];
          
          let dataLayer = new L.GeoJSON(floor.features);

          
          let ml = mapLayers;
          ml =[];
          

          dataLayer.eachLayer((layer) => {
            debugger;
            layer.feature.properties.editLayerId = i;
            layer.pathOptions = { color: 'red' };
            layers.push(layer);
            i++;
          });
         




          ml.push(layers);
          setMapLayers(ml);
          

        }

        
let dataLayer2 = new L.GeoJSON(selBuilding[0].floors);
        let loclLayer = customLayer;
         

        loclLayer.push(dataLayer2.getLayers());
         let newLayer = loclLayer[0];
        setCustomLayer(newLayer);



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

  return (

    <div>

      <div className="row" style={{ margin: ".6%" }}>

        <div className="col-lg-4">
          <div className="iq-card iq-card-block iq-card-stretch iq-card-height bg-transparent">
            <div className="iq-card-body rounded p-0" style={addressCardStyle} >
              <div className="iq-caption">
                <h1>{markers.name}</h1>
                <h3>{markers.description}</h3>
                <h3>{markers.Apartment} {markers.street}</h3>
                <h3>{markers.region} {markers.pincode}</h3>
                <h3>{markers.country}</h3>
              </div>
            </div>
          </div>
        </div>


        <div className="col-lg-8">
          <div className="iq-card overflow-hidden">

            <div id="home-chart-02">
              <Map center={[60.21846434365596, 24.811831922452843]} zoom={16} ref={mapRef} >
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
                  
{

                  markers.map((marker, index1) => (


marker.floors.map((floor, index) => (


                  
                    
                      // <LayersControl.Overlay checked={false} name={floor.description} >
                      <LayersControl2 position="topright">
                        <ControlledLayerItem
                          checked={false}
                          name={floor.description}
                          group="floors"
                        >
                        {/* {layers.map((layer, i) => {


  <EditableLayer
    key={i}
    layer={layer}
    pathOptions={purpleOptions}
    showDrawControl={i === selectedLayerIndex}
    onLayerClicked={handleLayerClick}
    mapRef={props.map}
  />


})} */}
                     
                      
                     <LayerGroup>
                         { customLayer.map((layer, hx) => (
                           

                          <EditableLayer
    key={hx}
    layer={layer}
    pathOptions={purpleOptions}
    showDrawControl={hx === selectedLayerIndex}
    onLayerClicked={handleLayerClick}
    mapRef={props.map}



   
  />
 

  ))}


</LayerGroup>

                  

                      
                        
                   
                    </ControlledLayerItem>
                    </LayersControl2>
                    // </LayersControl.Overlay>
                      
                    ))))}
                    

                   


                </LayersControl>


                {/* <LayersControl2 position="topright">
                   {mapLayers.map((floor, index) => (
                     <ControlledLayerItem
                     checked={false}
                     name={floor.description}
                     group="floors"
                   >
                      <EditableGroup data={floor.features} />
                     </ControlledLayerItem>

                   ))} */}
                {/* {

                    markers.map((marker, index1) => (


                      marker.floors.map((floor, index) => (

                        <ControlledLayerItem
                          checked={false}
                          name={floor.description}
                          group="floors"
                        >
                          <EditableGroup data={floor.features} />
                        </ControlledLayerItem>

                      ))


                    ))


                  }
                  <ControlledLayerItem
                    checked={false}
                    name="del"
                    group="floors"
                  >

                  </ControlledLayerItem>
                </LayersControl2>  */}

              </Map>
            </div>
          </div>
        </div>
      </div>




    </div>
  )
}


export default ViewBuilding;
