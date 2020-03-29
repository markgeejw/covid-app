import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import loading_img from '../assets/loading_img.gif'

export default class Loading extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isloaded:false
    }
  }
  handleClick() {
    console.log('Click happened');
  }
  // add listener for window loading
  componentDidMount() {
    window.addEventListener('load', this.pageLoaded());
  }

  componentWillUnmount() {
    // event to listen to
    // function to listen to
    window.removeEventListener('load', this.pageLoaded())
  }

   pageLoaded(state) {
    this.setState({ isloaded: true });
   }
   // else page still loading

   getLoading(html) {
     if (this.state.isloaded){
       // chart render
       //html
       return  <p>page loaded</p>
     } else {
       return <img src={loading_img} style={{height: "60%", width: "60%"}} alt="loading..." />
     }
    }

    render() {

        return (
            <Container style={{ paddingTop: 80, paddingBottom: 40 }}>
                {this.getLoading(this.props.content)}
            </Container>
        )
    }
}
