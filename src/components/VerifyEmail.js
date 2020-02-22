import React from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";


class VerifyEmail extends React.Component{
    constructor () {
        super();
        this.state = {
            success : '',
            error : ''
        }

    }

    handleClick = (e) => {
        axios.get('https://karaz12.herokuapp.com/verification/send')
            .then(response => {
                if (response.status === 200) {
                    this.setState({success : response.data})
                } else {
                    this.setState({error : "حسابك مفعّل"})
                }
            })
            .catch(error => this.setState(error))
    };
    render() {
        if (this.state.success) {
            return <Redirect to='/profile' />
        }
        return (
            <div className="box">
                <h3 className="headText">تأكيد الحساب</h3>
                <span className="pass">{this.state.errors}</span>
                <p className="text-center mt-4">الرجاء تأكيد حسابك حتى تتمكن من تصفح الموقع  <br/>
                سنقوم بإرسال رابط إلى بريدك الإلكتروني</p>

                <button className="btn btn-send btn-email" onClick={this.handleClick}>إرسال</button>
            </div>
        )
    }
}

export default VerifyEmail;