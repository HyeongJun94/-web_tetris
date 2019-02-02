import React from 'react';
import { Grid, Comment, Form, Input } from 'semantic-ui-react';

// props => user={currentUser} room={room} key={room.id}

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: props.room.users,
            messages: [],
            newMessage: ''
        };
        props.user.subscribeToRoom({
            roomId: props.room.id,
            messageLimit: 100,
            hooks: {
                onUserJoined: (user) => {
                    this.setState({
                        users: props.room.users
                    });
                },
                onUserLeft: (user) => {
                    this.setState({
                        users: props.room.users
                    });
                },
                onNewMessage: (message) => {
                    const messages = this.state.messages;
                    let opponent;
                    if (message.attachment && message.attachment.link && message.attachment.link.startsWith('urn:player:')) {
                        opponent = message.attachment.link.substring(11);
                        if (opponent !== props.user.id) {
                            opponent = undefined;
                        }
                    }
                    messages.push({
                        id: message.id,
                        user: message.senderId,
                        message: message.text,
                        opponent: opponent
                    });
                    this.setState({
                        messages: messages
                    });
                }
            }
        })
    }

    _handleNewMessageChange(e){
        this.setState({
            newMessage: e.target.value
        });
    }

    _handleSubmit(){
        const {newMessage} = this.state;
        const {user, room} = this.props;
        user.sendMessage({
            text: newMessage,
            roomId: room.id
        });
        this.setState({
            newMessage: ''
        });
    }

    render(){
        const messages = this.state.messages
            .map((message) => {
                return (
                    <Comment key={message.id}>
                        <Comment.Content>
                            <Comment.Author>{message.user}</Comment.Author>
                            <Comment.Text>{message.message}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                );
            });
        
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <Comment.Group style={{height: '20em', overflow: 'auto'}}>
                            { messages }
                        </Comment.Group>
                        <div style={{ float:"left", clear: "both" }} />
                    </Grid.Column>
                    <Grid.Column width={4}>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Form onSubmit={this._handleSubmit.bind(this)}>
                            <Input action='Post'
                                   placeholder='New Message...'
                                   value={this.state.newMessage}
                                   fluid
                                   autoFocus
                                   onChange={this._handleNewMessageChange.bind(this)} />
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}

export default Chat;