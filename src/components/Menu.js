/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { scrollable } from '../behaviors';
import { MenuItem } from './Elements';

function MenuInternal(props) {
  return (
    <div>
      <div className="cross-icon">
        <button onClick={props.toggleMenu} className="ui large button">
          <i className="download icon"></i>
          Cross
        </button>
      </div>
      <header>
        <h1 className="bm-menu-title">Stages</h1>
      </header>
      {props.searchField}
      <nav className="bm-item-list">
        {props.items}
      </nav>
    </div>
  );
}
const ScrollableMenu = scrollable(MenuInternal);

/**
  * Renders a menu, updating styles on DOM elements outside of this.
  */
class MenuFactory extends Component {
  componentDidMount() {
    window.onkeydown = this.listenForClose;
  }

  componentWillUnmount() {
    window.onkeydown = null;
  }

  listenForClose = (e) => {
    e = e || window.event;

    if (this.props.isOpen && (e.key === 'Escape' || e.keyCode === 27)) {
      this.props.toggleMenu();
    }
  }

  menuItemClick = (itemClick) => {
    itemClick();
    this.props.toggleMenu();
  }

  render() {
    let items = this.props.items.map((item) =>
      <MenuItem
        key={item.id}
        to={item.to}
        onClick={() => this.menuItemClick(item.onClick)}
        title={item.title}
        isActive={item.isActive}
        imageType={item.imageType}
      />
    );

    return (
      <div>
        <div className="bm-overlay" onClick={this.props.toggleMenu} />
        <div className={this.props.isOpen ? 'bm-menu-wrap isOpen' : 'bm-menu-wrap'}>
          <div className="bm-menu">
            <ScrollableMenu toggleMenu={this.props.toggleMenu} searchField={this.props.searchField} items={items} />
          </div>
        </div>
        {!this.props.isOpen && <div className="burger-icon">
          <button onClick={this.props.toggleMenu} className="ui large button">
            <i className="download icon"></i>
            Burger
          </button>
        </div>}
      </div>
    );
  } // end render
} //end class

MenuFactory.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  items: PropTypes.array,
  toggleMenu: PropTypes.func.isRequired,
  searchField: PropTypes.object
};

MenuFactory.defaultProps = {
  items: [],
  searchField: null,
}

export default MenuFactory;
