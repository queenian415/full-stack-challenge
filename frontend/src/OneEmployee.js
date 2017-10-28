import React, { Component } from 'react';

class OneEmployee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employeeId: null,
            content: null            
        }
    }

    render() {
        return (
            <div>
            <h1>Employee</h1>
            <fieldset name="newPost">
                <label>
                    Title:
                    <input type="text" name="postTitle" value={this.props.postTitle} onChange={this.handleInputChange} />
                </label><br/>
                <label>
                    Content:
                    <textarea name="postContent" value={this.props.postContent} onChange={this.handleInputChange}/>
                </label><br/>
                <button type="button" onClick={this.handleSubmit}>Post</button>
            </fieldset>
            </div>
        );
    }
}

export default OneEmployee;
