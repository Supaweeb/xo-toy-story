import { Component } from 'react'
import '../style.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Row, Col, Button, NavItem, NavLink } from 'reactstrap'
import GamePage from './game'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  Game = () => {
    return <GamePage />
  }

  render () {
    return (
      <Router>
        <Container
          className='border-xo'
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100%',
            minWidth: '100%',
            backgroundSize: 'auto',
            position: 'fixed',
            backgroundImage:
              'url("https://media.istockphoto.com/vectors/digital-technology-gaming-abstract-background-vector-id1164222265?k=6&m=1164222265&s=170667a&w=0&h=ixQIWmB43PjPjgXSuxMdhLkV-V245Q8EZ_MmcLUOsOk=")'
          }}
        >
          {/* <Row>
          <Col>{this.renderXO()}</Col>
        </Row>
        <Row>
          <Col>
            <div style={{ color: 'white' }}>{this.state.message}</div>
          </Col>
        </Row> */}
          <Row>
            <Col>
              <p className='game-name'>Tic-tac-toe Game</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <a href='/'>Menu</a>
              <a href='/game'>Play</a>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <Route exact path='/' component={this.Home} />
                <Route exact path='/game' component={this.Game} />
              </div>
            </Col>
          </Row>
        </Container>
      </Router>
    )
  }
}

export default App
