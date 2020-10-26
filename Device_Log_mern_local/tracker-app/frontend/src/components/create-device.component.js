import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateDevice extends Component {
    constructor(props) {
        super(props);

        this.onChangeAccountname = this.onChangeAccountname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            accountname:'',
            description: '',
            duration: 0,
            date: new Date(),
            accounts: []
        };
    };

    componentDidMount(){
        axios.get('http://localhost:5000/accounts/')
        .then(res => {
            if (res.data.length > 0){
                this.setState({
                    accounts: res.data.map(account => account.accountname),
                    accountname: res.data[0].accountname
                });
            };
        });
    };

    onChangeAccountname(e) {
        this.setState({
            accountname: e.target.value
        });
    };

    onChangeDescription(e) {
        this.setState({
          description: e.target.value
        });
    };
    
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    };

    onChangeDate(date) {
        this.setState({
            date: date
        });
    };

    onSubmit(e){
        e.preventDefault();
        const device = {
            accountname: this.state.accountname,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        };

        console.log(device);
        axios.post('http://localhost:5000/devices/add', device)
        .then(res => console.log(res.data));

        // window.location = '/';
    };
    
    render(){
        return(
            <div>
                <h3>Create New Device Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Account Name: </label>
                        <select ref="accountInput"
                            required
                            className="form-control"
                            value={this.state.accountname}
                            onChange={this.onChangeAccountname}>
                            {
                                this.state.accounts.map(function(account) {
                                return <option 
                                    key={account}
                                    value={account}>{account}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    };
};