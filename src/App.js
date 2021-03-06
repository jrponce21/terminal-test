import React, { Component, Fragment } from "react";
import previousIcon from "./assets/icons/left-icon.png";
import nextIcon from "./assets/icons/right_icon.png";
import thumb1 from "./assets/images/thumb/tea-light-thumb.jpeg";
import thumb2 from "./assets/images/thumb/white-light-thumb.jpeg";
import thumb3 from "./assets/images/thumb/pink-light-thumb.jpeg";
import thumb4 from "./assets/images/thumb/tea-light-thumb.jpeg";
import image1 from "./assets/images/tea-light.jpeg";
import image2 from "./assets/images/white-light.jpeg";
import image3 from "./assets/images/pink-light.jpeg";
import image4 from "./assets/images/tea-light.jpeg";

import "./App.css";
import Viewer from "./components/Viewer";
import Thumbs from "./components/Thumbs";

const catalogs = [
  {
    thumb: thumb1,
    image: image1,
  },
  {
    thumb: thumb2,
    image: image2,
  },
  {
    thumb: thumb3,
    image: image3,
  },
  {
    thumb: thumb4,
    image: image4,
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Catalog Viewer",
      catalogs: [...catalogs],
      currentIndex: 0,
      catalogSelected: catalogs[0],
      slideActive: false,
      slideTimer: null,
      slideDuration: 3000,
    };
    this.selectedCatalog = this.selectedCatalog.bind(this);
    this.previousClick = this.previousClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.slideChange = this.slideChange.bind(this);
    this.resetSlideTimer = this.resetSlideTimer.bind(this);
    this.onSlideChange = this.onSlideChange.bind(this);
  }

  selectedCatalog(index) {
    this.setState({
      currentIndex: index,
      catalogSelected: catalogs[index],
    });
  }

  previousClick() {
    const currentIndex = this.state.currentIndex;
    const catalogIndex = !currentIndex
      ? this.state.catalogs.length
      : currentIndex;
    const posIndex = (catalogIndex - 1) % this.state.catalogs.length;
    this.setState({
      currentIndex: posIndex,
      catalogSelected: catalogs[posIndex],
    });
    this.resetSlideTimer();
  }

  nextClick() {
    const currentIndex = this.state.currentIndex;
    const posIndex = (currentIndex + 1) % this.state.catalogs.length;
    this.setState({
      currentIndex: posIndex,
      catalogSelected: catalogs[posIndex],
    });
    this.resetSlideTimer();
  }

  slideChange() {
    const isSlideActive = this.state.slideActive;
    if (!isSlideActive)
      this.setState({
        slideActive: true,
        slideTimer: setInterval(
          () => this.onSlideChange(),
          this.state.slideDuration
        ),
      });
    else {
      clearInterval(this.state.slideTimer);
      this.setState({
        slideActive: false,
        slideTimer: null,
      });
    }
  }

  resetSlideTimer() {
    if (this.state.slideActive) {
      clearInterval(this.state.slideTimer);
      this.setState({
        slideTimer: setInterval(
          () => this.onSlideChange(),
          this.state.slideDuration
        ),
      });
    }
  }

  onSlideChange() {
    const currentIndex = this.state.currentIndex;
    const posIndex = (currentIndex + 1) % this.state.catalogs.length;
    this.setState({
      currentIndex: posIndex,
      catalogSelected: catalogs[posIndex],
    });
  }

  render() {
    return (
      <Fragment>
        <div className="title" data-testid="app-title">
          {" "}
          {this.state.title}{" "}
        </div>
        <div className="catalog-outer">
          <div className="catalog-view">
            <div className="text-center">
              <div className="view-outter text-center">
                <Viewer catalog={this.state.catalogSelected.image} />
              </div>
            </div>
          </div>
          <div className="catalog-items">
            <div
              className="previous"
              onClick={this.previousClick}
              data-testid="prev-icon"
            >
              <img src={previousIcon} />
            </div>
            <div
              className="next"
              onClick={this.nextClick}
              data-testid="next-icon"
            >
              <img src={nextIcon} />
            </div>
            <Thumbs
              items={this.state.catalogs}
              currentIndex={this.state.currentIndex}
              selectedCatalog={this.selectedCatalog}
            />
          </div>

          <div className="slide-input">
            <input
              type="checkbox"
              checked={this.state.slideActive}
              onChange={this.slideChange}
              className="test"
              data-testid="slide"
            />{" "}
            Slide
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
