import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            password: '',
            errors: {}
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    validateForm = () => {
        let isValid = true;
        let {email, password} = this.state;
        let errors = {};

        if (!email) {
            isValid = false;
            errors["email"] = 'لم تدخل بريدك الإلكتروني بعد'
        }

        if (!password) {
            isValid = false;
            errors["password"] = "لم تدخل كلمة مرور بعد";
        }

        this.setState({errors: errors});
        return isValid;
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { email , password} = this.state;
        const user = { email , password};
        let errors = {};

        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };

        //if the validate success
        if (this.validateForm()){
            axios.post('https://karaz12.herokuapp.com/auth/login',JSON.stringify(user), {headers:headers})
                .then(Response => {
                    if (Response.status === 200) {
                        this.setState({creditCards : Response.data.user});
                        this.props.history.push('/profile');
                    } else {
                        throw new Error('Something went wrong ...');
                    }
                })
                .catch(error => {
                    if (error.name === "Error") {
                        errors["serverError"] = "خطأ في البريد الإلكتروني أو كلمة المرور";
                        this.setState(this.setState({errors: errors}));
                    }
                });
        }
    };

    // handleGmailAuth = () => {
    //     axios('https://karaz12.herokuapp.com/auth/google')
    //         .then(result => {
    //
    //         })
    //         .catch(error => console.log(error))
    // };

    render() {
        return (
            <div className="box">

                <div className=' w3-container loginPage'>
                    <div className='row'>
                        <h3 className="login">تسجيل الدخول</h3>
                    </div>

                    <div className="row apps mt-2">
                        <div className='col-6 d-flex justify-content-center'>
                            <button className="facebook"><a href="https://karaz12.herokuapp.com/auth/facebook" className="App-link">
                                <i className="fab fa-facebook-f mr-2" /> Facebook</a></button>
                        </div>
                        <div className='col-6 d-flex justify-content-center'>
                            <button className="google"><a href="https://karaz12.herokuapp.com/auth/google" className="App-link">
                                <i className="fab fa-google mr-2" /> Google</a></button>
                        </div>
                    </div>

                    <div className=''>
                        <p className='or'>أو</p>
                    </div>

                    <form action="" onSubmit={this.handleSubmit}>
                        {/* Email */}
                        <p className="pass">{this.state.errors["serverError"]}</p>
                        <div className="form-group">
                            <input className="form-control email-filed response" placeholder="رقم الهاتف او البريد الالكتروني"
                                   name="email"  type="text"
                                   onChange={this.handleChange} value={this.state.email}/>
                            <small className="pass">{this.state.errors["email"]}</small>
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <input className="form-control email-filed response" placeholder='كلمة المرور' name="password" type="password"
                                   onChange={this.handleChange} value={this.state.password}/>
                            <small className="pass">{this.state.errors["password"]}</small>

                        </div>


                        <div className="row w-100 d-flex justify-content-center mx-0 response">
                            <div className="col-6 forgetPassword">
                                <Link to="/login/recover" className="forgetPassword1">نسيت كلمة المرور؟</Link>
                            </div>

                            <div className="col-6 remember">
                                <div>
                                    <label className="remember1">تذكرني</label>
                                    <input type="checkbox" className="checkbox"/>
                                </div>
                            </div>

                            <button className="loginButton" type="submit">تسجيل الدخول</button>
                        </div>
                    </form>

                    <div className="row mb-2">
                        <div className="col-12 createAccount">
                            <small>ليس لديك حساب؟</small>

                            <Link to="/signup">  إنشاء حساب </Link>
                        </div>

                    </div>


                </div>

            </div>
        )
    }
}

export default Login;