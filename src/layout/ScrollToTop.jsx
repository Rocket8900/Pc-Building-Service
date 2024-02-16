import React, { Component } from 'react';

export default class ScrollToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_visible: false,
      scrollProgress: 0
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const pixels = documentHeight - windowHeight;
    const progress = (100 * scrollTop) / pixels;
    this.setState({ scrollProgress: progress });
    this.toggleVisibility();
  }

  toggleVisibility() {
    if (window.pageYOffset > 300) {
      this.setState({
        is_visible: true
      });
    } else {
      this.setState({
        is_visible: false
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  render() {
    const { is_visible, scrollProgress } = this.state;
    const scrollbarHeight = `${scrollProgress}%`; // Set the scrollbar height based on scroll progress
    return (
      <div id='scroll-to-top' className='init'>
        {is_visible && (
          <div className='float-text' onClick={this.scrollToTop}>
            <span>
              <span>Scroll to top</span>
            </span>
            <div className='scrollbar-v' style={{ height: scrollbarHeight }} />
          </div>
        )}
      </div>
    );
  }
}
