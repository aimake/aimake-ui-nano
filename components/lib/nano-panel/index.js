import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Panel extends Component {
  static propTypes = {
    text: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    marginBottom: PropTypes.string,
    border: PropTypes.string,
    backgroundColor: PropTypes.string,
  };

  static defaultProps = {
    text: '',
    children: [],
    marginBottom: '',
    border: '',
    backgroundColor: '',
  };

  render() {
    const {
      text,
      children,
      marginBottom,
      border,
    } = this.props;
    let { backgroundColor } = this.props;
    if (backgroundColor && backgroundColor.indexOf('#') === -1) {
      backgroundColor = `#${backgroundColor}`;
    }
    const panelStyle = {
      backgroundColor,
    };
    if (!border) {
      panelStyle.border = 'none';
    }

    return (
      <div className={classNames('panel', marginBottom)} style={panelStyle}>
        {text !== '' && (
          <div className="panel-heading" style={{ borderBottom: `1px solid ${backgroundColor}` }}>
            <div className="panel-title">{text}</div>
          </div>
        )}
        <div className="panel-body">
          {children}
        </div>
      </div>
    );
  }
}

export default Panel;
