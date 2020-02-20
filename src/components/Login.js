import React from 'react';
import {Link} from 'react-router-dom';

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
        if (this.validateForm()) {
            this.props.history.push('/login');
        }
    };

    render() {
        return (
            <div className="box">

                <div className=' w3-container loginPage'>
                    <div className='row'>
                        <h3 className="login">تسجيل الدخول</h3>
                    </div>

                    <div className="row apps mt-2">
                        <div className='col-lg-6 d-flex justify-content-center'>
                            <button className="facebook"><i className="fab fa-facebook-f mr-2"></i> Facebook</button>
                        </div>
                        <div className='col-lg-6 d-flex justify-content-center'>
                            <button className="google"><i className="fab fa-google mr-2"></i> Google</button>
                        </div>
                    </div>

                    <div className='row'>
                        <label className='or'>أو</label>
                    </div>
                    <form action="" onSubmit={this.handleSubmit}>
                        {/* Email */}
                        <div className="row">
                            <input className="email" placeholder="رقم الهاتف او البريد الالكتروني" name="email"
                                   type="text"
                                   onChange={this.handleChange} value={this.state.email}/>
                            <small style={{color: "red"}} className="ml-auto">{this.state.errors["email"]}</small>
                        </div>

                        {/* Password */}
                        <div className="row">
                            <input className="password" placeholder='كلمة المرور' name="password" type="password"
                                   onChange={this.handleChange} value={this.state.password}/>
                            <small style={{color: "red"}} className="ml-auto">{this.state.errors["password"]}</small>

                        </div>


                        <div className="row d-flex justify-content-center groupForget">
                            <div className="col-lg-6 forgetPassword">
                                <Link to="/login/recover" className="forgetPassword1">نسيت كلمة المرور؟</Link>
                            </div>

                            <div className="col-lg-6 remember">
                                <div>
                                    <label className="remember1">تذكرني</label>
                                    <input type="checkbox" className="checkbox"/>
                                </div>
                            </div>

                            <button className="loginButton" type="submit">تسجيل الدخول</button>
                        </div>
                    </form>

                    <div className="row">
                        <div className="col-lg-12 createAccount">
                            <small>ليس لديك حساب؟</small>

                            <Link to="/signup">إنشاء حساب </Link>
                        </div>

                    </div>


                </div>

            </div>
        )
    }
}

export default Login;