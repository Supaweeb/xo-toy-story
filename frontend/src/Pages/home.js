import { Component } from 'react'
import '../style.css'
import { Container, Row, Col, Button, Input } from 'reactstrap'
import GamePage from './game'

import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  GamePage = () => {
    return <GamePage x={5} y={5} />
  }

  hiddenMenu = e => {
    console.log(window.location.pathname)
    document.getElementsByClassName('game-button')[0].style.display = 'none'
  }

  render () {
    return (
      <Router>
        <Container className='border-xo'>
          <Row>
            <Col>
              <p className='game-name'>Tic-tac-toe Game</p>
            </Col>
          </Row>
          <Row>
            <div className='menu-button'>
              {window.location.pathname === '/' ? (
                <Col>
                  {/* <div className='size-input'>
                    <p>Game size</p>
                    <Input
                      type='number'
                      name='number'
                      id="input-button"
                      placeholder='3'
                    />
                    <p>x</p>
                    <Input
                      type='number'
                      name='number'
                      id="input-button"
                      placeholder='3'
                    />
                  </div> */}
                  <Button className='game-button' href='/game' size='lg'>
                    Play game{' '}
                  </Button>
                  <Button className='game-button' size='lg'>
                    Replay
                  </Button>
                  <Button className='game-button' href='/' size='lg'>
                    How to play
                  </Button>
                  <Button className='game-button' href='/game' size='lg'>
                    Setting
                  </Button>
                </Col>
              ) : (
                <Col className='ingame-button'>
                  <Button
                    className='game-button'
                    color='info'
                    href='/'
                    size='lg'
                  >
                    Menu
                  </Button>
                </Col>
              )}
            </div>
          </Row>
          <Row>
            <Route exact path='/' component={this.Home} />
            <Route path='/game' component={this.GamePage} />
          </Row>
        </Container>
      </Router>
    )
  }
}

export default App
