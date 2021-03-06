import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { has, map } from 'lodash';

const panelPresets = {
  existing: {
    title: 'Already mentioned',
    dataSource: 'existing',
    filter: network => network,
  },
  external: {
    title: 'People from your previous visit',
    dataSource: 'previousInterview',
    filter: network => network,
  },
};

const rehydratePreset = (panelConfig) => {
  if (has(panelPresets, panelConfig)) {
    return panelPresets[panelConfig];
  }
  return panelConfig;
};

const propPanelConfigs = (_, props) => props.stage.panels;

const getPanelConfigs = createSelector(
  propPanelConfigs,
  panelConfigs => map(panelConfigs, rehydratePreset),
);

const configurePanels = (WrappedComponent) => {
  function mapStateToProps(state, props) {
    return {
      panels: getPanelConfigs(state, props),
    };
  }

  return connect(mapStateToProps)(WrappedComponent);
};

export default configurePanels;
