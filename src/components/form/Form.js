import React, { Component } from "react";
import "./Form.css";
import axios from "axios";
import Demo from "../geolocated/Geolocated";

export default class Form extends Component {
    state = {
        placename: "",
        notes: "",
        description: "",
        image: null,
        base64: null,
        show: this.props.show
    };

    handleSubmit = e => {
        e.preventDefault();
    };


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state.placename);
    }

    handleImageChange = (event) => {
        let file = event.target.files[0];
        console.log(file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            let base64data = reader.result;
            let array = base64data.split(',');
            this.setState({
                file: file,
                base64: array[1]
            });
            console.log(this.state.base64);
        }
    }


    handleSubmit = (event, coords) => {
        event.preventDefault();
        console.log("default", coords);
        let url = "https://18.140.5.226:8080/api/wiki/uploadimage";
        let config = {
            headers: {
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJjYW5DcmVhdGUiOnRydWUsImNhbkRlbGV0ZSI6dHJ1ZSwiY2FuVXBkYXRlIjp0cnVlLCJpYXQiOjE1NzA0NzA1NDQsImlzcyI6IlZlcnQueCIsInN1YiI6Ildpa2kgQVBJIn0.3hxH0SXtO3v-uSEuVzngJERyRczCjf1DDXXMgT1PR3k",
            }
        };
        const data = {
            base64encodedImage: this.state.base64
        };
        const updatedData = JSON.stringify(data);
        console.log(updatedData);
        axios.post(url, updatedData, config)
            .then(response => {
                let uri = "https://18.140.5.226:8080/api/wiki/";
                let config = {
                    headers: {
                        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJjYW5DcmVhdGUiOnRydWUsImNhbkRlbGV0ZSI6dHJ1ZSwiY2FuVXBkYXRlIjp0cnVlLCJpYXQiOjE1NzA0NzA1NDQsImlzcyI6IlZlcnQueCIsInN1YiI6Ildpa2kgQVBJIn0.3hxH0SXtO3v-uSEuVzngJERyRczCjf1DDXXMgT1PR3k",
                    }
                };
                const reqBody = {
                    name: this.state.placename,
                    content: {
                        imageUrls: [response.data.imageUrl],
                        descriptions: [{
                            descriptionString: this.state.description,
                            notes: {
                                notes: this.state.notes
                            }
                        }],
                        vedioUrls: []
                    },
                    location: {
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        altitude: null,
                    },
                    contributor: {
                        username: "momos"
                    }
                }
                const jsonreqBody = JSON.stringify(reqBody);
                console.log(jsonreqBody);
                axios.post(uri, reqBody, config)
                    .then(response => {
                        alert("Your Entry submitted succesfully ", response._id);
                        this.setState({ placename: "" });
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }



    render() {
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1>Please Fill the detais</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="firstName">
                            <label htmlFor="firstName">Name of the Place</label>
                            <input
                                placeholder="Place Name"
                                type="text"
                                name="placename"
                                noValidate
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="lastName">
                            <label htmlFor="lastName">Notes</label>
                            <input
                                placeholder="Notes"
                                type="text"
                                name="notes"
                                noValidate
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="email">
                            <label htmlFor="email">Description</label>
                            <textarea
                                placeholder="Description"
                                type="text"
                                name="description"
                                noValidate
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Image</label>
                            <input
                                placeholder="Image"
                                type="file"
                                name="image"
                                noValidate
                                onChange={this.handleImageChange}
                            />
                        </div>
                        <div className="createAccount">
                            <Demo type="submit"
                                clicked={this.handleSubmit}
                            >
                                Submit</Demo>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

