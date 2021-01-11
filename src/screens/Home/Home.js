import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProfileImage, Divider, UserDetails, Welcome } from '../../components';
import MovieApp from '../../components2/App'


const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=d4f587dc";

export class Home extends Component {
  
  render() {
    return (
      <div className="row">
        <ProfileImage />
        <Divider />
        <div className="rightPanel">
          <Welcome user={this.props.profile} />
          <UserDetails user={this.props.profile} />
          <MovieApp />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(Home);
