import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Grid extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    className: PropTypes.string,
    rowNumber: PropTypes.number,
    colNumber: PropTypes.number,
    marginBottom: PropTypes.string,
  };

  static defaultProps = {
    children: [],
    className: '',
    rowNumber: 0,
    colNumber: 0,
    marginBottom: '',
  };

  render() {
    const {
      className,
      marginBottom,
      ...others
    } = this.props;
    return (
      <div className={classNames(className, marginBottom, 'form-horizontal')} {...others}>
        {this.props.children}
      </div>
    );
  }
}

export default Grid;
