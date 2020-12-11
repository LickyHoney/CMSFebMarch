import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//import MapView from "./MapView.js";
import Map1 from "./Map1.js";
import { Link } from 'react-router-dom';
//import {MapContainer,  Marker, Popup,  TileLayer } from "react-leaflet";
import { BrowserRouter as Router, Route } from "react-router-dom";

//import { useHistory } from 'react-router-dom';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  
  
  render() {
    const { user } = this.props.auth;

    return (
      <div >
        
        
               
                {/* <MapView /> */}
            <div>
            
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
                
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
            </div>
          </div>
        
        
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
