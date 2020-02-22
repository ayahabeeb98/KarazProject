import React  from 'react';
import axios from "axios";


class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordConfirm : '',
            errors : {}
        };
    }

    handleValidate = () => {
        let isValid = true;
        let errors = {};
        let password = this.state.password;
        let confirmPass = this.state.passwordConfirm;

        if (!password) {
            isValid = false;
            errors["password"] = "لم تدخل كلمة مرور بعد";
        }else {
            if(!password.match(/^(?=.*\d)(?=.*[a-z]).{8,}$/)){
                isValid = false;
                errors["password"] = ".كلمة المرور التي اخترتها ضعيفة ";
            }
        }


        if (!confirmPass) {
            isValid = false;
            errors["confirmPassword"] = "لم تدخل كلمة مرور بعد";
        }else {
            if(password !== confirmPass){
                isValid = false;
                errors["confirmPassword"] = "كلمتا المرور غير متطابقتين";
            }
        }

        this.setState({errors: errors});
        return isValid;
    };

    submitForm = (e) =>{
        e.preventDefault();
        const email = this.props.location.state.userEmail;
        const {password , passwordConfirm,errors } = this.state;

        const user = {email,password,passwordConfirm};
        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };

        if(this.handleValidate()){
            axios.post('http://karaz12.herokuapp.com/forgetpass/changePassword',JSON.stringify(user), {headers:headers})
                .then(Response => {
                    if (Response.status === 200) {
                        this.props.history.push('/profile');
                    } else {
                        throw new Error('Something went wrong ...');
                    }
                })
                .catch(error => {
                    if (error.name === "Error") {
                        errors["serverError"] = "كلمتا المرور غير متطابقتين";
                        this.setState(this.setState({errors: errors}));
                    }
                });

        }

    };

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    render() {
        const {password , confirmPassword} = this.state;
        return (
            <div className="box">
                <h3 className="headText">إسترجاع كلمة المرور</h3>
                <small  className="pass">{this.state.errors["serverError"]}</small>
                <form action="" className="choice passwordChoice mt-3"  onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label htmlFor="password" className="RestPass">أدخل كلمة المرور الجديدة</label>

                        <input type="password" id="password" className="form-control email-filed"
                               placeholder="********" name="password"
                               value={password} onChange={this.handleChange}/>
                        <small  className="pass">{this.state.errors["password"]}</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="ConfirmPassword" className="RestPass">أعد إدخال كلمة المرور </label>
                        <input type="password" id="ConfirmPassword" className="form-control email-filed"
                               placeholder="********" name="passwordConfirm"
                               value={confirmPassword} onChange={this.handleChange} />
                        <small  className="pass">{this.state.errors["confirmPassword"]}</small>

                    </div>

                    <button type="submit" className="btn btn-send"> إرسال  </button>
                </form>
            </div>
        )
    }


}

export default ResetPassword;