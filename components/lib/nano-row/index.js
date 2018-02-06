import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Row extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    className: PropTypes.string,
    layouts: PropTypes.string,
    maxColumns: PropTypes.number,
    marginBottom: PropTypes.string,
  };

  static defaultProps = {
    children: [],
    className: 'form-group clearfix nano-row',
    layouts: '',
    marginBottom: '',
    maxColumns: 12,
  };

  render() {
    const { className, marginBottom, ...others } = this.props;
    return (<div className={classNames('row', className, marginBottom)} {...others}>{this.props.children}</div>);
  }
}

export default Row;
