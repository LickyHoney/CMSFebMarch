


 import { CardBody,Card,ButtonGroup, ButtonToolbar,Form,FormGroup,Label,Input, ModalHeader, Modal, ModalBody, ModalFooter } from 'reactstrap';
 import React, { useRef, useEffect, useState, useMap} from "react";
 import { Col, Row } from "reactstrap";
 //import { EditControl } from "react-leaflet-draw";
 //import {FeatureGroup,useLeaflet} from "react-leaflet";
 import { EditControl } from "react-leaflet-draw";
 import L from "leaflet";
 import "./assets/leaflet.css"
import "./assets/leaflet.draw.css"
import ModalTemplate from './ModalTemplate';
import {  Map, TileLayer, FeatureGroup, Marker,Polyline, Popup, Polygon, Rectangle,  LayersControl, LayerGroup,useMapEvents} from 'react-leaflet';
import service from './services';



import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  map: ({
      height: `calc(90vh - 90px)`,
      width: '60%',
      zIndex: 0
  }),
  buttonWrapper: {
      zIndex: 1,
      position: "absolute",
      bottom: theme.spacing(2),
      marginLeft: "30%",
      marginBottom: "8%",
      transform: "translateX(-50%)",
  },
  buttonStyle: {
    margin:"10px",
    
  },
  headerWrapper: {
      zIndex: 1,
      marginLeft: theme.spacing(3),
      marginTop: theme.spacing(1),
  }
}));


const EditFloorMap = (props) => 
{
  const [addFloor, setAddFloor] = useState(false);
  //const mapGlobal = useMap();
  const classes = useStyles(props)
  const editRef = useRef();
  const [markers, setMarkers] = useState([])
  const [newPosition, setNewPosition] = useState([])
  //const [markers1, setMarkers1] = useState([]);
  const [position, setPosition] = useState([]);
  const [mapLayers, setMapLayers] = useState([]);
  const [ newDesc, setNewDesc ] = useState('')
  const [isEdit, setIsEdit] = useState('')
  const [floors, setFloors ] = useState('')
  const [blocks, setBlocks] = useState('')
  const [newText, setNewText] = useState('')
  const [drawing, setDrawing] = useState(false);
  const [showDrawBlock, setShowDrawBlock] = useState(false);
  const [polyFlag, setPolyFlag] = useState('');
  //const editRef = useRef();
  const updateFloor = {

    floorno: 0,
    description: "newDesc",
    color: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
    blocks: [],
    boundaries: []
  }
  

  // const showLayerName = () => {
  //   const map = useMap();
  //   map.on( 'baselayerchange', function (e) {
  //     console.log('Layer name -> ', e.name);
  //     //console.log('Layer URL -> ', e.layer.options.url);
  //     //console.log('Layer attribution -> ', e.layer.options.attribution);
  // });
     

  //   // map.on("overlayremove", (e) => {
  //   //   if (e.name === "Grid1") setShowGrid(false);
  //   // });
  // };
  
  function toggle() {
    setAddFloor(!addFloor);
  }

  function GlobalMapComponent() {
    const mapGlobal = useMap()
    mapGlobal.on( 'baselayerchange', function (e) {
      console.log('Layer name -> ', e.name);
      //console.log('Layer URL -> ', e.layer.options.url);
      //console.log('Layer attribution -> ', e.layer.options.attribution);
  });
    console.log('map center:', mapGlobal.getCenter())
    return null
  }
   
  // var block = {
  //   text: "TacoBell",
  //   marker: [
  //             60.21857356963615,
  //             24.81304429310007
  //           ],
  //   icon: "",
  //   images: [],
  //   bounds: []
  // }
  const handleManageBoundaries = (e) => {
    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;
      setMapLayers((layers) => [
        ...layers,
    { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },

      // [ id: _leaflet_id, latlng:layer.getLatLngs()[0] ]  ,
      ]);
    }
    debugger;
setPolyFlag('B')
    if (!drawing) {
      editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.enable()
  } else {
      editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.completeShape()
      editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.disable()
  }
  setDrawing(!drawing)
  
    // return (
    //   <div>
    //     {markers.map((name) => (
    //       <p>{name.description}</p>

    //     ))}
        
    //   </div>
    // )
debugger;
  }
   
  const handleClick = () => {

        
    //Edit this method to perform other actions

    if (!drawing) {
        editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.enable()
    } else {
        editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.completeShape()
        editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.disable()
    }
    setDrawing(!drawing)
}

