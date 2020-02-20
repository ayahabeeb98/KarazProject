import React from 'react';
import {Link} from 'react-router-dom';

class Login extends React.Component {
    render() {
        return (
            <div className="box">
                Login
                <Link to="/login/recover">هل نسيت كلمة المرور؟ </Link>
            </div>
        )
    }
}

export default Login;