import React, { Component } from 'react';
import './Main.css';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import Home from './components/mains/home/Home';
import Coupons from './components/mains/coupons/Coupons';
import Order from './components/mains/order/Order';
import Contact from './components/mains/contact/Contact';
import Details from './components/mains/account_details/Details';

const portrait = window.matchMedia(
  'screen and (max-width: 420px) and (orientation: portrait)'
);
const landscape = window.matchMedia(
  'screen and (max-height: 420px) and (orientation: landscape)'
);

function getView() {
  if (portrait.matches) return 'portrait';
  if (landscape.matches) return 'landscape';

  return 'beyond';
}

class App extends Component {
  state = {
    view: getView(),
    currentPage: 'home'
  }

  backgroundStyles = {
    // backgroundImage: `url(${bgSmall})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }

  viewChangeHandler = () => this.setState({view: getView()});

  handleNavigate = (section) => {
    this.setState({currentPage: section})
  }

  displaySection = (section) => {
    switch(section) {
      case 'home':
        return <Home 
                  view={this.state.view}/>;
      case 'coupons':
        return <Coupons />;
      case 'order':
        return <Order />;
      case 'contact':
        return <Contact />;
      case 'details':
        return <Details />;
      default:
        break;
    }
  }

  componentDidMount() {
    portrait.addListener(this.viewChangeHandler);
  }

  render() {
    return (
      <div className="App" style = {this.backgroundStyles}>
        <Header />
        {this.displaySection(this.state.currentPage)}
        <Nav 
          cur={this.state.currentPage}
          navHandler={this.handleNavigate} />
      </div>
    );
  }
}

export default App;