const handleAddFloor = () => {
  debugger;
}


const handleClickFloor = () => {
  debugger;
   service
   .getBuilding(refno)
   .then(building => {
    console.log("returning", building)
   updateFloor.description=newDesc
  building[0].floors.push(updateFloor)

  setMarkers(building)

  //debugger;

  // e.preventDefault()
   //service
  // .getAll()
  // .then(floor => {
    // const updateFloor = {

    //   floorno: floors.length+1,
    //   description: newDesc,
    //   color: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
    //   text: newText,
    //   marker: [],
    //   icon: "",
    //   images: [],
    //   bounds: JSON.stringify(mapLayers, 0, 2),
    //   boundaries: JSON.stringify(mapLayers, 0, 2)

    // }
    
  //   service
  //   .update(updateFloor)
  //   .then(newEntry => {
  //     setNewDesc("")
  //     setNewText("")
  //     setFloors(floor.concat(newEntry))

  //   })

    
  // })


})
}


const addBoundaries = (e) =>{
  console.log(e);

  const { layerType, layer } = e;
  if (layerType === "polygon") {
    const { _leaflet_id } = layer;
    setMapLayers((layers) => [
         ...layers,
        {  latlngs: layer.getLatLngs()[0] },
       ]);

    // setMapLayers((layers) => [
    //   ...layers,
    //   { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
    // ]);
  }
  setDrawing(false)

  e.layer.on('click', () => {
      editRef.current.leafletElement._toolbars.edit._modes.edit.handler.enable()
  })
  e.layer.on('contextmenu', () => {
      //do some contextmenu action here
  })
  e.layer.bindTooltip("Text", 
      {
        className: 'leaflet-draw-tooltip:before leaflet-draw-tooltip leaflet-draw-tooltip-visible',
        sticky: true,
        direction: 'right'
      }
  );



}




const addPolygon = (e) =>{
  console.log(e);

  const { layerType, layer } = e;
  if (layerType === "polygon") {
    const { _leaflet_id } = layer;
    setMapLayers((layers) => [
         ...layers,
        {  latlngs: layer.getLatLngs()[0] },
       ]);

    // setMapLayers((layers) => [
    //   ...layers,
    //   { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
    // ]);
  }
  setDrawing(false)

  
 



}






// const handleClick1 = (e) => {
//   e.preventDefault()
//   service
//   .getAll()
//   .then(latlng => {
//     const allMarkers = [...latlng]
//     const { layerType, layer } = e;
//     const updatePolygon = () => {

//     const { layerType, layer } = e;
//   if (layerType === "polygon") {
//     const { _leaflet_id } = layer;

//     // setMapLayers((layers) => [
//     //   ...layers,
//     //   { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
//     // ]);
//   }
//       bounds: layer.getLatLngs()[0]
//     }
//     service 
//     .update(updatePolygon)
//   })

// }
// const activeLayer = (e) => {
//   console.log(e);

//   const { layerType, layer } = e;

//   if(LayersControl.BaseLayer== checked){
//     const { _leaflet_id } = layer;

//   }

// }

