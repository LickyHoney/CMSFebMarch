/* eslint-disable jsx-a11y/anchor-is-valid */
 //import React from 'react';
 import { CardBody,Card } from 'reactstrap';
 import React, { useEffect, useState } from "react";
 
 import {Polygon, Popup, Rectangle, Marker, TileLayer , MapContainer} from 'react-leaflet';
import service from './services';


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
      

      
      

      
     
 
     

   
  return (

    <Card >
    <CardBody>





                    <div>
                        {markers.filter(item => item.id===refno).map(filteredName => (
                            <div>
                              
                             <h1 className="display-7">#{filteredName.id}-{filteredName.description}</h1>
                             <h1 className="display-9">{filteredName.street}   {filteredName.Apartment} {filteredName.doornum} {filteredName.region} {filteredName.country}</h1>
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

                                        <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />

                            <Polygon positions={filteredName.boundaries} color='red'
                             />


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
