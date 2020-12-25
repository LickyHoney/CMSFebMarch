/* eslint-disable jsx-a11y/anchor-is-valid */
 //import React from 'react';
 //import { LayersControl as BaseLayersControl } from 'react-leaflet';
 import { CardBody,Card,ButtonGroup, Button,ButtonToolbar,Form,FormGroup,Label,Input } from 'reactstrap';
 import React, { useEffect, useState } from "react";
 
 import {Polygon, Popup, Rectangle, Marker, TileLayer , MapContainer,LayersControl, LayerGroup,useMapEvents} from 'react-leaflet';
import service from './services';

import { Link } from "react-router-dom";

function LocationMarker(context1) {
 
  const main = context1;
  const [position, setPosition] = useState(null)
  var that=this;
  const map = useMapEvents({
    click() {
      debugger;
    },
    locationfound(e) {
     
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}


class EditFloorMap extends React.Component{

  constructor() {
    super();
    this.state = {
       markers:[]
    };
    debugger;
    var that=this;
    service.getAll().then(latlng =>{
                           console.log("returning", latlng)
                          that.setState({ 'markers': latlng })
                          debugger;
                         });
}
componentDidMount() {
  
  

}
render(){
debugger;
  return ( <div>
                  {this.state.markers.filter(item => item.id==="3").map(filteredName => (
                                            <div>
                                              
                                              <FormGroup className="form-group">
                                              <Label htmlFor="exampleInputReadonly">Building Id</Label>
                                              <Input type="text" className="form-control" id="exampleInputReadonly"
                                              readOnly="" defaultValue={filteredName.id} disabled/>
                                              </FormGroup>
                                             
                                              <FormGroup className="form-group">
                                              <Label htmlFor="exampleInputReadonly">Building Name</Label>
                                              <Input type="text" className="form-control" id="exampleInputReadonly"
                                              readOnly="" defaultValue={filteredName.description} />
                                              </FormGroup>
                                            
                                              <FormGroup className="form-group">
                                              <Label htmlFor="exampleInputReadonly">Building Id</Label>
                                              <Input type="text" className="form-control" id="exampleInputReadonly"
                                              readOnly="" defaultValue={filteredName.street} />
                                              </FormGroup>

                                              <FormGroup className="form-group">
                                              <Label htmlFor="exampleInputReadonly">Building Id</Label>
                                              <Input type="text" className="form-control" id="exampleInputReadonly"
                                              readOnly="" defaultValue={filteredName.Apartment} />
                                              </FormGroup>


                                              <FormGroup className="form-group">
                                              <Label htmlFor="exampleInputReadonly">Building Id</Label>
                                              <Input type="text" className="form-control" id="exampleInputReadonly"
                                              readOnly="" defaultValue={filteredName.doornum} />
                                              </FormGroup>


                                              <FormGroup className="form-group">
                                              <Label htmlFor="exampleInputReadonly">Building Id</Label>
                                              <Input type="text" className="form-control" id="exampleInputReadonly"
                                              readOnly="" defaultValue={filteredName.region} />
                                              </FormGroup>

                                              <FormGroup className="form-group">
                                              <Label htmlFor="exampleInputReadonly">Building Id</Label>
                                              <Input type="text" className="form-control" id="exampleInputReadonly"
                                              readOnly="" defaultValue={filteredName.country} />
                                              </FormGroup>

                                              <MapContainer  
                                                style={ { height: "500px", width: "100%"}}
                                    
                                                   center={[filteredName.latitude, filteredName.longitude]} zoom={18} maxZoom={100}
                                    
                                                   >
                                  
                                                            <LayersControl position="topright">
                                                        
                                                        <TileLayer
                                                          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                        />

                                                        <LayersControl.BaseLayer >
                                                            </LayersControl.BaseLayer>   
                                                        
                                                              
                                                                
                                                           { filteredName.floors.map((floor, index) => (
                                                                            
                                                                          <LayersControl.Overlay checked name={floor.description}>
                                                                          <LayerGroup>
                                                                            {floor.boundaries.map((vertex,index) => (

                                                                                  <Marker position={vertex} >
                                                                                  <Popup>
                                                                                  delete<br />
                                                                                  </Popup>
                                                                                  </Marker>
                                                                            ))

                                                                            }
                                                                            {<Polygon positions={floor.boundaries} color={floor.color}/> }
                                                                          </LayerGroup>
                                                                          </LayersControl.Overlay>
                                                                        
                                                                        ))
                                                         
                                                                      }

                                                      </LayersControl>  
                                                      <LocationMarker context1={this}></LocationMarker>
                             </MapContainer>     





                                      </div>
  
                  ))}
                   
                   </div>)
}

}
export default EditFloorMap;