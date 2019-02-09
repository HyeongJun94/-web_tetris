import React from 'react';
import { Grid, List, Icon, Button } from 'semantic-ui-react';
import { Route, Redirect} from 'react-router-dom';
import Game from './Game'

// rooms = <Rooms user={currentUser}joinable={this.state.joinable} />

class Rooms extends React.Component{
    constructor(props){
        super(props)

        this.state = { 
            redirect : false,
            path : ""
        }
        this.handleCreateRooms = this.handleCreateRooms.bind(this)
        this.handleEnterRooms = this.handleEnterRooms.bind(this)
        this.handleLeaveRoom = this.handleLeaveRoom.bind(this)
    }

    handleCreateRooms(){
        // user의 joined에 들어간 방을 바꾸고 url도 바꿈
        console.log('handle create room')
        const {user} = this.props;
        user.createRoom({
            name: `${user.name}'s 방`
        }).then(room => {
            console.log(`Created room called ${room.name}`)
            this.handleEnterRooms(room.id)
          })
        .catch(err => {
           console.log(`Error creating room ${err}`)
        })
    }

    handleEnterRooms(roomId){
        this.setState({
            path : `/rooms/${roomId}`,
            activeRoom : roomId
        })
        this.props._enterRoom(roomId)
    }

    handleLeaveRoom(){
        const {activeRoom} = this.state

        this.props._leaveRoom(activeRoom)
    }

    render(){
        const {lobbyId, activeRoom} = this.props
        let {path} = this.state
        let {joinable} = this.props
        let joinableRooms
     
        if(joinable.length > 0 ){
            joinableRooms = joinable.map((room) => {
                return(
                    <List.Item key={room.id}>
                        <Icon name=""/>
                        <List.Content>
                            <Grid>
                                <Grid.Column width={5}>
                                    {room.name}
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Button onClick={()=>this.handleEnterRooms(room.id)}>입장</Button>
                                </Grid.Column>
                            </Grid>
                        </List.Content>
                    </List.Item>
                );
            })
        }
        
        if(lobbyId !== activeRoom){
            return(
                <Grid divided='vertically'>
                    <Grid.Row>
                        <Grid.Column>
                            <Button onClick={this.handleLeaveRoom}> 나가기</Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Redirect to={path}/>
                            <Route path={path} component={Game}/>
                        </Grid.Column> 
                    </Grid.Row>
                </Grid>
            )
        }

        return(
            <div>
                <Button onClick={this.handleCreateRooms}>방 만들기</Button>
                <List divided relaxed>
                    { joinableRooms }
                </List>
            </div>
        )
    }

}

export default Rooms;