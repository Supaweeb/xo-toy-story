import { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Col,
  Row
} from 'reactstrap'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toggle: props.toggle,
      activeItem: props.activeItem,
      table: [...Array(props.activeItem.boardSize.x)].map(e =>
        Array(props.activeItem.boardSize.y).fill(undefined)
      )
    }
  }

  playReplay = async () => {
    const moveList = this.state.activeItem.gameplay
    let table = this.state.table

    // await moveList.map(move => this.test(move.i, move.j, move.player))
    moveList.map((move, index) =>
      setTimeout(() => {
        table[move.i][move.j] = move.player
        this.setState({ table: table })
      }, 1000 * index)
    )

  }

  gameRestart = () => {
    let table = this.state.table
    table = [...Array(this.state.activeItem.boardSize.x)].map(e =>
      Array(this.state.activeItem.boardSize.y).fill(undefined)
    )
    this.setState({ table: table })
  }

  renderXO = () => {
    let h = window.innerHeight / 2
    let xoTable = []
    for (let index = 0; index < this.state.activeItem.boardSize.x; index++) {
      for (
        let jindex = 0;
        jindex < this.state.activeItem.boardSize.y;
        jindex++
      ) {
        this.state.table[index][jindex] === 'X'
          ? xoTable.push(
              <Button
                className='xo-button'
                color='info'
                style={{
                  width: h / this.state.activeItem.boardSize.x,
                  height: h / this.state.activeItem.boardSize.y
                }}
              >
                {this.state.table[index][jindex]}
              </Button>
            )
          : this.state.table[index][jindex] === 'O'
          ? xoTable.push(
              <Button
                className='xo-button'
                color='warning'
                style={{
                  width: h / this.state.activeItem.boardSize.x,
                  height: h / this.state.activeItem.boardSize.y
                }}
              >
                {this.state.table[index][jindex]}
              </Button>
            )
          : xoTable.push(
              <Button
                className='xo-button'
                outline
                color='secondary'
                style={{
                  width: h / this.state.activeItem.boardSize.x,
                  height: h / this.state.activeItem.boardSize.y
                }}
              >
                {this.state.table[index][jindex]}
              </Button>
            )
      }
      xoTable.push(<br />)
    }
    return xoTable
  }

  render () {
    return (
      <Container>
        <Modal size='lg' isOpen={true} toggle={this.state.toggle}>
          <ModalHeader>Replay</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <div className='replay-xo-btn'>{this.renderXO()}</div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={this.state.toggle}>
              Close
            </Button>
            <Button color='success' onClick={() => this.playReplay()}>
              Play
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}

export default App
