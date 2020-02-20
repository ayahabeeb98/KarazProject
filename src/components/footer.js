import React from "react";
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <footer className="mainFooter">
            <div className="copyRight">
                <small>© 2020 Karaz Beauty </small>
            </div>
            <ul>
                <li><a href="#" className="App-link">الدعم الفني</a></li>
                <li><a href="#" className="App-link">من نحن</a></li>
                <li><a href="#" className="App-link"> الشروط والخصوصية</a></li>
            </ul>
        </footer>
    );
}

export default Footer;