import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Icon extends Component {
  static propTypes = {
    className: PropTypes.string, // 未对fontSize做检查 因为一会变number一会变string的
    fontSize: PropTypes.number,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  static defaultProps = {
    className: '',
    fontSize: 16,
    children: [],
  };

  render() {
    const {
      children,
      className,
      fontSize,
    } = this.props;

    const fontSizeStyle = {};
    fontSizeStyle.fontSize = +fontSize;

    return (
      <i className={classNames(className)} style={fontSizeStyle}>
        {children}
      </i>
    );
  }
}

export default Icon;
