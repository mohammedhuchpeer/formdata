import React, { Component } from 'react';
import MediaCard from '../mediacard/MediaCard';
import Aux from '../hoc/Base';
import './Cards.css';
import axios from 'axios';
import Demo from '../geolocated/Geolocated';
import Form from '../form/Form';
import Modal from '../modal/Modal';
import Header from "../../components/headeritems/Header";
import Createdata from '../../containers/createdata/Createdata';

class Cards extends Component {
    state = {
        posts: [],
        showForm: false,
        showPosts: false,
        isLoading:true
    }

    closePosts = () => {
        this.setState({ showPosts: false });
    }

    showPostsHandler = () => {
        this.setState({ showPosts: true });
    }

    createCanceller = () => {
        this.setState({ showForm: false });
    }

    showHandler = () => {
        this.setState({ showForm: true });
    }

    getData = (event, coords) => {
        let targetUrl = 'https://18.140.5.226:8080/api/wiki/geolocate';
        let postData = {
            "latitude": coords ? coords.latitude : null,
            "longitude": coords ? coords.longitude : null,
        };
        let config = {
            headers: {
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJjYW5DcmVhdGUiOnRydWUsImNhbkRlbGV0ZSI6dHJ1ZSwiY2FuVXBkYXRlIjp0cnVlLCJpYXQiOjE1NzA0NzA1NDQsImlzcyI6IlZlcnQueCIsInN1YiI6Ildpa2kgQVBJIn0.3hxH0SXtO3v-uSEuVzngJERyRczCjf1DDXXMgT1PR3k",
            }
        };
        axios.post(targetUrl, postData, config)
            .then(response => this.setState({ posts: response.data, isLoading:false }))
            .catch(error => console.log(error))
    }


    render() {
        const sources = this.state.posts;
        let showData = <div className="Loader">Loading...</div>;
        if (!this.state.isLoading) {
            showData = <div className="Card">
                {sources.map(source => (
                    <MediaCard
                        key={source._id}
                        name={source.name}
                        image={source.content.imageUrls[0]}
                        description={source.content.descriptions[0].descriptionString}
                        contributor={source.contributor.username}
                    />
                ))}
            </div>;
        }
        return (
            <Aux>
                <div className="ButtonSpan">
                    <Demo clicked={this.getData}>Show Places</Demo>
                    <Header clicked={this.showHandler} />
                </div>
                <Aux>
                    <Modal show={this.state.showForm} modalClosed={this.createCanceller}>
                        <Form show={this.state.showForm} />
                    </Modal>
                </Aux>
                <Aux>
                    <Modal show={this.state.showPosts} modalClosed={this.closePosts}>
                        <Createdata />
                    </Modal >
                </Aux>
            {showData}
            </Aux>
        );
    }
}

export default Cards;