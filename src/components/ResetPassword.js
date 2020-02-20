import React  from 'react';


class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword : '',
            errors : {}
        };
    }

    handleValidate = () => {
        let isValid = true;
        let errors = {};
        let password = this.state.password;
        let confirmPass = this.state.confirmPassword;

        if (!password) {
            isValid = false;
            errors["password"] = "لم تدخل كلمة مرور بعد";
        }else {
            if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)){
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
        if(this.handleValidate()){
            this.props.history.push('/');
        }else{
            console.log(this.state.errors["password"]);
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
                <form action="" className="choice passwordChoice mt-3"  onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label htmlFor="password" className="pass">أدخل كلمة المرور الجديدة</label>

                        <input type="password" id="password" className="form-control email-filed"
                               placeholder="********" name="password"
                               value={password} onChange={this.handleChange}/>
                        <small  className="pass">{this.state.errors["password"]}</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="ConfirmPassword" className="pass">أعد إدخال كلمة المرور </label>
                        <input type="password" id="ConfirmPassword" className="form-control email-filed"
                               placeholder="********" name="confirmPassword"
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