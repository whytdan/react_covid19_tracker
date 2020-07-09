import React from 'react';
import {Cards, Chart, CountryPicker} from './components/'
import styles from './App.module.css'
import { Typography } from '@material-ui/core';
import { fetchData } from './api';

import coronaImage from './images/image.png'
import rotateImage from './images/rotation.png'
import Loader from './components/UI/Loader/Loader';


class App extends React.Component {

  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data:fetchedData })
  }

  handleCountryChange = async country => {

    const fetchedData = await fetchData(country);
    this.setState({ data:fetchedData, country: country })
    
  }

  render() {

    const { data, country } = this.state;

    if(!data.confirmed){
      return <Loader/>
    }

    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19"/>
        <div className={styles.rotateWrapper}>
          <Typography className={styles.infoText} color="textSecondary">Rotate your phone for a <br/> better chart readibility</Typography>
          <img className={styles.rotateImage} src={rotateImage} alt="rotatePhone"/>
        </div>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    )
  }
}

export default App;