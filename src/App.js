import axios from 'axios';
import React from "react";
import CustomForm from './customForm.js';


const API_HOST = 'http://localhost:8000';


class App extends React.Component{
    state = {
        details: [],
    }
    async componentDidMount() {
        let data;
        axios.get('http://localhost:8000')
            .then(res =>{
                data = res.data;
                this.setState({
                    details: data
                });
            })
            .catch(err => {})
    }


    render() {
        return (
            <div>
                <CustomForm />
                <h1>Data Fetching Example</h1>
                {this.state.details.map((output) => (
                    <div>
                        {output.title}
                    </div>
                ))}
            </div>
        );
    }
}

export default App;