const onShapeDrawn = (e) => {
  console.log(e);

  const { layerType, layer } = e;
  if (layerType === "polygon") {
    const { _leaflet_id } = layer;
    setMapLayers((layers) => [
      ...layers,
      [  _leaflet_id,  layer.getLatLngs()[0] ],
      // { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
     //[ layer.getLatLngs()[0] ]  ,
    ]);

    // 
    debugger;
   
    return (
    
      <div>
        {markers.map((name) => (
          <p>{name.description}{polyFlag}
         <GlobalMapComponent />
         </p>
        ))}
      </div>
    )
     //if (polyFlag === "B") {
      
     //}

    // setMapLayers((layers) => [
    //   ...layers,
    //   { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
    // ]);
  }
  setDrawing(false)

  e.layer.on('click', () => {
      editRef.current.leafletElement._toolbars.edit._modes.edit.handler.enable()
  })
  e.layer.on('contextmenu', () => {
      //do some contextmenu action here
  })
  e.layer.bindTooltip("Text", 
      {
        className: 'leaflet-draw-tooltip:before leaflet-draw-tooltip leaflet-draw-tooltip-visible',
        sticky: true,
        direction: 'right'
      }
  );
}

// useEffect(() => {
//   const map = editRef.current.leafletElement.getBounds();
//   map.on("baselayerchange", (e) => {
//     //do whatever
//     console.log(e.name);
//     switch (e.name) {
//       case "Sello":
//         console.log("Sello");
//         break;
//       case ({newDesc}):
//         console.log({newDesc});
//         break;
//       default:
//         return;
//     }
//   });
// }, []);

  useEffect(()=>{
    debugger;
     const map = editRef.current.leafletElement._map;
   map.on("baselayerchange", (e, f) => {
     debugger;

  //   //do whatever
     console.log(e.name);
     switch (e.name) {
       case "Sello":
        console.log("Sello");
        break;
       case ({newDesc}):
         console.log({newDesc});
        break;
       default:
         return;
     }
   });
    //var control = LayersControl.activeLayers(baseLayers)
    service
    .getBuilding(refno)
    .then(latlng =>{
      //console.log(LayersControl.getActiveBaseLayer().name)
      console.log("returning", latlng)
      debugger;
      updateFloor.floorno = latlng[0].floors.length+1;
      //setMarkers(...markers, latlng)
      setMarkers(latlng)
      debugger;
    })
  },[])
  
  const refno=window.location.pathname.replace('/EditFloorMap/','');

 

