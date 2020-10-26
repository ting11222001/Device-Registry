import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Device = props => (
    <tr>
      <td>{props.device.accountname}</td>
      <td>{props.device.description}</td>
      <td>{props.device.duration}</td>
      <td>{props.device.date.substring(0,24)}</td>
      <td>
        <Link to={"/edit/"+props.device._id}>edit</Link> | <a href="#" onClick={() => { props.deleteDevice(props.device._id) }}>delete</a>
      </td>
    </tr>
);  

export default class DevicesList extends Component {
    constructor(props) {
        super(props);

        this.deleteDevice = this.deleteDevice.bind(this);
        this.state = {
            devices: []
        };
    };
    
    componentDidMount() {
        axios.get('http://localhost:5000/devices/')
        .then(res => 
            this.setState({
                devices: res.data
            })
        )
        .catch(error => 
            console.log(error)
        );
    };

    deleteDevice(id) {
        axios.delete('http://localhost:5000/devices/'+id)
        .then(res => console.log(res.data));
        
        this.setState({
          devices: this.state.devices.filter(el => el._id !== id)
        });
    };


    deviceList() {
        return this.state.devices.map(currentdevice => {
          return <Device device={currentdevice} deleteDevice={this.deleteDevice} key={currentdevice._id}/>;
        })
    };

    render(){
        return (
            <div>
                <h3>Logged Devices</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Account Name</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.deviceList() }
                </tbody>
                </table>
            </div>
        );
    };
};