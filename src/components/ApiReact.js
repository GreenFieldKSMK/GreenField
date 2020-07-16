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
      USDILS: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.componentDidMount();
    console.log('every thing is refreh');
  }
  componentDidMount() {
    axios
      .get('http://localhost:4000/api/change')
      .then((result) => {
        this.setState({
          USDYER: result.data.USDYER,
          USDYEN: result.data.USDJPY,
          USDRYB: result.data.USDRUB,
          USDGBP: result.data.USDGBP,
          USDILS: result.data.USDILS,
        });
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
          <p className='api'>USD To YER : {this.state.USDYER}</p>
          <br />
          <p className='api'>USD To YEN : {this.state.USDYEN}</p>
          <br />
          <p className='api'>USD To RYB : {this.state.USDRYB}</p>
          <br />
          <p className='api'>USD To GBP : {this.state.USDGBP}</p>
          <br />
          <p className='api'>USD To ILS : {this.state.USDILS}</p>
          <button className='btn2'>Refresh</button>
        </form>
      </div>
    );
  }
}

export default Change;
