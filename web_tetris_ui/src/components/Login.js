import React from 'react';
import {Segment, Button, Form} from 'semantic-ui-react';

class Login extends React.Component{
    state = {
        username: ''
    };

    handleUsernameChange(e){
        this.setState({
            username: e.target.value
        });
    }

    handleFormSubmit(){
        const {login} = this.props;
        if(this.state.username){
            login(this.state.username);
        }
    }

    render(){
        return (
            <Segment>
                <Form onSubmit={this.handleFormSubmit.bind(this)}>
                    <Form.Field>
                        <input 
                            placeholder = '아이디'
                            value={this.state.username}
                            autoFocus
                            onChange={this.handleUsernameChange.bind(this)}
                        />
                    </Form.Field>
                    <Button type='submit'>로그인</Button>
                </Form>
            </Segment>
        );
    }
}

export default Login;