import { Component } from 'react'
import '../style.css'
import { Container, Row, Col, Button } from 'reactstrap'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
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
            <Button className='game-button'>Play Game</Button>
            <Button className='game-button'>How to play</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
