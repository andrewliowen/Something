import React from 'react';
import { StyleSheet, Text, View, Image, Button, ActivityIndicator } from 'react-native';
import StarRating from 'react-native-star-rating'
import Icon from 'react-native-vector-icons'

class starSystem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      startCount: rating
    });
  }
  render() {
    return(
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        starColor={'black'}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        />
    );
  }
}
