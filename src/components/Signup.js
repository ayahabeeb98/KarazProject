import React from 'react';
import {Link} from 'react-router-dom';

class Signup extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            name: '',
            phone :'',
            email: '',
            password: '',
            errors: {}
        }
    }

    handleChange = (e) => {
      this.setState({
          [e.target.name] : e.target.value
        });
    };

    validateForm = () => {
        let isValid = true;
        let {name, phone , email, password} = this.state;
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
            errors["email"] = 'لم تدخل بريدك الإلكتروني بعد'
        }else {
            if (!email.match(/[^\d][\w.]+@\w+(\.[A-Za-z]+){1,2}/g)){
                isValid = false;
                errors["email"] = 'البريد الالكتروني الذي أدخلته غير صحيح'
            }
        }

        if (!password) {
            isValid = false;
            errors["password"] = "لم تدخل كلمة مرور بعد";
        }else {
            if(!password.match(/^(?=.*\d)(?=.*[a-z]).{8,}$/)){
                isValid = false;
                errors["password"] = ".كلمة المرور التي اخترتها ضعيفة ";
            }
        }

        this.setState({errors: errors});
        return isValid;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validateForm()){
            this.props.history.push('/login');
        }
    };

    render() {
        return (
            <div className="box">


                <div className=' w3-container loginPage'>
                    <div className='row'>
                        <h3 className="login">انشاء حساب جديد</h3>
                    </div>

                    {/**** Third-party ****/}

                    <div className="row apps mt-2">
                        <div className='col-lg-6 d-flex justify-content-center'>
                            <button className="facebook"><i className="fab fa-facebook-f mr-2" />  Facebook</button>
                        </div>
                        <div className='col-lg-6 d-flex justify-content-center'>
                            <button className="google"><i className="fab fa-google mr-2" />  Google</button>
                        </div>
                    </div>

                    <div className='row'>
                        <label className='or'>أو</label>
                    </div>


                    {/***** Sign up form *****/}

                    <form action="" onSubmit={this.handleSubmit}>
                       {/* Name Field */}
                        <div className="row">
                            <input className="name" placeholder="الإسم كاملاً" name="name" type="text"
                                   onChange={this.handleChange} value={this.state.name}/>
                            <small style={{color: "red"}} className="ml-auto">{this.state.errors["name"]}</small>

                        </div>

                        {/*Phone or Email*/}
                        <div className="row">
                            <input className="email" placeholder="رقم الهاتف او البريد الالكتروني" name="email" type="text"
                                   onChange={this.handleChange} value={this.state.email}/>
                            <small style={{color: "red"}} className="ml-auto">{this.state.errors["email"]}</small>
                        </div>

                        {/* Password */}
                        <div className="row">
                            <input className="password" placeholder='كلمة المرور' name="password" type="password"
                                   onChange={this.handleChange} value={this.state.password}/>
                            <small style={{color: "red"}} className="ml-auto">{this.state.errors["password"]}</small>

                        </div>


                        <div className="row">
                            <input className="location" placeholder="المكان "/>
                        </div>

                        <div className="row d-flex justify-content-center groupForget">
                            <div className="col-lg-12 accept">
                                <div >
                                    <label className="accept1">أوافق على شروط الخدمة والخصوصية</label>
                                    <input type="checkbox" className="checkbox" />
                                </div>
                            </div>
                            <button type="submit" className="loginButton">انشاء حساب</button>
                        </div>
                    </form>

                    <div className="row mb-2">
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