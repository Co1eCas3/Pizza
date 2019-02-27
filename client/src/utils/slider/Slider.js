import React, { Component } from 'react';

// import './Slider.css';

class Slider extends Component {
  slides = this.props.children;

  state= {
    curSlide: this.slides[0],
    transing: false
  }

  // sliderStyle = {...this.props.style};

  prevSlide = (cur) => {
    let cur_i = this.slides.indexOf(cur)

    if(cur_i === 0) {
      return this.slides[this.slides.length - 1];
    } else {
      return this.slides[cur_i - 1];
    }
  };

  nextSlide = (cur) => {
    let cur_i = this.slides.indexOf(cur)

    if(cur_i === this.slides.length - 1) {
      return this.slides[0];
    } else {
      return this.slides[cur_i + 1];
    }
  }

  transition = () => {
    console.log('working');
    this.setState({transing: true})
  }

  reset = () => {
    this.setState((prev, props) => {
      return {
        curSlide: this.nextSlide(prev.curSlide),
        transing: false
      }
    })
  }

  render() {
    // this.sliderStyle.opacity = this.state.transing ? 0 : 1;

    // setTimeout(this.transition, 5000);

    const switchSlide = () => {
      this.reset();
    } 

    return (
      <>
        <div className='.slider-frame'
          style={{...this.props.style, opacity: this.state.transing ? '0' : '1'}}
          onAnimationEnd={switchSlide}>
          {this.state.curSlide}
        </div>
      </>
    )
  };
}

export default Slider;