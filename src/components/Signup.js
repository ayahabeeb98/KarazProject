import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Signup extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            name: '',
            phone :'',
            email: '',
            password: '',
            errors: {},
            creditCards: '',
            accept : false,
            alertMsg : ''
        }
    }

    handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    validateForm = () => {
        let isValid = true;
        let {name, email, password , accept ,alertMsg} = this.state;
        let errors = {};

        if(!name) {
            isValid = false;
            errors["name"] = 'الرجاء إدخال اسم المستخدم'
        }else if (name.length < 3) {
            isValid = false;
            errors["name"] = 'الاسم الذي أدخلته قصير جداً'

        }else {
            if(!name.match(/^[a-zA-Z\u0600-\u06FF\s]+$/)){
                isValid = false;
                errors["name"] = "الاسم يتكون من أحرف عربية أو انجليزية فقط"
            }
        }

        if(!email) {
            isValid= false;
            errors["email"] = 'الرجاء إدخال بريدك الإلكتروني'
        }else {
            if (!email.match(/[^\d][\w.]+@\w+(\.[A-Za-z]+){1,2}/g)){
                isValid = false;
                errors["email"] = 'البريد الالكتروني الذي أدخلته غير صحيح'
            }
        }

        if (!password) {
            isValid = false;
            errors["password"] = "الرجاء إدخال كلمة مرور";
        }else {
            if(!password.match(/^(?=.*\d)(?=.*[a-z]).{8,}$/)){
                isValid = false;
                errors["password"] =  ".كلمة المرور التي اخترتها ضعيفة, يجب ان تحتوي أحرف وأرقام ";
            }
        }

        if (!accept) {
            isValid = false;

            alertMsg = <div className="alert alert-danger text-right" role="alert">
                لم توافق على شروط الخدمة
                </div>;
            this.setState({alertMsg});
            errors["accept"] = "لم توافق على شروط الخدمة"
        }

        this.setState({errors: errors});
        return isValid;
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {name, email , password} = this.state;
        const user = {name, email , password};
        let errors = {};

        const headers = {
            'withCredentials' : true ,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };

        //if the validate success
        if (this.validateForm()){
            axios.post('https://karaz12.herokuapp.com/auth/signup',JSON.stringify(user), {headers:headers})
                .then(Response => {
                    if (Response.status === 200) {
                        this.setState({creditCards : Response.data.user});
                        this.props.history.push('/signup/verify-email');
                    } else {
                        throw new Error('Something went wrong ...');
                    }
                })
                .catch(error => {
                    if (error.name === "Error") {
                        errors["serverError"] = "البريد الالكتروني الذي أدخلته مستخدم في حساب آخر";
                        this.setState(this.setState({errors: errors}));
                    }
                });
        }
    };

    render() {
        const {name , password , email , accept , alertMsg} = this.state;

        return (
            <div className="box">

                <div className=' w3-container loginPage'>
                    <div className='row'>
                        <h3 className="login">انشاء حساب جديد</h3>
                    </div>

                    {/**** Third-party ****/}

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


                    {/***** Sign up form *****/}
                    {alertMsg}
                    <form action="" onSubmit={this.handleSubmit}>
                       {/* Name Field */}
                        <div className="form-group">
                            <input className="form-control email-filed response" placeholder="الإسم كاملاً" name="name" type="text"
                                   onChange={this.handleChange} value={name}/>
                            <small className="pass">{this.state.errors["name"]}</small>

                        </div>

                        {/*Phone or Email*/}
                        <div className="form-group">
                            <input className="form-control email-filed response" placeholder="رقم الهاتف او البريد الالكتروني" name="email" type="text"
                                   onChange={this.handleChange} value={email}/>
                            <small  className="pass">{this.state.errors["email"]}</small>
                            <small  className="pass">{this.state.errors["serverError"]}</small>

                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <input className="form-control email-filed response" placeholder='كلمة المرور' name="password" type="password"
                                   onChange={this.handleChange} value={password}/>
                            <small className="pass">{this.state.errors["password"]}</small>

                        </div>


                        <div className="form-group">
                            <input className="form-control email-filed response" placeholder="المكان "/>
                        </div>

                        <div className="row d-flex justify-content-center mx-0 w-100">
                            <div className="col-lg-12 accept">
                                <div >
                                    <label className="accept1">أوافق على شروط الخدمة والخصوصية</label>
                                    <input type="checkbox" name="accept" className="checkbox" checked={accept} onChange={this.handleChange} />
                                </div>
                            </div>
                            <button type="submit" className="loginButton response">انشاء حساب</button>
                        </div>
                    </form>

                    <div className="row mb-3">
                        <div className="col-lg-12 createAccount">
                            <Link to="/login"> تسجيل الدخول </Link>
                            <label> لديك حساب؟ </label>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default Signup;