import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class CutLine extends Component {
  static propTypes = {
    marginBottom: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    background: PropTypes.string,
    style: PropTypes.any,
    type: PropTypes.any,
  };

  static defaultProps = {
    marginBottom: '',
    width: '',
    height: '',
    background: '',
    style: '',
    type: '',
  };

  render() {
    const {
      marginBottom,
      type,
      background,
      width,
      style,
      height,
    } = this.props;
    let selectWidth = width;
    if (selectWidth && selectWidth.slice(-1) !== '%') {
      selectWidth += 'px';
    }
    const CutLineStyle = {
      width: selectWidth,
      borderBottom: `${style} ${height}px ${background}`,
    };
    return (
      <div className={classNames(marginBottom, type)} style={CutLineStyle} />
    );
  }
}

export default CutLine;
