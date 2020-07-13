import React from 'react';
import axios from 'axios';
import './CSS/api.css';

class Change extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api:
        'http://api.currencylayer.com/live?access_key=056f69d5c345ebe18cb3f2dc73aeda0b',
      USDYER: '',
      USDYEN: '',
      USDRYB: '',
      USDGBP: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.componentDidMount();
    console.log('every thing is refreh');
  }
  componentDidMount() {
    axios
      .get(this.state.api)
      .then((result) => {
        this.setState({
          USDYER: result.data.quotes.USDYER,
          USDYEN: result.data.quotes.USDJPY,
          USDRYB: result.data.quotes.USDRUB,
          USDGBP: result.data.quotes.USDGBP,
        });
        console.log('Last updata');
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  render() {
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h3 className='currency'>Currency Change</h3>
          <p>USD To YER : {this.state.USDYER}</p>
          <br />
          <p>USD To YEN : {this.state.USDYEN}</p>
          <br />
          <p>USD To RYB : {this.state.USDRYB}</p>
          <br />
          <p>USD To GBP : {this.state.USDGBP}</p>
          <br />
        </form>
      </div>
    );
  }
}

export default Change;
