import React, { useEffect, useState } from "react";



import DisplayEntries from "./DisplayEntries"
import service from "./services.js";

import { Polygon, Popup, Rectangle, Marker, TileLayer } from "react-leaflet";

import {MapContainer } from "react-leaflet";
import { Card, CardBody, Col, Row } from "reactstrap";
import {Nav,NavItem,NavLink,TabContent,TabPane} from 'reactstrap';
import Tabs from "./Tabs";
import PropTypes from "prop-types";
import DashBoard from "./Dashboard";

const Map1  = () => {
  
    

    const [markers, setMarkers] = useState([])
      const [ newLat, setNewLat ] = useState('')
      const [ newLng, setNewLng ] = useState('')
      const [ newName, setNewName ] = useState('')
      const [newFilter, setNewFilter] = useState('')
      

      useEffect(()=>{
        service
        .getAll()
        .then(latlng =>{
          console.log("returning", latlng)
          setMarkers(latlng)
        })
      },[])



   
      

      
      const kids = [
        [60.23296, 24.83034],
        [60.23299, 24.83039],
        [60.23302, 24.83031],
        [60.23299, 24.83026]
        
      ]
      const br = [
        [60.23299, 24.83026],
        [60.23301, 24.83029],
        [60.23303, 24.83024],
        [60.23301, 24.83022]
      ]
      const tv = [
        [60.23301, 24.83030],
        [60.23304, 24.83035],
        [60.23306, 24.83030],
        [60.23303, 24.83025]
      ]
      const wc = [
        [60.23303, 24.83040],
        [60.23304, 24.83042],
        [60.23305, 24.83039],
        [60.23303, 24.83038]
      ]
      
      

      
      const Corridar = [
        [60.23299, 24.83040],
        [60.23301, 24.83043],
        [60.23303, 24.83037],
        [60.23302, 24.83034],
      ]
      const Kitchen = [
        [60.23304, 24.83035],
        [60.23306, 24.83038],
        [60.23308, 24.83033],
        [60.23306, 24.83030]
      ]
  const changeHandler = (event) => setNewLat(event.target.value)
  const changeHandler1 = (event) => setNewLng(event.target.value)
  const changeHandler2= (event) => setNewName(event.target.value)
  const changeHandlerFilter = (event) => setNewFilter(event.target.value)
      
 


        const position = [60.21749913, 24.938379];
        const position1 = [60.21749913, 24.806496774]
        console.log(position)
       
      const submitHandler = (event) => {
        event.preventDefault()
       service
        .getAll()
        .then(latlng =>{
          const allMarkers = [...latlng]

          const newMarker = {
            id:markers.length + 1,
            lat:parseFloat(newLat),
            lng:parseFloat(newLng),
            name:newName
          }
           service
            .update(newMarker)
            .then(newEntry =>{
                setNewLat("")
                setNewLng("")
                setNewName("")
              setMarkers(latlng.concat(newEntry))
            })

        })
    }
    function renderPopup (index){
      return (
        
        <Popup
          tipSize={5}
          anchor="bottom-right"
          longitude={markers[index].lng}
          latitude={markers[index].lat}
        >
          <p>
            <button type="submit" onClick={submitHandler}>{markers[index].name}</button>
            <br />
            
         
            
          </p>
        </Popup>
        
      );
    }
    const handleClick = (e) => {
      e.latlng()
    }
  
      
  return (
      <div>
         <div class = "logout">
  <DashBoard />
  </div>
  
        <Tabs>
          <div label = "Details">
          {/* <div class='split left'> */}
            
          <Card className="iq-card">
                    <CardBody className="iq-card-body">

              <form>
              
                  <div>
                  <Row>
              <Col sm="4">
                Search for:
                </Col>
                <Col> <input onChange={changeHandlerFilter} value={newFilter} /><br/></Col></Row>
                </div>
                <div className="form-group">
              
                
                <h1>Add a Building</h1>
                <Row>
              <Col sm="4">
                Lat: 
                </Col>
                <Col>
                <input onChange={changeHandler} value={newLat} /><br/></Col></Row>
                <Row>
              <Col sm="4">
                Lng: 
                </Col>
                <Col><input onChange={changeHandler1} value={newLng} /><br/></Col></Row>
                <Row>
              <Col sm="4">
                Name: 
                </Col>
                <Col><input onChange={changeHandler2} value={newName} /><br/></Col></Row>
                </div>

              </form>
              
              <div>
    <button type="submit" onClick={submitHandler} className="btn btn-primary float-left">add</button><br/>


  </div>
            <br/><br/>
            <div class='position'>

          <h3>Available List of Buildings</h3>
          <DisplayEntries names={markers} regVal={newFilter} />

         </div>
         </CardBody>
</Card>
         
          </div>
          


         
          {/* <div class='split right'> */}
          
          <div label='MapView'>
          {/* <Row>
          <Col sm="12">
              <Card className="iq-card">
          <CardBody className="iq-card-body"> */}

          <MapContainer
    style={ { height: "500px", width: "100%"}}
    center={position1} zoom={12} maxZoom={100}
    center={[60.2330141, 24.8302054]} zoom={12} maxZoom={100}
    onClick={handleClick}
  >
    <Polygon positions={[[60.218228, 24.811606],[60.218358, 24.811976],[ 60.218348, 24.812711],[60.217940, 24.811874]]} color='red' />

    <TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
/>

<Rectangle
    bounds={wc}
    color={'yellow'}
   />
 <Rectangle
    bounds={kids}
    color={'red'}
   />
<Rectangle
    bounds={br}
    color={'pink'}
   />
<Rectangle
    bounds={tv}
    color={'purple'}
   />

  <Rectangle
    bounds={Corridar}
    color={'blue'}
   />
<Rectangle
    bounds={Kitchen}
    color={'orange'}
   />




    {markers.map((marker, index) => {
        let post = [marker.lat, marker.lng];
      return (
        
        <Marker
          key={index}
          position={post}
          
          
        >
      {renderPopup(index) }
        </Marker>
        
      );
      
    })}
    
  </MapContainer>
  {/* </CardBody>
                  </Card>
          </Col>
      </Row>
*/}
 

  </div>
 
  </Tabs>
  
  
  </div>
          
     
  );
}




export default Map1

