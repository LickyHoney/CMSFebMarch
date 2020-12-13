/*import React from "react"

const DisplayEntry = ({ name }) => {
    return(
        <div>
            {name} 
        </div>
    )
}

const DisplayEntries = ({ names, regVal }) => {
    const regExp = new RegExp(regVal, "i")
    const filteredArray = names.filter((entry) => regExp.test(entry.name))
    const namesArray = filteredArray.map((entry) => <DisplayEntry key={entry.id} name={entry.name} />)
    return(
    <div>
        {namesArray}
    </div>
    )
}

export default DisplayEntries*/

import React, {useState, useEffect} from "react"
import service from "./services.js"
import {Row, Col, Table, Card, CardBody} from 'reactstrap';
import { Grid,  TableHeaderRow, TableEditColumn, TableInlineCellEditing } from '@devexpress/dx-react-grid-bootstrap4';

const getRowId = row => row.id;

const DisplayEntry = ({ lat, lng, name, id }) => {
    const [ newName, setName ] = useState(name)
    const [ newLat, setLat] = useState(lat)
    const [ newLng, setLng] = useState(lng)
  //  const [ newNumber, setNumber ] = useState(number)
    const [ buttonVal, setButtonVal ] = useState("")
    const [columns] = useState([
        {
            title: "Name",
            name: "name",
        },
        {
            title: "Lat",
            name: "lat",
            sortable: true,
        },
        {
            title: "Lng",
            name: "lng",
            sortable: true,
        },
    ]);
    const [rows, setRows] = useState([
        {newName},
        {newLat},
        {newLng}
        
    ]);
    const [editingCells, setEditingCells] = useState([]);

    const deleteHandler = (id) =>{
        const handler = () =>{
            if(window.confirm(`Do you really want to delete ${name}\'s Building details?`)){
                service.deletion(id)
                .then(response => {
                    
                    setName("")
                    setLat("")
                    setLng("")
                    
                    setButtonVal("")
                })
            }
        }
        return handler
    }

    useEffect(()=>{
        setButtonVal(<button onClick={deleteHandler(id)}>delete</button>)
    },
    [])

    return(
       
        <div>
            {newName}
            {newLat}
            {newLng}
            {buttonVal}
           

            {/* <Table className="table" items={{DisplayEntries}}>   
      <thead>
    
    <th>Name</th>
    <th>Lat</th>
    <th>Lng</th>
  
          </thead>          
 
<tbody>
 
  <tr>
    
  </tr>
  </tbody>
  </Table> */}

        </div> 
    )
}

const DisplayEntries = ({ names, regVal }) => {
    const regExp = new RegExp(regVal, "i")
    const filteredArray = names.filter((entry) => regExp.test(entry.name))
    const namesArray = filteredArray.map((entry) => <DisplayEntry key={entry.id} name={entry.name} lat={entry.lat} lng={entry.lng} id={entry.id} />)
    debugger;
    return(
    <div>
        {namesArray}
    </div>
    )
}

export default DisplayEntries