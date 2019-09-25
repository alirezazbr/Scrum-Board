import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, ListGroup, ListGroupItem } from 'reactstrap';
import Input from "reactstrap/es/Input";
import { InputChange } from "./Utility";
import DatePicker from "react-datepicker";
import classNames from "classnames";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

class App extends React.Component {

  state = {
    modal: false,
    status: {
      title: '',
      Description: ''
    },
    add: '',
    listStory: [],
    listTodo: [],
    listInProgress: [],
    listTest: [],
    listDone: [],
    startDate: new Date(),
    bgColor: ''
  };

  changeInput = e => {
    const { status } = { ...this.state };
    const currentState = status;
    const { name, value } = e.target;
    currentState[name] = value;

    this.setState({ status: currentState });
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  toggle = () => this.setState(prevState => ({ modal: !prevState.modal }));

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
      // let alaki = ({title: prevState.status.title === ''});
      // let alaki2 = ({title: prevState.status.title === ''});
      return { listStory, status: {...status,title: '', Description: ''}, modal: false };
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
    this.setState({ color });
  };

  render() {
    const { modal, listStory, listTodo, listInProgress, listTest, listDone, color } = this.state;
    const { title, Description } = this.state.status;

    const taskUlClass = classNames('listgroup-fix', 'card',
      { 'background-red': color === 'red' },
      { 'background-blue': color === 'blue' },
      { 'background-yellow': color === 'yellow' },
      { 'background-green': color === 'green' });
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
                  <Input placeholder='title' name='title' value={title} onChange={this.changeInput} />
                  <Input placeholder='Description' name='Description' value={Description} onChange={this.changeInput} />
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    monthsShown={1}
                    inline
                    title='Deadline'
                    placeholderText='Deadline'
                  />
                </ModalBody>
                <ModalFooter>
                  <div className='fix-box-color'>
                    <Button color='danger' className='fix-box-item' id='red' onClick={this.changeColor('red')} />
                    <Button color='info' className='fix-box-item' id='blue' onClick={this.changeColor('blue')} />
                    <Button color='warning' className='fix-box-item' id='yellow' onClick={this.changeColor('yellow')} />
                    <Button color='success' className='fix-box-item' id='green' onClick={this.changeColor('green')} />
                  </div>
                  {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}
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
                        <ListGroupItem key={index} className={taskUlClass} style={{ backgroundColor: this.state.bgColor }}>
                          <header className='col-md-12'>
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
                          <Col xs={12}>
                            <p>{JSON.parse(item).Description}</p>
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
                          <header className='col-md-12'>
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
                          <Col xs={12}>
                            <p>{JSON.parse(item).Description}</p>
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
                          <header className='col-md-12'>
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
                          <Col xs={12}>
                            <p>{JSON.parse(item).Description}</p>
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
                          <header className='col-md-12'>
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
                          <Col xs={12}>
                            <p>{JSON.parse(item).Description}</p>
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
          <div className='col-md-2'>
            <Col md={12} className='mt-4'>
              <ListGroup>
                {
                  listDone.length !== 0 ?
                    listDone.map((item, index) => {
                      return (
                        <ListGroupItem key={index} className={taskUlClass}>
                          <header className='col-md-12'>
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
                          <Col xs={12}>
                            <p>{JSON.parse(item).Description}</p>
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

export default App;