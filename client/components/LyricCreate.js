import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class LyricCreate extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }
    onSubmit(event){
        event.preventDefault();
        this.props.mutate({
            variables: {
                content: this.state.content, 
                songId: this.props.songId
            }
        }).then(() => this.setState({content: ''}));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Add Lyric</label>
                    <input type="text" value={this.state.content} 
                        onChange={event => this.setState({content: event.target.value})}/>
                </form>
            </div>
        );
    }
}
const mutation = gql`
mutation AddLyric( $content: String, $songId:ID) {
    addLyricToSong(content: $content, songId: $songId){
      id
      lyrics{
          id
        content
      }
    }
  }`;
export default graphql(mutation)(LyricCreate);