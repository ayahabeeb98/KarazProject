import React  from 'react';
import axios from 'axios';

class ForgetPassword extends React.Component{
    // const [email , setEmail] = useState('');
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error : '',
            valid : '',
            errors: {}
        };
    }

    //check if the email field is not empty and correct
    validateEmail = () => {
        let email = this.state.email;
        let error = '';
        let validEmail = true;

        if(!email) {
            validEmail= false;
            error = 'لم تدخل بريدك الإلكتروني بعد'
        }else {
            if (!email.match(/[^\d][\w.]+@\w+(\.[A-Za-z]+){1,2}/g)){
                validEmail = false;
                error = 'البريد الالكتروني الذي أدخلته غير صحيح'
            }
        }

        this.setState({error: error});
        return validEmail;
    };

    submitForm = (e) =>{
        e.preventDefault();
        const { email } = this.state;
        const user = { email };
        let errors = {};

        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };

        //if the validate success
        if (this.validateEmail()){
            axios.post('https://karaz12.herokuapp.com/forgetpass/sendCode',JSON.stringify(user), {headers:headers})
                .then(Response => {
                    if (Response.status === 200) {
                        this.setState({valid : Response.data});
                        this.props.history.push({
                            pathname: '/login/recover/token',
                            state: { userEmail: JSON.stringify(user)}
                        });
                    } else {
                        throw new Error('Something went wrong ...');
                    }
                })
                .catch(error => {
                    if (error.name === "Error") {
                        errors["serverError"] = "هذا البريد غير مسجل لأي حساب لدينا";
                        this.setState(this.setState({errors: errors}));
                    }
                });
        }
    };

    handleChange = (e) => {
        this.setState({
            email : e.target.value
        })
    };

    render() {
        return (
            <div className="box">
                <h3 className="headText">البحث عن حسابك</h3>
                <p className="pass">{this.state.errors["serverError"]}</p>
                <form action="" className="choice passwordChoice" onSubmit={this.submitForm}>
                    <p className="text-right"> أدخل بريدك الإلكتروني للعثور على حسابك </p>
                    <input type="email" placeholder="البريد الإلكتروني" className="email-filed form-control"
                           onChange={this.handleChange} value={this.state.email}
                    />
                    <small className="pass">{this.state.error}</small>
                    <button type="submit" className="btn btn-send"> إرسال  </button>
                </form>
            </div>
        )
    }

}

export default ForgetPassword;