import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { colorDictionary } from 'network-canvas-ui';
import { makeDisplayEdgesForPrompt } from '../../selectors/sociogram';

const color = colorDictionary['edge-base'];

export class EdgeLayout extends PureComponent {
  static propTypes = {
    displayEdges: PropTypes.array,
  };

  static defaultProps = {
    displayEdges: [],
  };

  renderEdge = ({ key, from, to }) => {
    if (!from || !to) { return null; }

    return (
      <line
        key={key}
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
      />
    );
  }

  render() {
    const { displayEdges } = this.props;

    return (
      <div className="edge-layout">
        <svg viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          { displayEdges.map(this.renderEdge) }
        </svg>
      </div>
    );
  }
}

function makeMapStateToProps() {
  const displayEdgesForPrompt = makeDisplayEdgesForPrompt();

  return function mapStateToProps(state, props) {
    return {
      displayEdges: displayEdgesForPrompt(state, props),
    };
  };
}

export default connect(makeMapStateToProps)(EdgeLayout);
