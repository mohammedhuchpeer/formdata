import React from 'react';
import Button from '../button/Button';
import './Header.css';

const Header = (props) => (
    <div className="Navigationitems">
        <Button clicked={props.clicked}>Create</Button>
    </div>
);

export default Header;