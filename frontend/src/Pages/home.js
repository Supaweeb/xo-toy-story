import { Component } from 'react'
import '../style.css'
import { Container, Row, Col, Button } from 'reactstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SettingPage from '../Component/setting'
import GamePage from './game'
import GameReplayPage from './saveReplay'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      settingModal: false,
      gamePlay: false,
      size: { x: 3, y: 3 },
      ai: false,
      selectMode: false,
      homeMenu: true,
      gameReplay: false
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

  GameReplay = () => {
    return <GameReplayPage />
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
              {/* On home game start home menu is open */}
              {this.state.homeMenu ? (
                <Col>
                  <Button
                    className='game-button'
                    size='lg'
                    color='danger'
                    onClick={() =>
                      this.setState({ selectMode: true, homeMenu: false })
                    }
                  >
                    Play game
                  </Button>
                  <Button
                    className='game-button'
                    size='lg'
                    color='primary'
                    onClick={() =>
                      this.setState({ gameReplay: true, homeMenu: false })
                    }
                  >
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
            {/* On going to play game just want to select game mode player vs player / player vs computer*/}
            {this.state.selectMode && !this.state.gamePlay ? (
              <Col className='game-mode'>
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

          <Row>
            {/* On game replay */}
            {this.state.gameReplay ? <GameReplayPage /> : null}
          </Row>
          {/* On selected mode go to game board*/}
          {this.state.gamePlay ? (
            <Row>
              <GamePage size={this.state.size} ai={this.state.ai} />
            </Row>
          ) : null}
        </Container>
        {/* On selected setting for change size of board */}
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
