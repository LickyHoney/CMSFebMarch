import React, { useEffect, useState } from "react";



import DisplayEntries from "./DisplayEntries"
import service from "./services.js";

import { Polygon, Popup, Rectangle, Marker, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import { Table, Container, Col, Row, PopUp } from "reactstrap";
import {MapContainer } from "react-leaflet";

import {Nav,NavItem,NavLink,TabContent,TabPane} from 'reactstrap';
import Tabs from "./Tabs";
import PropTypes from "prop-types";
import DashBoard from "./Dashboard";
//import icon from "./icon_building.png";
import { Icon, marker } from "leaflet";
import { SelectionState } from "@devexpress/dx-react-grid";

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
//     const deleteHandler = (id) =>{
      
//       //const marker = markers.find((p) => p.refnum === id);
//       const name = markers.description
//           if(window.confirm(`Do you really want to delete ${name}\'s Building details?`)){
//               service
//               .deletion(id)
//               .then(response => {

//                   //const filteredMarkers = markers.filter((marker) => marker.refnum !== id)
// const filteredMarkers = response.data;
//                   setMarkers(filteredMarkers);
                  
//               //     setName("")
//               //     setStreet("")
//               //     setApartment("")
//               //   setDoorno("")
//               //   setRegion("")
//               //   setCountry("")
//               // setButtonVal("")
//               })
//           }
      
    
//   }
// const deleteHandler = (id) => {
  
//   service
//   .deletion(id)
//     .then(response => {
//       setMarkers(markers.filter((marker) => marker.id !== id))
//       console.log(response.data);
      
//     })
    
// };
// const [filter, setFilter] = useState("");
//   const [filteredMarkers, setFilteredMarkers] = useState([]);
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


// const handleDelete = (id) => {
//   const marker = markers.find((p) => p.refnum === id);
//   const confirmDelete = window.confirm(`Delete ${markers.description}?`);
//   if (confirmDelete) {
//     service.deleteion(id).then(() => {
//       //Update state --> filter out deleted person
//       const filteredMarkers = markers.filter((marker) => marker.refnum !== id);
//       setMarkers(filteredMarkers);

//       // reset filter
//       setFilter("");
//     });
//   }
// };

// const handleDelete = (id) => {
  
//    service
//       .deletion(id)
//       .then(res => {
//         ((previousState) => {
//           return {
//             setMarkers: previousState.markers.filter(m => m.refnum !== id)
//           };
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
  
// const handleDelete = (id, nameToBeDeleted,e) => {
    
//     service
//          .deletion(id)
//          .then(response => {
//           setMarkers(markers.filter(marker => marker.id !== id));
//            console.log(response.data)
//          }).catch(error => {
//            console.log(error)
//          });
//         }

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
// const handleFilter = (event) => {
//   setFilter(event.target.value);
//   const filtered = markers.filter((marker) =>
//     // Check if the search term is included in the names in the phonebook
//     marker.description.toLowerCase().includes(event.target.value.toLowerCase())
//   );

//   setFilteredMarkers(filtered);
// };
    function renderPopup (item){
  
      return (
        
        <Popup
          
        >
           
          <Link  to={item.link} >{item.description}</Link>
        </Popup>
        
      );
    }

    // function renderPopup (index){
    //   return (
        
    //     <Popup
    //       tipSize={5}
    //       anchor="bottom-right"
    //       longitude={markers[index].lng}
    //       latitude={markers[index].lat}
    //     >
    //       <p>
    //          <button type="submit" onClick={submitHandler}>{markers[index].name}</button> 
    //         <br />
            
         
            
    //       </p>
    //     </Popup>
        
    //   );
    // }
    const handleClick = (e) => {
      e.latlng()
    }
  
    const building = new Icon({
      iconUrl: "./icon_building.svg",
      iconSize: [25, 25]
    });
    
      // const [columns] = useState([
      //     {
      //         title: "Name",
      //         name: "name",
      //     },
      //     {
      //         title: "Lat",
      //         name: "lat",
      //         sortable: true,
      //     },
      //     {
      //         title: "Lng",
      //         name: "lng",
      //         sortable: true,
      //     },
      // ]);
      // const [rows, setRows] = useState([
      //     {newName},
      //     {newLat},
      //     {newLng}
          
      // ]);
      // const [editingCells, setEditingCells] = useState([]);
      
    //  const [ newNumber, setNumber ] = useState(number)
      
  
      // useEffect(()=>{
      //     setButtonVal(<button onClick={deleteHandler(id)}>delete</button>)
      // },
      // [])
      // const [search, setSearch] = useState([]);
      
        
      
    //  handleFilter = (e) => {
    //     // filter post list by title using onKeyUp function
    //     const post = markers.filter(marker =>
    //       marker.description.rendered.toLowerCase().includes(e.target.value.toLowerCase())
    //     );
    //     this.setState({ post });
    //   };
    
      // const handleFilter = (event) => {
      //      setFilter(event.target.value);
      //      const filtered = markers.filter((marker) =>
      //        // Check if the search term is included in the names in the phonebook
      //       //  marker.description.toLowerCase().includes(event.target.value.toLowerCase())
      //       marker.description.toLowerCase().search(event.target.value.toLowerCase()!== -1)

      //       );
        
      //      setFilteredMarkers(filtered);
      //    };
      
      const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  return (
//       <div>
//          <div class = "logout">
//   <DashBoard />
//   </div>
  
//         <Tabs>
//           <div label = "Details">
//           {/* <div class='split left'> */}
            
//           <Card className="iq-card">
//                     <CardBody className="iq-card-body"> 

//               <form>
              
//                   <div>
//                   <Row>
//               <Col sm="4">
//                 Search for:
//                 </Col>
//                 <Col> <input onChange={changeHandlerFilter} value={newFilter} /><br/></Col></Row>
//                 </div>
//                 <div className="form-group">
              
                
//                 <h1>Add a Building</h1>
//                 <Row>
//               <Col sm="4">
//                 Lat: 
//                 </Col>
//                 <Col>
//                 <input onChange={changeHandler} value={newLat} /><br/></Col></Row>
//                 <Row>
//               <Col sm="4">
//                 Lng: 
//                 </Col>
//                 <Col><input onChange={changeHandler1} value={newLng} /><br/></Col></Row>
//                 <Row>
//               <Col sm="4">
//                 Name: 
//                 </Col>
//                 <Col><input onChange={changeHandler2} value={newName} /><br/></Col></Row>
//                 </div>

//               </form>
              
//               <div>
//     <button type="submit" onClick={submitHandler} className="btn btn-primary float-left">Add</button><br/>


//   </div>
//    </CardBody>
// </Card>
//             <br/><br/>
//             <div class='position'>

//           <h3>Available List of Buildings</h3>
          
//           <DisplayEntries names={markers} regVal={newFilter} />

//          </div>
//          {/* </CardBody>
// </Card> */}
         
//           </div>
          


         
//           {/* <div class='split right'> */}
//           {/* <Card className="iq-card">
//                     <CardBody className="iq-card-body"></CardBody> */}
//           <div label='MapView'>
//           {/* <Row>
//           <Col sm="12">
//               <Card className="iq-card">
//           <CardBody className="iq-card-body"> */}

//           <MapContainer
//     style={ { height: "500px", width: "100%"}}
//     center={position1} zoom={12} maxZoom={100}
//     center={[60.2330141, 24.8302054]} zoom={12} maxZoom={100}
//     onClick={handleClick}
//   >
//     <Polygon positions={[[60.218228, 24.811606],[60.218358, 24.811976],[ 60.218348, 24.812711],[60.217940, 24.811874]]} color='red' />

//     <TileLayer
//   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//   attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// />

// <Rectangle
//     bounds={wc}
//     color={'yellow'}
//    />
//  <Rectangle
//     bounds={kids}
//     color={'red'}
//    />
// <Rectangle
//     bounds={br}
//     color={'pink'}
//    />
// <Rectangle
//     bounds={tv}
//     color={'purple'}
//    />

//   <Rectangle
//     bounds={Corridar}
//     color={'blue'}
//    />
// <Rectangle
//     bounds={Kitchen}
//     color={'orange'}
//    />




//     {markers.map((marker, index) => {
//         let post = [marker.latitude, marker.longitude];
//       return (
        
//         <Marker
//           key={index}
//           position={post}
         
         
          
          
//         >
//       {renderPopup(index) }
//         </Marker>
        
//       );
      
//     })}
    
//   </MapContainer>
//   {/* </CardBody>
//                   </Card>
//           </Col>
//       </Row>
// */}
 

//   </div>
 
//   </Tabs>
  
  
//   </div>

          
<Row className="iq-example-row">
<Container>


                
               
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
</Container>
</Row> 
  );
}




export default Map1

