import React from 'react';
import { Grid } from "semantic-ui-react";

class UserInfo extends React.Component{

    render(){
        let {username} = this.props;

        return(
            <Grid>
                <Grid.Row>
                    <h1>정보</h1>
                </Grid.Row>
                <Grid.Row>
                    이름 : {username}
                </Grid.Row>
                <Grid.Row>
                    승 : 0
                </Grid.Row>
                <Grid.Row>
                    패 : 0
                </Grid.Row>
            </Grid>
        )
    }
}

export default UserInfo;