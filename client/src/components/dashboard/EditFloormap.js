/* eslint-disable jsx-a11y/anchor-is-valid */
 //import React from 'react';
 //import { LayersControl as BaseLayersControl } from 'react-leaflet';
 import { CardBody,Card,ButtonGroup, Button,ButtonToolbar,Form,FormGroup,Label,Input } from 'reactstrap';
 import React, { useEffect, useState, LocationMarker } from "react";
 import { Col, Row } from "reactstrap";

 import {Polygon, Popup, Rectangle, Marker, TileLayer , MapContainer,LayersControl, LayerGroup,useMapEvents} from 'react-leaflet';
import service from './services';

import { Link } from "react-router-dom";




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
                          
                         });
}
componentDidMount() {
  
  
  }
//  LocationMarker(context1) {
 
//     const main = context1;
//   this.setState({position: null})
//    //const [position, setPosition] = useState(null)
//     var that=this;
//     const map = useMapEvents({
//       click() {
//         debugger;
//       },
//       locationfound(e) {
       
//       },
//     })
  
//     return position === null ? null : (
//       <Marker position={position}>
//         <Popup>You are here</Popup>
//       </Marker>
//     )

// }
 
render(){

  return ( 
    
  <div>
    
                  {this.state.markers.filter(item => item.id==="3").map(filteredName => (
                                            <div>
                                              <Row className="row">
<Col className="col-4">
                                              
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
                                              <Label htmlFor="exampleInputReadonly">Street</Label>
                                              <Input type="text" className="form-control" id="exampleInputReadonly"
                                              readOnly="" defaultValue={filteredName.street} />
                                              </FormGroup>

                                              <FormGroup className="form-group">
                                              <Label htmlFor="exampleInputReadonly">Apartment</Label>
                                              <Input type="text" className="form-control" id="exampleInputReadonly"
                                              readOnly="" defaultValue={filteredName.Apartment} />
                                              </FormGroup>


                                              <FormGroup className="form-group">
                                              <Label htmlFor="exampleInputReadonly">Doornum</Label>
                                              <Input type="text" className="form-control" id="exampleInputReadonly"
                                              readOnly="" defaultValue={filteredName.doornum} />
                                              </FormGroup>


                                              <FormGroup className="form-group">
                                              <Label htmlFor="exampleInputReadonly">Region</Label>
                                              <Input type="text" className="form-control" id="exampleInputReadonly"
                                              readOnly="" defaultValue={filteredName.region} />
                                              </FormGroup>

                                              <FormGroup className="form-group">
                                              <Label htmlFor="exampleInputReadonly">Country</Label>
                                              <Input type="text" className="form-control" id="exampleInputReadonly"
                                              readOnly="" defaultValue={filteredName.country} />
                                              </FormGroup>

                                              </Col>
                                              <Col className="col-8">

                                              <MapContainer  
                                                style={ { height: "700px", width: "100%"}}
                                    
                                                   center={[filteredName.latitude, filteredName.longitude]} zoom={17} maxZoom={100}
                                    
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
                             </Col>
                             </Row>





                                      </div>
  
                  ))}
                   
                   </div>)
}

}
export default EditFloorMap;