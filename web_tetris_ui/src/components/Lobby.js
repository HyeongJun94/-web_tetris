import React from 'react';
import { TokenProvider, ChatManager } from '@pusher/chatkit';
import {BrowserRouter} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import { Segment, Grid } from 'semantic-ui-react';

import Chat from './Chat'
import UserInfo from './UserInfo';
import Rooms from './Rooms';

//[MUST]chatmanager가 만들어지는 사이클 공부하기
class Lobby extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            currentUser : '',
            joined: [],
            joinable: []
        };

        this._enterRoom = this._enterRoom.bind(this)
        this._leaveRoom = this._leaveRoom.bind(this)

        this.chatManager = new ChatManager({
            instanceLocator: 'v1:us1:a793e5d7-f35e-41c4-9373-544efaf68cf2',
            tokenProvider: new TokenProvider({
                url: "http://localhost:4000/auth",
            }),
            userId: props.username
        });

        this.chatManager.connect().then(currentUser => {
            this.setState({
                currentUser: currentUser
            });

            //Lobby를 찾고 들어간다.
            currentUser.getJoinableRooms().then((rooms) =>{
                let lobby = rooms.find((room) => room.name === 'Lobby');
                if(lobby){
                    currentUser.joinRoom({roomId: lobby.id});
                } else {
                    lobby = currentUser.rooms.find((room) => room.name === 'Lobby');
                }
                if(lobby){
                    this.setState({
                        lobbyId: lobby.id,
                        activeRoom: lobby.id
                    });
                }

                //왜 하는건지 모르겠음
                // setInterval(this._pollRooms.bind(this),5000);
                this._pollRooms();

            }).catch((e) => {
                console.log('[Lobby.js] getJoinableRooms error')
                console.log(e);
            });
        })
    }

    _pollRooms() {
        const { currentUser } = this.state;

        currentUser.getJoinableRooms()
            .then((rooms) => {
                this.setState({
                    joined: currentUser.rooms,
                    joinable: rooms
                })
            });
    }

    _enterRoom(activeRoom){
        const {currentUser} = this.state

        currentUser.joinRoom({roomId: activeRoom})
            .then(room => {
                this.setState({
                    activeRoom : activeRoom
                })
                console.log(`Joined room with ID: ${room.id}`)
            })
            .catch(err =>{
                console.log(`Error joining room ${activeRoom}: ${err}`)
            })
    }

    _leaveRoom(roomId){
        const {currentUser} = this.state
        this.setState({
            activeRoom : this.state.lobbyId
        })

        if(this.getPlayersInRoom(roomId) === 1){
            currentUser.deleteRoom({roomId:roomId})
                    .then(() => {
                        console.log(`Deleted room with ID: ${roomId}`)
                    })
                    .catch(err => {
                        console.log(`Error deleted room ${roomId}: ${err}`)
                    })
        }
        else{
            currentUser.leaveRoom({roomId:roomId})
                    .then(room =>{
                    // console.log(`People in rooms : ${room.users.length}`)
                        console.log(`Left room with ID: ${room.id}`)
                    })
                    .catch(err =>{
                        console.log(`Error leaving room ${roomId}: ${err}`)
                    })   
            }
    }

    getPlayersInRoom(roomId){
        const {currentUser} = this.state
        const room = currentUser.rooms.find(room => room.id === roomId)
        
        return room.users.length
    }
    

    // [MUST] userInfo가 렌더링 할떄마다 호출되어야 하나??
    render(){
        const {currentUser} = this.state;
        let chat;
        let userInfo;
        let rooms;

        console.log(`Lobby Render CurrentUser : ${currentUser.name}`)
        
        if(currentUser !== ''){
            const room = currentUser.rooms.find((room) => room.id === this.state.activeRoom);
            
            // console.log(`activeRoom : ${this.state.activeRoom}`)

            userInfo = <UserInfo username={this.props.username}/>
            if(room){
                // console.log(`room name : ${room.name}`)
                chat = <Chat user={currentUser} room={room} key={room.id}/>
                rooms = <Rooms user={currentUser}
                               joinable={this.state.joinable}
                               _enterRoom={this._enterRoom}
                               _leaveRoom={this._leaveRoom}
                               activeRoom={this.state.activeRoom}
                               lobbyId={this.state.lobbyId}/>
            }

        }

        return(
            <BrowserRouter>
                <Segment>
                    <h1>Lobby</h1>
                    <Grid>
                        <Grid.Column width={10}>
                            { rooms }
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Grid divided='vertically'>
                                <Grid.Row>
                                    <Grid.Column>{ userInfo }</Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>{ chat }</Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </BrowserRouter>
        )
    }
}

export default Lobby;