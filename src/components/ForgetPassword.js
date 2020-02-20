import React  from 'react';


class ForgetPassword extends React.Component{
    // const [email , setEmail] = useState('');
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error : ''
        };
    }

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
        if(this.validateEmail()) {
            this.props.history.push('/login/recover/token');
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
                <h3 className="headText">إسترجاع كلمة المرور</h3>
                    <form action="" className="choice passwordChoice" onSubmit={this.submitForm}>
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