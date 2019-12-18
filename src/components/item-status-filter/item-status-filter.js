import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component{

  buttons=[
  { name:'all' ,label:'All'},
  { name:'active',label:'Active'},
  { name:'done',label:'Done'}

]

  changeButton = (e) =>{
    const buttonStatus=e.target.value;
    this.setState({
      buttonStatus
    })
    this.props.updateButton(buttonStatus)
  }

  render() {
      
      return (
        <div className="btn-group">
          <button type="button"
                  className="btn btn-info"
                  value="all"
                  onClick={this.changeButton}>All</button>
          <button type="button"
                  className="btn btn-outline-secondary"
                  value="active"
                  onClick={this.changeButton}>
                    Active</button>
          <button type="button"
                  className="btn btn-outline-secondary"
                  value="done"
                  onClick={this.changeButton}>Done</button>
        </div>
      );
    };

  }




