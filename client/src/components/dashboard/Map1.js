import React, { useEffect, useRef, useState } from "react";

import { Container, Table, Row, Col, Card, CardTitle,CardBody, Modal, ModalHeader, Button, ModalFooter, ModalBody, Label, Input, Form, FormGroup } from 'reactstrap';


import DisplayEntries from "./DisplayEntries"
import service from "./services.js";
// import { CardBody, Card } from 'reactstrap';
import L from 'leaflet';
import { EditControl } from "react-leaflet-draw";
import { Polygon, Popup, Rectangle, Marker, TileLayer,FeatureGroup } from "react-leaflet";
import { Link } from "react-router-dom";
// import { Table, Container, Col, Row, PopUp, Button } from "reactstrap";
import { Map } from "react-leaflet";

// import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
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
// import '../../../node_modules/leaflet/dist/leaflet.css';
import icon from '../../../node_modules/leaflet/dist/images/marker-icon.png';
import iconShadow from '../../../node_modules/leaflet/dist/images/marker-shadow.png';



const Map1 = () => {


  let mapRef = useRef();
  const [markers, setMarkers] = useState([])
  const [newLat, setNewLat] = useState('')
  const [newLng, setNewLng] = useState('')
  const [newName, setNewName] = useState('')
  const [mapLayers, setMapLayers] = useState([]);
  const myIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/images/marker-icon.png',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
  });
  // delete start
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [defaultBoard] = useState(
    {
      id: 0,
      title: '',
      color: '',
      list: [

      ]
    },
  );
  const [defaultTask] = useState(
    {
      id: 0,
      name: '',
      description: '',
      status: 0
    }
  );
  const [boards] = useState([
    {
      id: 1,
      title: 'Todo',
      color: 'bg-primary',
      list: [
        { id: 1, name: 'John', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s', status: 0, date: '2020-01-1' },
      ]
    },
    {
      id: 2,
      title: 'Planing',
      color: 'bg-success',
      list: [
        { id: 1, name: 'Juan', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', status: 1, date: '2020-01-5' }
      ]
    },
    {
      id: 3,
      title: 'Working',
      color: 'bg-info',
      list: [
        { id: 1, name: 'Juan', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', status: 0, date: '2020-01-6' },
      ]
    },
    {
      id: 4,
      title: 'Testing',
      color: 'bg-warning',
      list: [
        { id: 1, name: 'Juan', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', status: 0, date: '2020-01-8' }

      ]
    },
    {
      id: 5,
      title: 'Complete',
      color: 'bg-danger',
      list: [
        { id: 5, name: 'Juan', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', status: 0, date: '02 jan 2020' }
      ]
    }
  ]);
  const [colors] = useState([
    'bg-primary',
    'bg-success',
    'bg-warning',
    'bg-info',
    'bg-danger'
  ]);


  const toggleModal = () => setModal(!modal);
  const toggleModal1 = () => setModal1(!modal1);

  const newNameChange = (e) => {
      setNewName(e.target.value);
  };
  const saveBoard = (item) => {
    
      const newBName = newName;
      debugger;
      const emptyBuilding = {};
  };
  const saveTask = (item) => {
    // let index = boards.list.findIndex(task => task.id === item.id)
    // if (index !== -1) {
    //   boards.list[index] = item
    // } else {
    //     boards.list.push(item)
    // }

  };
  // delete end

  useEffect(() => {

    service
      .getAll()
      .then(allEntries => {
        console.log("returning", allEntries)

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


  const flyToMarker = (e) => {

    const idx = e.target.getAttribute('value');
    const markersLcl = markers;
    const itemLcl = markersLcl[idx];





    mapRef.current.leafletElement.flyTo([itemLcl.latitude, itemLcl.longitude], 16)
  }
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

        <Link to={item.link} >
          {item.description
          }</Link>
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

  const _onCreate = (e) => {
    console.log(e);
    toggleModal();

    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;

      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
      ]);
    }
  };

  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
    });
  };



  return (



    <div id="container" style={{ "margin": "1rem" }}>
      <Container fluid={true}>
        <div className="row">
          <div className="col-12">
            <div className="iq-card ">
              <div className="row d-flex align-items-center mb-2">
                <div className="col-md-9"><div className="d-flex align-items-center">
                  <h4 className="mb-0 p-3 ml-2">Buildings</h4>

                </div>
                </div>
                {/* <div className="text-right col-md-3" visible ={false}>
                  <Button color="primary" onClick={toggleModal}   >

                    <i className="ri-add-line font-size-24"></i> New Building
                                        </Button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* edit start */}


      <Container fluid={true}>
        <Row>
          <Col md={12}>
            <Row>
              <div className="col-12 text-right mb-4">
              {/* onSubmit={saveBoard(defaultBoard)} */}
                <Form >
                  <Modal isOpen={modal} fade={false} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal} className={"border-0"}>
                      <h5 className={"text-primary card-title"}>
                        New Building
                                                    </h5>
                    </ModalHeader>
                    <ModalBody>
                      <Label>Please give building name..</Label>
                      <Input type="text" name="title" value={newName} onChange={newNameChange} />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={toggleModal}>
                        Cancel
                                                </Button>
                      <Button color="primary" onClick={saveBoard}>
                        Save
                                                </Button>
                    </ModalFooter>
                  </Modal>
                </Form>
              </div>

            </Row>
            <Row>
              <Col md={12} className="track">
                {
                  markers.map((item, index) => (
                    <Card className="bg-transparent shadow-none mr-3 w-25 iq-card" >
                      <div className={"iq-card-header d-flex justify-content-between bg-primary"}>
                        <div className="iq-header-title">
                          <h3 className="text-white"><Link to={"/ViewBuilding/"+item.id} onMouseEnter={flyToMarker} value={index} className="nav-link font-weight-bold ">{item.description} </Link>
                          </h3>
                        </div>
                        <div className="iq-card-header-toolbar d-flex align-items-center">
                          
                          <i className="ri-delete-bin-fill mr-0 font-size-28" role="button" tabIndex="0" >

                          </i>
                          
                        </div>
                      </div>
                      <CardBody className="card-body iq-card-body pro-bg-card">
                        <div>


                          <Card className="iq-card">
                            <div className="iq-card-header d-flex justify-content-between pro-task-bg-card">
                              <div className="iq-header-title">
                                {/* <Link to={item.link} onMouseEnter={flyToMarker} value={index} className="nav-link font-weight-bold ">{item.description} </Link> */}
                                <h3 className="text-blue"><Link to={"/ViewBuilding/"+item.id} onMouseEnter={flyToMarker} value={index} className="nav-link font-weight-bold font-black">{item.street}   {item.Apartment} {item.doornum} {item.region} {item.country} </Link>
                                </h3>


                              </div>
                              <div className="iq-card-header-toolbar d-flex align-items-center">
                              
                              <Link to={"/EditBuilding/"+item.id}>
                              <a  className="badge iq-bg-primary mr-2 p-2 font-size-18">Edit</a>
                              </Link>
                                
                              </div>
                            </div>
                            <CardBody className="card-body iq-card-body pro-task-bg-card">
                              {/* <p className="font-size-12">{item.description}</p> */}
                              {/* <div className="d-flex justify-content-between">
                                <div>

                                  <i className="ri-ball-pen-line font-size-18" role="button" tabIndex="0"></i>
                                  <i className="ri-attachment-line font-size-18 ml-2"></i>
                                  <i className="ri-eye-line font-size-18 ml-2"></i>
                                  <span>
                                    <small>54</small>
                                  </span>
                                  <i className="ri-chat-4-line font-size-18 ml-2"></i>
                                  <span>
                                    <small>36</small>
                                  </span>
                                  <i className="ri-close-circle-line font-size-18 ml-2"></i>
                                </div>
                              </div> */}
                              <div className="mt-2 progress" style={{ "height": "4px" }}>
                                <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="40" className="progress-bar iq-border-radius-10 bg-success" style={{ "width": "40%" }}>
                                  <span> </span>
                                </div>
                                <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="80" className="progress-bar iq-border-radius-10 bg-warning" style={{ "width": "80%" }}>
                                  <span> </span>
                                </div>
                                <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" className="progress-bar iq-border-radius-10 bg-danger" style={{ "width": "50%" }}>
                                  <span> </span>
                                </div>
                              </div>
                            </CardBody>
                          </Card>



                        </div>
                        {/* <Button color="primary" className="btn btn-lg btn-block"  onClick={toggleModal1}>
                                                        Add Item
                                                    </Button> */}
                      </CardBody>

                    </Card>
                  ))
                }

              </Col>
            </Row>
          </Col>
        </Row>
        <Form onSubmit={saveTask(defaultTask)}>
          <Modal isOpen={modal1} fade={false} toggle={toggleModal1}>
            <ModalHeader toggle={toggleModal1} className={"border-0"}>
              <h5 className={"text-primary card-title"}>
                New Task
                                    </h5>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="exampleEmail">Name</Label>
                <Input type="text" name="email" id="exampleEmail" placeholder="with a placeholder" />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Description</Label>
                <Input type="text" name="password" id="examplePassword" placeholder="password placeholder" />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio1" />{' '}
                                                Go
                                        </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio1" />{' '}
                                           High
                                        </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio1" />{' '}
                                           Critical
                                        </Label>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleModal1}>
                Close
                                </Button>
              <Button color="primary">
                Save Changes
                                </Button>
            </ModalFooter>
          </Modal>
        </Form>
      </Container>
      {/* edit end */}
      {/* <Container fluid={true}>
        <div className="row">
          <div className="col-12">
            <div className="iq-card ">
              <div className="row d-flex align-items-center mb-2">
                <div className="col-md-9"><div className="d-flex align-items-center">
                  <h4 className="mb-0 p-3 ml-2">Buildings</h4>

                </div>
                </div>
                <div className="text-right col-md-3">

                </div>
              </div>
            </div>
          </div>
        </div>
      </Container> */}



      {/* <Container fluid={true}>
        <div className="row">
          <div className="col-12">
            <div className="iq-card ">
              <div className="row d-flex align-items-center mb-2">
                <div className="col-md-9"><div className="d-flex align-items-center">
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
                                <td> <Link to={item.link} onMouseEnter={flyToMarker} value={index} className="nav-link font-weight-bold ">{item.description} </Link></td>
                                <td >{item.street}   {item.Apartment} {item.doornum} {item.region} {item.country}</td>
                                <td><button type="button"
                                  onClick={() => handleDelete(item.id, item.description)}
                                > Delete </button></td>

                                <td><Link to="/EditBuilding/1" className="nav-link font-weight-bold ">edit</Link></td>


                                {<Link onClick={(e) => handleDelete(item.refnum, item.description, e)} className="nav-link font-weight-bold ">Delete</Link> }

                              </tr>
                            ))
                          }



                        </tbody>
                      </Table>

                    </CardBody>
                  </Card>

                </div>
                </div>
                <div className="text-right col-md-3">

                </div>
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      

      <Row>
                    <Col sm="12">
                        <Card className="iq-card">
                            <div className="iq-card-header d-flex justify-content-between">
                                <CardTitle className="iq-header-title">
                                    {/* <h4 className="card-title"></h4> */}
                                </CardTitle>
                            </div>
                            <CardBody className="iq-card-body">
                                <p></p>
                                <Map ref={mapRef}
                    style={{ height: "500px", width: "100%" }}

                    center={[60.21679719545689, 24.810291821854594]} zoom={16} maxZoom={100}

                  >

                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {
                      markers.map((item, index) => (

                        <Marker  key={item.description}
                          position={[item.latitude, item.longitude]}
                          onMouseOver={(e) => {
                            e.target.openPopup();
                          }}
                          onMouseOut={(e) => {
                            e.target.closePopup();
                          }}
                        >




                        </Marker>
                      ))
                    }


<FeatureGroup>
                <EditControl
                  position="topright"
                  onCreated={_onCreate}
                  onEdited={_onEdited}
                  // onDeleted={_onDeleted}
                  draw={{
                    rectangle: false,
                    polyline: false,
                    circle: false,
                    circlemarker: false,
                    polygon: false,
                  }}
                />
              </FeatureGroup>


                  </Map>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>



















    </div>
  );
}




export default Map1