const _onCreate = (e) => {
  console.log(e);

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

const _onDeleted = (e) => {
  console.log(e);
  const {
    layers: { _layers },
  } = e;

  Object.values(_layers).map(({ _leaflet_id }) => {
    setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
  });
};

const changeHandlerDesc = (event) => setNewDesc(event.target.value)
const updateIsEdit = (e, value) => setIsEdit(value);
const changeHandlerText = (event) => setNewText(event.target.value)

 

  return ( 
    
          <div>
    
                   {
                     
                   markers.filter(item => item.id===refno).map(filteredName => (
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


{/* {filteredName.floors.map((floor) => (
  <div>
  <h4>Description:</h4>
  <input onChange={changeHandlerDesc}
  value={floor.newDesc}
  /><br/>
   
  <button onClick={handleClickFloor}>AddFloor</button>




  {floor.blocks.map((block) => (
    <div>
      <h4>Text:</h4>
      <input onChange={changeHandlerText}
  value={block.newText}
  /><br/>
  <button onClick= {handleClick}>AddPolygon</button><br/>
  

    </div>
    

    
  ))} 
  
  </div>
  

))} */}




                                              </FormGroup>
                                              

                                              </Col>
                        <Col className="col-8">
                        <Col lg={4}>
                        <Button className="btn btn-success" color="primary" onClick={() => toggle("addFloor")}> AddFloor </Button>{' '}

                        {/*Modal*/}
                        <Modal isOpen={addFloor} toggle={() => toggle("addFloor")} className="modal-sm">
                        <ModalHeader className="btn btn-primary" toggle={() => toggle("addFloor")}>Add Floor</ModalHeader>
                        <ModalBody>
                        
                          
                          <p>Floor: {filteredName.floors.length+1}</p>
                          
                            <p>Enter Floor Description</p>
                            <input type="text" onChange={changeHandlerDesc} value={newDesc} onBlur={updateIsEdit}/>

                        </ModalBody>
                        <ModalFooter>

                        <Button color="primary" onClick={() => {
                          toggle("addFloor");
                          // handleAddFloor(); 
                          handleClickFloor();
                      
                      }}>OK</Button>{' '}
                        <Button color="secondary" onClick={() => toggle("addFloor")}>Cancel</Button>
                        </ModalFooter>
                        </Modal>
                                                {/* < ModalTemplate /> */}
                        {/* <Card className="card iq-mb-3">
                           
                            <CardBody className="card-body">
                                <Button onClick={handleClickFloor} color={"primary"}>AddFloor</Button>
                            </CardBody>
                            
                        </Card> */}
                    </Col>
                                              <Map 
            center={[filteredName.latitude, filteredName.longitude]} zoom={17} maxZoom={100}

            zoomControl={true}  
            className={classes.map} 
            ref={editRef}>



<LayersControl position="topright">
<LayersControl.BaseLayer checked={true} name={filteredName.name}>
  
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
         
      </LayersControl.BaseLayer>
      <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
                <FeatureGroup >
                    <EditControl
                    ref={editRef}
                    position='topright'
                   onCreated={onShapeDrawn}
                    //onCreated={_onCreate}
                  onEdited={_onEdited}
                  onDeleted={_onDeleted}
                    //here you can specify your shape options and which handler you want to enable
                    draw={{
                        rectangle: false,
                        circle: false,
                        polyline: false,
                        circlemarker: false,
                        marker: false,
                        polygon: true// {
                        //     allowIntersection: false,
                        //     shapeOptions: {
                        //         color: "#ff0000"
                        //     },
                        // }
                    }}
                    />
                </FeatureGroup>
                {filteredName.floors.map((floor, index) => (
                 
        <LayersControl.BaseLayer checked={false} name={floor.description}>

        <LayerGroup>
          <Polygon positions={floor.boundaries} color={floor.color}
                             />
{
  floor.blocks.map((block, ind) => (
    <Polygon positions={block.bounds}>
          {/* <Tooltip sticky>        {block.text}</Tooltip> */}
      {/* <Popup direction="center" >
        {block.text}
      </Popup> */
      
      <Marker position={block.marker}>
              <Popup>
                    <span>{block.text}</span>
                   
              </Popup>
              
      </Marker>

      }
    </Polygon> 
                             
                             

  ))
}

        </LayerGroup>
        </LayersControl.BaseLayer>
             ))}
              </LayersControl>
                
                
            </Map>
            <ButtonGroup className="btn-group">
           <div className={classes.buttonStyle}>
           
                <Button 
                className="btn btn-primary"
                
                    disabled={filteredName.floors.length>2}
                    variant="contained"
                    onClick={onShapeDrawn}>
                    
                    {
                        //display the correct text regarding the state
                        drawing ? "Save draw" : "Start draw" 
                    
                    }
                </Button>
                {/* <div className={classes.buttonWrapper}> */}

                <Button
                
                className="btn btn-primary"
                onClick={handleManageBoundaries}

                >
                      Manage Boundaries
                </Button>
                 </div> 
                 </ButtonGroup>
                 
            {/* </div> */}
            {/* <div classname={classes.buttonWrapper}>
              <Button
                   >Save</Button>

            </div> */}
            <pre className="text-left">



              { 
              
              JSON.stringify(mapLayers, 0, 2)}</pre>
            
                             </Col> 
                             
                             </Row>
                             





                                      </div>
                                      
  
                  ))} 
                  
                   
                   </div>)
}


export default EditFloorMap;
