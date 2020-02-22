import React  from 'react';
import axios from "axios";


class ConfirmEmail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            random: '',
            error : '',
        };
    }






    submitForm = (e) =>{
        const random = Number(this.state.random);

        const obj = JSON.parse(this.props.location.state.userEmail);
        const email = obj.email;

        const user = {email,random};

        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };

        if(!random) {
            this.setState({error:"تحقق من بريدك الإلكتروني وأدخل الرمز"})
        }else {
            axios.post('http://karaz12.herokuapp.com/forgetpass/verifyCode',JSON.stringify(user), {headers:headers})
                .then(Response => {
                    if (Response.status === 200) {
                        this.props.history.push({
                            pathname: '/login/reset',
                            state: { userEmail: email}
                        });
                    } else {
                        throw new Error('Something went wrong ...');
                    }
                })
                .catch(error => {
                    if (error.name === "Error") {
                        error = "الرمز الذي أدخلته غير صحيح";
                        this.setState(this.setState({error: error}));
                    }
                });
        }
        e.preventDefault();


    };

    handleChange = (e) => {
        this.setState({
            random : e.target.value
        })
    };

    render() {
        return (
            <div className="box">
                <h3 className="headText"> {this.state.email}تأكيد الرمز</h3>
                <form action="" className="choice passwordChoice" onSubmit={this.submitForm}>
                    <input type="text" placeholder=" أدخل الرمز " className="email-filed form-control"
                           onChange={this.handleChange} value={this.state.random}
                    />
                    <small className="pass">{this.state.error}</small>
                    <button type="submit" className="btn btn-send"> إرسال  </button>
                </form>
            </div>
        )
    }

}

export default ConfirmEmail;