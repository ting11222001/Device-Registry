import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditDevice extends Component {
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
        axios.get('http://localhost:5000/devices/'+this.props.match.params.id)
        .then(res => {
            this.setState({
                accountname: res.data.accountname,
                description: res.data.description,
                duration: res.data.duration,
                date: new Date(res.data.date)
            })   
        })
        .catch(error =>
            console.log(error)
        );

        axios.get('http://localhost:5000/accounts/')
        .then(res => {
            if (res.data.length > 0){
                this.setState({
                    accounts: res.data.map(account => account.accountname),
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
        axios.post('http://localhost:5000/devices/update/'+this.props.match.params.id, device)
        .then(res => console.log(res.data));

        // window.location = '/';
    };
   
    render(){
       return(
            <div>
            <h3>Edit Device Log</h3>
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
                    <input type="submit" value="Edit Device Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
       );
   };
};