import React, { useEffect, useState } from "react";



import DisplayEntries from "./DisplayEntries"
import service from "./services.js";
import { CardBody, Card } from 'reactstrap';
import L from 'leaflet';

import { Polygon, Popup, Rectangle, Marker, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import { Table, Container, Col, Row, PopUp, Button } from "reactstrap";
import { Map } from "react-leaflet";

import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import Tabs from "./Tabs";
import PropTypes from "prop-types";
import DashBoard from "./Dashboard";
//import icon from "./icon_building.png";
import { Icon, marker } from "leaflet";
import { SelectionState } from "@devexpress/dx-react-grid";
//import EditFloormap from "./EditFloormap";
import history from "./history"
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import '../../../node_modules/leaflet/dist/leaflet.css';
import icon from '../../../node_modules/leaflet/dist/images/marker-icon.png';
import iconShadow from '../../../node_modules/leaflet/dist/images/marker-shadow.png';



const Map1 = () => {



  const [markers, setMarkers] = useState([])
  const [newLat, setNewLat] = useState('')
  const [newLng, setNewLng] = useState('')
  const [newName, setNewName] = useState('')



  useEffect(() => {
    debugger;
    service
      .getAll()
      .then(allEntries => {
        console.log("returning", allEntries)
        debugger;
        setMarkers(allEntries)
      })
  }, [])



  const changeHandler = (event) => setNewLat(event.target.value)
  const changeHandler1 = (event) => setNewLng(event.target.value)
  const changeHandler2 = (event) => setNewName(event.target.value)
  //const changeHandlerFilter = (event) => setNewFilter(event.target.value)



  const position = [60.21749913, 24.938379];
  const position1 = [60.21749913, 24.806496774]
  console.log(position)




  const [searchTerm, setSearchTerm] = useState("");
  //const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = markers.filter(marker =>
      marker.description.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setMarkers(results);


    console.log(results)
  }, [searchTerm]);

  // this.setState({
  //   searchValue: search,
  //   filteredPeople: this.state.people.filter(
  //    item =>
  //     (item.lastname && item.lastname.toLowerCase().includes(search)) ||
  //     (item.name && item.name.toLowerCase().includes(search))
  //   )
  //  });
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
  });

  const handleDelete = (id, nameToBeDeleted, e) => {
    if (window.confirm(`Delete ${nameToBeDeleted}?`)) {
      service
        .deletion(id)
        .then(() => {
          setMarkers(markers.filter(marker => marker.id !== id));
          window.confirm(`Deleted ${nameToBeDeleted}`);
        })
        .catch(() => {
          window.confirm(`Error: ${nameToBeDeleted} already deleted`, 'red');
          setMarkers(markers.filter((marker) => marker.id !== id));
        });
    }
  }

  const handleUpdate = (id, nameToBeDeleted, e) => {

  }

  function renderPopup(item) {

    return (

      <Popup

      >

        <Link to={item.link} >{item.description}</Link>
      </Popup>

    );
  }



  const handleClick = (e) => {
    e.latlng()
  }






  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const iconMarkup = renderToStaticMarkup(
    <i class="fas fa-building" />

  );
  const customMarkerIcon = divIcon({
    html: iconMarkup
  });
  return (



    <div id="container">
      <caption>List of Buildings</caption>
      
      <Card style={{ margin: ".1%" }}>
        <CardBody>

          <Table className="table" items={markers}>

            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Delete</th>
                <th scope="col">Edit</th>

              </tr>
            </thead>
            <tbody>

              {

                markers.map((item, index) => (

                  <tr key={index}>
                    <th>{item.id} </th>
                    <td> <Link to={item.link} className="nav-link font-weight-bold ">{item.description} </Link></td>
                    <td >{item.street}   {item.Apartment} {item.doornum} {item.region} {item.country}</td>
                    <td><button type="button"
                      onClick={() => handleDelete(item.id, item.description)}
                    > Delete </button></td>

                    <td><Link to="/EditBuilding/1" className="nav-link font-weight-bold ">edit</Link></td>


                    {/* <Link onClick={(e) => handleDelete(item.refnum, item.description, e)} className="nav-link font-weight-bold ">Delete</Link> */}

                  </tr>
                ))
              }



            </tbody>
          </Table>

        </CardBody>
      </Card>
     
      
        



                
               

     
     
     
      
      <Card style={{ margin: ".1%" }}>
        <CardBody>
        <Map
                                            style={ { height: "500px", width: "100%"}}
                                            
                                            center={[60.21679719545689, 24.810291821854594]} zoom={12} maxZoom={100}
                                            
                                        >
    
                                                <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            />
                            
                                {
                                    markers.map((item, index) => (
                                       
                                        <Marker   
                                                position={[item.latitude,item.longitude]}
                                                onMouseOver={(e) => {
                                                    e.target.openPopup();
                                                  }}
                                                  onMouseOut={(e) => {
                                                    e.target.closePopup();
                                                  }}
                                                >
                                                          {renderPopup(item) }
                                                </Marker>
                                    ))
                                }

      
    
    
                                     </Map>
        </CardBody>
        </Card>
        
       

    </div>
  );
}




export default Map1

