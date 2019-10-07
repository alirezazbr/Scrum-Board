import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, ListGroup, ListGroupItem } from 'reactstrap';
import Input from "reactstrap/es/Input";
import { InputChange } from '../utility/Utility';
import classNames from "classnames";
import Timer from '../timer/Timer';
import './ScrumBoard.css';
import axios from 'axios';




// import {default as Entrance} from './components/login/EntrancePermissonPage';
// import { Draggable, Droppable } from 'react-drag-and-drop';
// draggable importing
// import Draggable from 'react-draggable';

export default class ScrumBoard extends React.Component {

  state = {
    modal: false,
    status: {
      title: '',
      Description: '',
      bgColor: ''
    },
    listStory: [],
    listTodo: [],
    listInProgress: [],
    listTest: [],
    listDone: [],
    color: ''
  };


  toggle = () => this.setState(prevState => ({ modal: !prevState.modal }));

  // componentDidMount() {
  //   axios.get('http://localhost:5000/todos')
  //     .then(response => {
  //       this.setState({listTodo: response.data});
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }

  // listTodoFunc() {
  //   return this.state.listTodo.map(function(currentTodo, i) {
  //     return 
  //   })
  // }

  delStory = index => {
    this.setState(prevState => {
      let { listStory } = prevState;
      listStory.splice(index, 1);
      return {
        listStory
      };
    });
  };

  addToStroy = () => {
    this.setState(prevState => {
      let { listStory, status } = prevState;
      let json = JSON.stringify(status);
      listStory.push(json);

      const newTodo = {
        title: prevState.status.title,
        Description: prevState.status.Description,
        bgColor: prevState.status.bgColor,
      }

      

      axios.post('http://localhost:5000/todos/add', newTodo)
        .then(res => console.log(res.data));

      return { listStory, status: { ...status, title: '', Description: '', bgColor: '' }, modal: false };
    });
  };

  delTodo = index => {
    this.setState(prevState => {
      let { listTodo } = prevState;
      listTodo.splice(index, 1);
      return {
        listTodo
      };
    });
  };

  addToListTodo = item => {
    this.setState(prevState => {
      let { listTodo } = prevState;
      listTodo.push(item);
      return { listTodo };
    });
  };

  delInProgress = index => {
    this.setState(prevState => {
      let { listInProgress } = prevState;
      listInProgress.splice(index, 1);
      return {
        listInProgress
      };
    });
  };

  addToListInprogress = item => {
    this.setState(prevState => {
      let { listInProgress } = prevState;
      listInProgress.push(item);
      return { listInProgress };
    });
  };

  delTest = index => {
    this.setState(prevState => {
      let { listTest } = prevState;
      listTest.splice(index, 1);
      return {
        listTest
      };
    });
  };

  addToListTest = item => {
    this.setState(prevState => {
      let { listTest } = prevState;
      listTest.push(item);
      return { listTest };
    });
  };

  delDone = index => {
    this.setState(prevState => {
      let { listDone } = prevState;
      listDone.splice(index, 1);
      return {
        listDone
      };
    });
  };

  addToListDone = item => {
    this.setState(prevState => {
      let { listDone } = prevState;
      listDone.push(item);
      return { listDone };
    });
  };

  changeColor = (color) => () => {
    this.setState(prevState => {
      let { status } = prevState;
      return {
        status: {
          ...status,
          bgColor: color
        }
      }
    });
  };

  render() {
    const { modal, listStory, listTodo, listInProgress, listTest, listDone, color } = this.state;
    let { title, Description } = this.state.status;
    const taskUlClass = classNames('listgroup-fix', 'card',
      { 'background-red': color === '#BC4A4A' },
      { 'background-blue': color === '#4EB4E4' },
      { 'background-yellow': color === '#C9CF4E' },
      { 'background-green': color === '#61D672' });
    return (
      <div className="container-fluid">
        <div className='row'>
          <header className='col-md-12'>
            <div className='col-md-3'>
              <button className='col-md-6' onClick={this.toggle}>
                <img src={process.env.PUBLIC_URL + '/assets/img/plus.png'} alt='' />
                <div className='inner-text-of-button-header'>Task</div>
              </button>

              <Modal isOpen={modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>
                  <p className='modalheader-font-fix'>New Task</p>
                </ModalHeader>
                <ModalBody>
                  <Input placeholder='title' name='title' value={title} onChange={InputChange.bind(this)} />
                  <Input placeholder='Description' name='Description' value={Description} onChange={InputChange.bind(this)} />
                  <Timer />
                </ModalBody>
                <ModalFooter>
                  <div className='fix-box-color'>
                    <Button className='fix-box-item color-red' onClick={this.changeColor('#BC4A4A')} />
                    <Button className='fix-box-item color-blue' onClick={this.changeColor('#4EB4E4')} />
                    <Button className='fix-box-item color-yellow' onClick={this.changeColor('#C9CF4E')} />
                    <Button className='fix-box-item color-green' onClick={this.changeColor('#61D672')} />
                  </div>
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  <Button color="primary" onClick={this.addToStroy}>Save</Button>
                </ModalFooter>
              </Modal>
            </div>

            <div className='col-md-4 offset-md-1'>
              <button className='col-md-6'>
                <img src={process.env.PUBLIC_URL + '/assets/img/group.png'} alt='' />
                <div className='inner-text-of-button-header'>User</div>
              </button>
            </div>

            <div className='col-md-3 offset-md-1'>
              <input className='col-md-6' placeholder='Search your task' />
            </div>
          </header>
        </div>

        <div className='row'>
          <div className='col-md-2 border-right border-bottom fix'>
            Story
          </div>
          <div className='col-md-2 border-right border-bottom fix'>
            ToDo
          </div>
          <div className='col-md-4 border-right border-bottom fix'>
            In Progress
          </div>
          <div className='col-md-2 border-right border-bottom fix'>
            Test
          </div>
          <div className='col-md-2 border-bottom fix'>
            Done
          </div>
        </div>

        <div className='row full-height'>
          {/* Story List */}
          <div className='col-md-2 border-right'>
            <Col md={12} className='mt-4'>
              <ListGroup>
                {
                  listStory.length !== 0 ?
                    listStory.map((item, index) => {
                      return (
                        <ListGroupItem key={index} className={taskUlClass}>
                          <header className='col-md-12' style={{ backgroundColor: JSON.parse(item).bgColor }}>
                            <p>{JSON.parse(item).title}</p>
                            <button
                              onClick={this.delStory.bind(this, index)}
                              className='float-right li-button-fix'
                            >
                              <img src={process.env.PUBLIC_URL + '/assets/img/cancel.png'} alt='' />
                            </button>
                            <button
                              onClick={this.addToListTodo.bind(this, item)}
                              className='float-right li-button-fix'
                            >
                              <img src={process.env.PUBLIC_URL + '/assets/img/check.png'} alt='' />
                            </button>
                          </header>
                          <Col xs={12} className='card-body-fix'>
                            <p style={{ color: JSON.parse(item).bgColor }}>{JSON.parse(item).Description}</p>
                          </Col>
                        </ListGroupItem>
                      )
                    })
                    :
                    (
                      console.log('Empty Task')
                    )
                }
              </ListGroup>
            </Col>
          </div>

          <div className='col-md-2 border-right'>
            <Col md={12} className='mt-4'>

              <ListGroup>
                {
                  listTodo.length !== 0 ?
                    listTodo.map((item, index) => {
                      return (
                        <ListGroupItem key={index} className={taskUlClass}>
                          <header className='col-md-12' style={{ backgroundColor: JSON.parse(item).bgColor }}>
                            <p>{JSON.parse(item).title}</p>
                            <button
                              onClick={this.delTodo.bind(this, index)}
                              className='float-right li-button-fix'
                              color='danger'
                            >
                              <img src={process.env.PUBLIC_URL + '/assets/img/cancel.png'} alt='' />
                            </button>
                            <button
                              onClick={this.addToListInprogress.bind(this, item)}
                              className='float-right li-button-fix'
                              color='danger'
                            >
                              <img src={process.env.PUBLIC_URL + '/assets/img/check.png'} alt='' />
                            </button>
                          </header>
                          <Col xs={12} className='card-body-fix'>
                            <p style={{ color: JSON.parse(item).bgColor }}>{JSON.parse(item).Description}</p>
                          </Col>
                        </ListGroupItem>
                      )
                    })
                    :
                    (
                      console.log('Empty Task')
                    )
                }
              </ListGroup>

            </Col>
          </div>
          <div className='col-md-4 border-right'>
            <Col md={12} className='mt-4'>
              <ListGroup>
                {
                  listInProgress.length !== 0 ?
                    listInProgress.map((item, index) => {
                      return (
                        <ListGroupItem key={index} className={taskUlClass}>
                          <header className='col-md-12' style={{ backgroundColor: JSON.parse(item).bgColor }}>
                            <p>{JSON.parse(item).title}</p>
                            <button
                              onClick={this.delInProgress.bind(this, index)}
                              className='float-right li-button-fix'
                              color='danger'
                            >
                              <img src={process.env.PUBLIC_URL + '/assets/img/cancel.png'} alt='' />
                            </button>
                            <button
                              onClick={this.addToListTest.bind(this, item)}
                              className='float-right li-button-fix'
                              color='danger'
                            >
                              <img src={process.env.PUBLIC_URL + '/assets/img/check.png'} alt='' />
                            </button>
                          </header>
                          <Col xs={12} className='card-body-fix'>
                            <p style={{ color: JSON.parse(item).bgColor }}>{JSON.parse(item).Description}</p>
                          </Col>
                        </ListGroupItem>
                      )
                    })
                    :
                    (
                      console.log('Empty Task')
                    )
                }
              </ListGroup>
            </Col>
          </div>
          <div className='col-md-2 border-right'>
            <Col md={12} className='mt-4'>
              <ListGroup>
                {
                  listTest.length !== 0 ?
                    listTest.map((item, index) => {
                      return (
                        <ListGroupItem key={index} className={taskUlClass}>
                          <header className='col-md-12' style={{ backgroundColor: JSON.parse(item).bgColor }}>
                            <p>{JSON.parse(item).title}</p>
                            <button
                              onClick={this.delTest.bind(this, index)}
                              className='float-right li-button-fix'
                              color='danger'
                            >
                              <img src={process.env.PUBLIC_URL + '/assets/img/cancel.png'} alt='' />
                            </button>
                            <button
                              onClick={this.addToListDone.bind(this, item)}
                              className='float-right li-button-fix'
                              color='danger'
                            >
                              <img src={process.env.PUBLIC_URL + '/assets/img/check.png'} alt='' />
                            </button>
                          </header>
                          <Col xs={12} className='card-body-fix'>
                            <p style={{ color: JSON.parse(item).bgColor }}>{JSON.parse(item).Description}</p>
                          </Col>
                        </ListGroupItem>
                      )
                    })
                    :
                    (
                      console.log('Empty Task')
                    )
                }
              </ListGroup>
            </Col>
          </div>
          <div className='col-md-2 fix-ListDone'>
            <Col md={12} className='mt-4'>
              <ListGroup>
                {
                  listDone.length !== 0 ?
                    listDone.map((item, index) => {
                      return (
                        <ListGroupItem key={index} className={taskUlClass}>
                          <header className='col-md-12' style={{ backgroundColor: JSON.parse(item).bgColor }}>
                            <p>{JSON.parse(item).title}</p>
                            <button
                              onClick={this.delDone.bind(this, index)}
                              className='float-right li-button-fix'
                              color='danger'
                            >
                              <img src={process.env.PUBLIC_URL + '/assets/img/cancel.png'} alt='' />
                            </button>
                            <button
                              onClick={this.addToListDone.bind(this, item)}
                              className='float-right li-button-fix'
                              color='danger'
                            >
                              <img src={process.env.PUBLIC_URL + '/assets/img/check.png'} alt='' />
                            </button>
                          </header>
                          <Col xs={12} className='card-body-fix'>
                            <p style={{ color: JSON.parse(item).bgColor }}>{JSON.parse(item).Description}</p>
                          </Col>
                        </ListGroupItem>
                      )
                    })
                    :
                    (
                      console.log('Empty Task')
                    )
                }
              </ListGroup>
            </Col>
          </div>
        </div>
      </div>
    );
  }
}