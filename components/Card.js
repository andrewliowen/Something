import React from 'react';
import { StyleSheet, Text, View, Image, Button, ActivityIndicator } from 'react-native';
import StarRating from 'react-native-star-rating'
import Icon from 'react-native-vector-icons'
import queryString from 'query-string';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      imageUrl:'',
    };
  }

  componentWillMount() {
    this.handlePress();
  }

  handlePress = () => {
    this.setState({ loading: true});
    fetch('http://thecatapi.com/api/images/get?format=src&results_per_page=10')
      .then(response => {
        console.log(response);
        this.setState({ imageUrl: response.url, loading: false});
      });
    };

    handleLike = () => {
      console.log('I like' + this.state.imageUrl);
    }

    handleEmail = () => {
      this.setState({ emailing: true});

      const apiKey = 'key-ae1f6f860d25b28a2de63f76ad55758e'

      const body = {
        from: 'Something <postmaster@sambalana.com>',
        to: ['Andrew <andrewowenliwang@gmail.com>'],
        subject: 'MOM: GET THE CAMERA',
        html: 'I found something really cool: <img src=$(this.state.imageUrl) />'
      };

      const options = {
        method: 'POST',
        headers: {
          'content-type': 'appliction/x-www-form-urlencoded',
          'Authorization': 'api:$(apikey)',
        },
        body: queryString.stringify(body),
      };

      fetch('https://api.mailgun.net/v3/sambalana.com/messages', options)
        .then((response)) => {
          return reponse.json();
        })
        .then((json) => {
          console.log(json);
          console.log(options);
          this.setState({ emailing: false});
        });
    }


  render() {
    const title = this.props.title;
    const { loading } = this.state;
    return (
      <View>
        <Text>{title}</Text>
        {loading === true ? (
          <ActivityIndicator />
        ) : (
          <Image
            source = {{ uri: this.state.imageUrl}}
            style={{ width: 300, height: 300}}
            />
        )}
        <Buttons
          fetchImage={this.handlePress}
        />
      </View>
    )
  }
}

export default Card;
