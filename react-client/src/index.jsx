import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (
      <div>
        <h1>xkcd Favorites</h1>
        <form id="strip-to-write" action="/" method="post">
          <input type="text" id="strip-to-write-input" name="strip-to-write"></input>
          <button type="submit">post</button>
        </form>
        <form id="strip-request" action="/" method="get">
          <input type="text" id="request-strip-input" name="requested-strip"></input>
          <button type="submit">get</button>
        </form>
        <List items={this.state.items}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));