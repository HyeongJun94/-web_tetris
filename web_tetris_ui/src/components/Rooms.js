import React from 'react';
import { Grid, List, Icon } from 'semantic-ui-react';
import { join } from 'path';

class Rooms extends React.Component{
    

    constructor(props){
        super(props)

        this.handleCreateRooms = this.handleCreateRooms.bind(this)
    }

    handleCreateRooms(){
        console.log('handle create room')
    }

    render(){

        let {joinable} = this.props
        let joinableRooms
     
        if(joinable.length > 0 ){
            joinableRooms = joinable.map((room) => {
                return(
                    <List.Item key={room.id}>
                        <Icon name=""/>
                        <List.Content>
                            {room.name}
                        </List.Content>
                    </List.Item>
                );
            })
        }

        return(
            <div>
                <button onClick={this.handleCreateRooms}>Create Room</button>
                <List divided relaxed>
                    { joinableRooms }
                </List>
            </div>
   
        )
    }

}

export default Rooms;