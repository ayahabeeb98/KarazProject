import React from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom";



class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            result : null,
            error : null,
            logout:''
        }
    }

    componentDidMount() {
        axios.get('https://karaz12.herokuapp.com/profile/')
            .then(result => {
                this.setState({result})
            })
            .catch(error => {this.setState({ error })
            });
    }

    logout = () => {
        axios.get('https://karaz12.herokuapp.com/auth/logout')
            .then(response =>{
                if (response.status === 200) {
                   this.setState({logout : response.data});
                }
            })
            .catch(error => this.setState(error))
    };
    render() {

        const { logout} = this.state;

        if(logout) {
            return <Redirect to='/'/>
        }
        // if (!result) {
        //     console.log(error);
        //     return null;
        // }
        //
        // if (error) {
        //     return <Redirect to="/login"/>
        // }

        return (
            <div className="box">
                <h1>User Profile</h1>
                <button onClick={this.logout} className="btn btn-send">Log out</button>
            </div>
            )

    }
}
export default Profile;