import axios from 'axios';
import React, { Component } from 'react';

const API_HOST = 'http://localhost:8000';

let _csrfToken = null;

async function getCsrfToken() {
    if (_csrfToken === null) {
        const response = await fetch(`${API_HOST}/csrf/`, {
            credentials: 'include',
        });
        const data = await response.json();
        _csrfToken = data.csrfToken;
    }
    return _csrfToken;
}


async function testRequest(method) {
    const response = await fetch(`${API_HOST}/ping/`, {
        method: method,
        headers: (
            method === 'POST'
                ? {'X-CSRFToken': await getCsrfToken()}
                : {}
        ),
        credentials: 'include',
    });
    const data = await response.json();
    return data.result;
}

export default class myForm extends Component{
    constructor(props) {
        super(props);
        this.state = {value: 'author',
            testGet: 'KO',
            testPost: 'KO',
            fetchReturn: 'default'};
        this.handleChange = this.handleChange.bind(this);
        this.sendForm = this.sendForm.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    async sendForm(event) {
        /*
        const form = document.getElementById('setForm')
        const response = await fetch(`${API_HOST}/sort/`, {
            method: 'POST',
            headers: (
                    {'X-CSRFToken': await getCsrfToken()}
            ),
            body: new FormData(form),
            credentials: 'include',
        });
        const data = await response.json();
        this.setState({
            fetchReturn: data.result
        })
        console.log(data.result)
        event.preventDefault()
        return data.result;*/

        const response = await fetch(`${API_HOST}/sort/`, {
            method: 'POST',
            headers: (
                {'X-CSRFToken': await getCsrfToken()}
            ),
            credentials: 'include',
        });
        const data = await response.json();

        this.setState({
            fetchReturn: data.result
        })
        console.log(data.result)
        return data.result;
    }
    async componentDidMount() {
        this.setState({
            testGet: await testRequest('GET'),
            testPost: await testRequest('POST'),
        });
    }
    render(){
        return(
            <div>
                <form onSubmit={this.sendForm} id='sortForm'>
                    <label htmlFor="sort">Sort by:</label>
                    <select id="sort" name="sort" value={this.state.value} onChange={this.handleChange}>
                        <option value="author">Author</option>
                        <option value="title">Title</option>
                    </select>
                    <button type="submit" className="btn btn-warning">Sort</button>
                </form>
                <div>{this.state.fetchReturn}</div>
            </div>
        )
    }
}

