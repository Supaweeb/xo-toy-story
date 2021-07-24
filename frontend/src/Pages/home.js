import { Component } from 'react'
import '../style.css'
import { Container, Row, Col, Button } from 'reactstrap'
import { BrowserRouter as Router } from 'react-router-dom'
import SettingPage from '../Component/setting'
import How2playPage from '../Component/how2play'
import GamePage from './game'
import GameReplayPage from './saveReplay'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // modal
      settingModal: false,
      how2playModal: false,
      // page state
      gamePlay: false,
      selectMode: false,
      homeMenu: true,
      gameReplay: false,
      // send parameter to game play
      size: { x: 3, y: 3 },
      ai: false,
      winCondition: 3
    }
  }

  toggleSetting = () => {
    this.setState({ settingModal: !this.state.settingModal })
  }

  toggleHow2Play = () => {
    this.setState({ how2playModal: !this.state.how2playModal })
  }

  onSelectMode = e => {
    this.setState({ ai: e, gamePlay: true })
  }

  onSave = (size, win) => {
    this.toggleSetting()
    this.setState({ size: size, winCondition: win })
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
                    size='lg'
                    color='primary'
                    onClick={() => this.toggleHow2Play()}
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
              <GamePage
                size={this.state.size}
                ai={this.state.ai}
                winCondition={this.state.winCondition}
              />
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
        {/* On selected how to play game */}
        {this.state.how2playModal ? <How2playPage toggle={this.toggleHow2Play} /> : null}
      </Router>
    )
  }
}

export default App
