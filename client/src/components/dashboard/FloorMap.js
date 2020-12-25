/* eslint-disable jsx-a11y/anchor-is-valid */
 //import React from 'react';
 //import { LayersControl as BaseLayersControl } from 'react-leaflet';
 import { CardBody,Card,ButtonGroup, Button,ButtonToolbar } from 'reactstrap';
 import React, { useEffect, useState } from "react";
 
 import {Polygon, Popup, Rectangle, Marker, TileLayer , MapContainer,LayersControl, LayerGroup} from 'react-leaflet';
import service from './services';
import Map1 from './Map1';
import { Link } from "react-router-dom";



const FloorMap  = () => {
  
    

    const [markers, setMarkers] = useState([])
   

      useEffect(()=>{
        service
        .getAll()
        .then(latlng =>{
          console.log("returning", latlng)
          setMarkers(latlng)
        })
      },[])



     const refno=window.location.pathname.replace('/FloorMap/','');
      
     const handleClick = (e) => {
       console.log(e.target.value)
      debugger;
    }
      
   
  return (

    <Card >
    <CardBody>

<div>

{/* <div> <Link to="/Map1" className="btn btn-primary"><p class="ri-home-4-line"> Home </p></Link></div> */}





                        {markers.filter(item => item.id===refno).map(filteredName => (
                            <div>
                              
                             {/* <h1 className="display-7">#{filteredName.id}-{filteredName.description}</h1> */}
                             <h1 className="display-9">{filteredName.street}   {filteredName.Apartment} {filteredName.doornum} {filteredName.region} {filteredName.country}</h1>
                             {/* <ButtonToolbar className="mt-3">
                             <ButtonGroup className="mr-2">
                                 {filteredName.floors.map((item2, index) => (
                                       
                                      <Button color="secondary" data-key={index}
                                      
                                      onClick={handleClick}> {item2.description}</Button>

  
                                   ))}
                                   </ButtonGroup></ButtonToolbar> */}
                             </div>




                        ))}
                        
                        
                        </div>
                        <div>
                        {markers.filter(item => item.id===refno).map(filteredName => (
                            <div>
                         <MapContainer
                                    style={ { height: "500px", width: "100%"}}
                                    
                                    center={[filteredName.latitude, filteredName.longitude]} zoom={18} maxZoom={100}
                                    
                                >
                                  

                                        {/* <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    /> */}

<LayersControl position="topright">
<LayersControl.BaseLayer checked name={filteredName.name}>
  
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredName.floors.map((floor, index) => (
        <LayersControl.Overlay checked name={floor.description}>
        <LayerGroup>
          <Polygon positions={floor.boundaries} color={floor.color}
                             />
        </LayerGroup>
        </LayersControl.Overlay>
      
      ))}
         {/* <Polygon positions={floor.boundaries} color={floor.color}
                             />  */}
      </LayersControl.BaseLayer>
      
      
      
{/* {filteredName.floors.map((floor, index) => (
      
))} */}
      
      </LayersControl>

                                    {/* {filteredName.floors.map((floor, index) => (
                            //           <Polygon positions={floor.boundaries} color={floor.color}
                            //  /> 
                            <LayersControl.Overlay name={floor.description} id={floor.floorno}>
                            <LayerGroup>
                            <Polygon positions={floor.boundaries} color={floor.color}
                              /> 
                            </LayerGroup>
                          </LayersControl.Overlay>

                                    ))} */}



                             </MapContainer> 
                             </div>
                        ))
                        }
                        </div>
    </CardBody>
    </Card>  

  );
}

export default FloorMap;
