import { Component } from 'react'
import '../style.css'
import { Container, Row, Col, Button, Input } from 'reactstrap'
import GamePage from './game'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SettingPage from '../Component/setting'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      settingModal: false,
      gamePlay: false,
      size: { x: 3, y: 3 },
      ai: false,
      selectMode: false
    }
  }

  componentDidUpdate () {}

  toggleSetting = () => {
    this.setState({ settingModal: !this.state.settingModal })
  }

  onSelectMode = e => {
    this.setState({ ai: e, gamePlay: true })
  }

  onSave = e => {
    this.toggleSetting()
    this.setState({ size: e })
  }

  render () {
    return (
      <Router>
        <Container className='border-xo' fluid={true}>
          <Row>
            <Col>
              <p className='game-name'>TiC</p>
              <div style={{ position: 'relative' }}>
                <div className='bg-below-game-name'>
                  <p className='below-game-name'>TaC ToE</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <div className='menu-button'>
              {!this.state.selectMode && !this.state.gamePlay ? (
                <Col>
                  <Button
                    className='game-button'
                    size='lg'
                    color='danger'
                    onClick={() => this.setState({ selectMode: true })}
                  >
                    Play game
                  </Button>
                  <Button className='game-button' size='lg' color='primary'>
                    Replay
                  </Button>
                  <Button
                    className='game-button'
                    href='/'
                    size='lg'
                    color='primary'
                  >
                    How to play
                  </Button>
                  <Button
                    className='game-button'
                    size='lg'
                    color='primary'
                    onClick={() => this.toggleSetting()}
                  >
                    Setting
                  </Button>
                </Col>
              ) : null}
            </div>
          </Row>
          <Row>
            {this.state.selectMode && !this.state.gamePlay ? (
              <Col className="game-mode">
                <Button
                  className='game-button'
                  size='lg'
                  color='success'
                  onClick={() => this.onSelectMode(false)}
                >
                  Player vs Player
                </Button>
                <Button
                  className='game-button'
                  size='lg'
                  color='warning'
                  onClick={() => this.onSelectMode(true)}
                >
                  Player vs Computer
                </Button>
              </Col>
            ) : null}
          </Row>
          {this.state.gamePlay  ? (
            <Row>
              <GamePage size={this.state.size} ai={this.state.ai} />
            </Row>
          ) : null}
        </Container>
        {this.state.settingModal ? (
          <SettingPage
            toggleSetting={this.toggleSetting}
            onSave={this.onSave}
          />
        ) : null}
      </Router>
    )
  }
}

export default App
