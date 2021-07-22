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
      size: { x: 3, y: 3 }
    }
  }

  componentDidUpdate () {
  }

  toggleSetting = () => {
    this.setState({ settingModal: !this.state.settingModal })
  }

  GamePage = () => {
    return <GamePage />
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
              {!this.state.gamePlay ? (
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
                  <Button
                    className='game-button'
                    // href='/game'
                    size='lg'
                    color='danger'
                    onClick={() => this.setState({ gamePlay: true })}
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
          {/* <Row>
            <Route exact path='/' component={this.Home} />
            <Route path='/game' component={this.GamePage} />
          </Row> */}
          <Row>
            {this.state.gamePlay ? <GamePage size={this.state.size} /> : null}
          </Row>
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
