import React from 'react';
import propTypes from 'prop-types';

export default class Draggable extends React.Component {

    drag = (e) => {
        e.dataTransfer.setData('transfer', e.target.id);
    }

    noAllowDrop = (e)  => {
        e.stopPropagation();
    }

    render() {
        return (
            <div id={this.props.id} draggable='true' onDragStart={this.drag} onDragOver={this.noAllowDrop} style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}

Draggable.propTypes = {
    id: propTypes.string,
    style: propTypes.object,
    children: propTypes.node,
}