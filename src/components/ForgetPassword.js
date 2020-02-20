import React  from 'react';
import {Redirect} from "react-router-dom";


class ForgetPassword extends React.Component{
    // const [email , setEmail] = useState('');
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }
    submitForm = (e) =>{
        e.preventDefault();
        this.props.history.push('/login/recover/token');

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
                        <button type="submit" className="btn btn-send"> إرسال  </button>
                    </form>
            </div>
        )
    }

}

export default ForgetPassword;