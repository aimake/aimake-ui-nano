import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Title extends Component {
  static propTypes = {
    text: PropTypes.string,
    backgroundColor: PropTypes.string,
    marginBottom: PropTypes.string,
    size: PropTypes.string,
    fontSize: PropTypes.string,
    color: PropTypes.string,
  };

  static defaultProps = {
    text: '',
    backgroundColor: '',
    marginBottom: '',
    size: '',
    fontSize: '',
    color: '',
  };

  render() {
    const {
      text,
      backgroundColor,
      marginBottom,
      size,
      fontSize,
    } = this.props;
    let { color } = this.props;
    if (color && color.indexOf('#') === -1) {
      color = `#${color}`;
    }

    const titleStyle = {
      fontSize: `${fontSize}px`,
      color,
      backgroundColor,
    };
    switch (size) {
      case 'h1':
        return (
          <h1 className={classNames(marginBottom)} style={titleStyle}>
            {text}
          </h1>
        );
      case 'h2':
        return (
          <h2 className={classNames(marginBottom)} style={titleStyle}>
            {text}
          </h2>
        );
      case 'h3':
        return (
          <h3 className={classNames(marginBottom)} style={titleStyle}>
            {text}
          </h3>
        );
      case 'h4':
        return (
          <h4 className={classNames(marginBottom)} style={titleStyle}>
            {text}
          </h4>
        );
      case 'h5':
        return (
          <h5 className={classNames(marginBottom)} style={titleStyle}>
            {text}
          </h5>
        );
      default:
        return false;
    }
  }
}

export default Title;
