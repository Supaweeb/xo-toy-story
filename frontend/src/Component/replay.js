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
      ),
      isOverlay: false,
      count: 3
    }
  }

  componentDidUpdate () {
    this.state.isOverlay
      ? (document.getElementById('overlay-replay').style.display = 'block')
      : (document.getElementById('overlay-replay').style.display = 'none')
  }

  toggleOverlay = () => {
    this.setState({ isOverlay: false })
  }

  winnerCondition = checkTable => {
    for (let i = 0; i < this.state.activeItem.boardSize.x; i++) {
      for (let j = 0; j < this.state.activeItem.boardSize.y; j++) {
        if ([undefined, null].includes(checkTable[i][j])) {
          continue
        }
        try {
          // horizontal check for winner
          var winning_stack = 1
          var compare = checkTable[i][j]
          for (let stack = 1; stack < this.state.count; stack++) {
            if (compare === checkTable[i][j + stack]) {
              winning_stack = winning_stack + 1
              continue
            }
            winning_stack = 1
          }
          // check game was ended from case 1 horizontal
          if (winning_stack === this.state.count) {
            return checkTable[i][j]
          }
          // vertical check for winner
          for (let stack = 1; stack < this.state.count; stack++) {
            // check index out of bound break
            if (i + stack >= this.state.activeItem.boardSize.x) {
              winning_stack = 1
              break
            }
            if (compare === checkTable[i + stack][j]) {
              winning_stack = winning_stack + 1
              continue
            }
            winning_stack = 1
          }
          // check game was ended from case 2 vertical
          if (winning_stack === this.state.count) {
            return checkTable[i][j]
          }
          // diagonal check for winner
          for (let stack = 1; stack < this.state.count; stack++) {
            // check index out of bound break
            if (i + stack >= this.state.activeItem.boardSize.x) {
              winning_stack = 1
              break
            }
            if (compare === checkTable[i + stack][j + stack]) {
              winning_stack = winning_stack + 1
              continue
            }
            winning_stack = 1
          }
          // check game was ended from case 3 diagonal
          if (winning_stack === this.state.count) {
            return checkTable[i][j]
          }
          for (let stack = 1; stack < this.state.count; stack++) {
            if (i - stack < 0) {
              winning_stack = 1
              break
            }
            if (compare === checkTable[i - stack][j + stack]) {
              winning_stack = winning_stack + 1
              continue
            }
            winning_stack = 1
          }
          // check game was ended from case 4 diagonal
          if (winning_stack === this.state.count) {
            return checkTable[i][j]
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    if (
      checkTable.some(element => element.includes(undefined)) ||
      checkTable.some(element => element.includes(null))
    ) {
      return null
    }
    return 'draw'
  }

  check = () => {
    let result = this.winnerCondition(this.state.table)
    if (result != null) {
      this.setState({ isEndGame: true, isOverlay: true })
      return this.setState({
        message:
          result === 'draw' ? `Game is ${result}` : `Player ${result} won`
      })
    }
  }

  playReplay = () => {
    const moveList = this.state.activeItem.gameplay
    let table = this.state.table

    // await moveList.map(move => this.test(move.i, move.j, move.player))
    moveList.map((move, index) =>
      setTimeout(() => {
        table[move.i][move.j] = move.player
        this.setState({ table: table }, () => this.check())
      }, 1000 * index)
    )
  }

  handdlePlay = () => {
    new Promise(resolve => resolve(this.gameRestart())).then(() =>
      this.playReplay()
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
                color='primary'
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
                color='danger'
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
      <Container style={{ zIndex: 2 }}>
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
            <Button color='success' onClick={this.handdlePlay}>
              Play
            </Button>
          </ModalFooter>
          <Row>
            <Col>
              <div
                id='overlay-replay'
                onClick={() => this.toggleOverlay()}
              >
                {this.state.message}
              </div>
            </Col>
          </Row>
        </Modal>
      </Container>
    )
  }
}

export default App
