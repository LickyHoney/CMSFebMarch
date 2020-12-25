import React, { useEffect, useState } from "react";



import DisplayEntries from "./DisplayEntries"
import service from "./services.js";
import { CardBody,Card } from 'reactstrap';

import { Polygon, Popup, Rectangle, Marker, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import { Table, Container, Col, Row, PopUp,Button } from "reactstrap";
import {MapContainer } from "react-leaflet";

import {Nav,NavItem,NavLink,TabContent,TabPane} from 'reactstrap';
import Tabs from "./Tabs";
import PropTypes from "prop-types";
import DashBoard from "./Dashboard";
//import icon from "./icon_building.png";
import { Icon, marker } from "leaflet";
import { SelectionState } from "@devexpress/dx-react-grid";
//import EditFloormap from "./EditFloormap";
import history from"./history"
const Map1  = () => {
  
    

      const [markers, setMarkers] = useState([])
      const [ newLat, setNewLat ] = useState('')
      const [ newLng, setNewLng ] = useState('')
      const [ newName, setNewName ] = useState('')
      const [newFilter, setNewFilter] = useState('')
      const [ buttonVal, setButtonVal ] = useState("")
      
      
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
  //const changeHandlerFilter = (event) => setNewFilter(event.target.value)
      
  

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


const handleDelete = (id, nameToBeDeleted,e) => {
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

const handleUpdate = (id, nameToBeDeleted,e) => {
  
}

    function renderPopup (item){
  
      return (
        
        <Popup
          
        >
           
          <Link  to={item.link} >{item.description}</Link>
        </Popup>
        
      );
    }

    
    
    const handleClick = (e) => {
      e.latlng()
    }
  
    const building = new Icon({
      iconUrl: "./icon_building.svg",
      iconSize: [25, 25]
    });
    
     
      
  
      
      const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  return (


          




<Card>
  <CardBody>    
<Row className="iq-example-row">



                
               
<Row className="row">
<Col className="col-4">
{/* <div className="btn" onClick={this.togglePopup}>
      <button>New User?</button>
      </div>
    {isOpen ? <PopUp toggle={this.togglePopup} /> : null} */}
Search for:
<input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <Button variant="btn btn-success" onClick={() => '/EditFloormap'}>Edit</Button>
      <br/>
      <br/>
{/* <DisplayEntries names={markers} deleteHandler={deleteHandler} /> */}
<Table hover className="table" items={markers}>
   <thead>
      <tr>
         <th scope="col">#</th>
         <th scope="col">Name</th>
         <th scope="col">Address</th>
         <th scope="col">Delete</th>
         
      </tr>
   </thead>
   <tbody>
     
                                {

                                    markers.map((item, index) => (
                                       
                                        <tr key={index}>
                                            <td >{item.id} </td>
                                           <td> <Link   to={item.link} className="nav-link font-weight-bold ">{item.description} </Link></td>
                                            <td >{item.street}   {item.Apartment} {item.doornum} {item.region} {item.country}</td>
                                            <td><button type="button"
      onClick={() => handleDelete(item.id, item.description)}
    > Delete </button></td>
    
    <td><Link   to="/EditFloorMap/3" className="nav-link font-weight-bold ">edit</Link></td>


    {/* <Link onClick={(e) => handleDelete(item.refnum, item.description, e)} className="nav-link font-weight-bold ">Delete</Link> */}

                                        </tr>
                                    ))
                                }
                                


   </tbody>
</Table>


</Col>
<Col className="col-8">
<MapContainer
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

      
    
    
                                     </MapContainer>
</Col>
</Row>

</Row> 
</CardBody>
</Card>
  );
}




export default Map1

