import React from 'react';

const MyCard = (props) => {
    return <img src={props.image} style={{ width: 300, height: 145 }} alt={props.alt} />;
}

export default MyCard;