import React from 'react';
import styled from 'styled-components';

import Draggable from '../Draggable';
import Droppable from '../Droppable';

const Wrapper = styled.div`
    width: 100%;
    padding: 32px;
    display: flex;
    justify-content: center;
`;

const Item = styled.div`
    padding: 8px;
    color: #555;
    background-color: white;
    border-radius: 3px
`;

// this is an object
const drappableStyle = {
    backgroundColor: '#555',
    width: '250px',
    height: '400px',
    margin: '32px',
};

export default class DndTest extends React.Component {
    render() {
        return (
            <Wrapper>

                <Droppable id='dr1' style={drappableStyle}>
                    <Draggable id='item1' style={{ margin: '8px' }}><Item>Some Text</Item></Draggable>
                    <Draggable id='item2' style={{ margin: '8px' }}><Item>Some Other Text</Item></Draggable>
                </Droppable>

                <Droppable id='dr2' style={drappableStyle}>

                </Droppable>
            </Wrapper>
        )
    }
}