import { Component } from 'react'
import '../style.css'
import { Container, Row, Col, Button } from 'reactstrap'

class App extends Component {
  constructor (props) {
    super(props)
    let x = props.x
    let y = props.y
    this.state = {
      size: { x, y },
      turn: 'X',
      table: [...Array(x)].map(e => Array(y).fill(undefined)),
      isEndGame: false,
      message: 'Welcome',
      count: 3,
      store: []
    }
  }

  isEqual = (table1, table2, table3) => {
    if (table1 === table2 && table1 === table3) {
      return true
    }
    return false
  }

  componentDidUpdate () {
    this.state.isEndGame
      ? (document.getElementById('overlay').style.display = 'block')
      : (document.getElementById('overlay').style.display = 'none')
  }

  toggleOverlay = () => {
    this.setState({ isEndGame: !this.state.isEndGame }, () =>
      this.setState({ turn: 'X' })
    )
  }

  winnerCondition = checkTable => {
    for (let i = 0; i < this.state.size.x; i++) {
      for (let j = 0; j < this.state.size.y; j++) {
        if ([undefined, null].includes(checkTable[i][j])) {
          continue
        }
        try {
          if (
            checkTable[i][j] === checkTable[i][j + 1] &&
            checkTable[i][j] === checkTable[i][j + 2]
          ) {
            return checkTable[i][j]
          }
          if (i + 1 > this.state.size.x - 1 || i + 2 > this.state.size.x - 1) {
            continue
          } else {
            if (
              checkTable[i][j] === checkTable[i + 1][j] &&
              checkTable[i][j] === checkTable[i + 2][j]
            ) {
              return checkTable[i][j]
            }
            if (
              checkTable[i][j] === checkTable[i + 1][j + 1] &&
              checkTable[i][j] === checkTable[i + 2][j + 2]
            ) {
              return checkTable[i][j]
            }
            if (
              checkTable[i][j] === checkTable[i + 1][j - 1] &&
              checkTable[i][j] === checkTable[i + 2][j - 2]
            ) {
              return checkTable[i][j]
            }
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

  aiBotPlay = () => {
    var table = JSON.parse(JSON.stringify(this.state.table))
    let bestScore = -Infinity
    let move
    for (let i = 0; i < this.state.size.x; i++) {
      for (let j = 0; j < this.state.size.y; j++) {
        if (table[i][j] === null) {
          table[i][j] = 'O' // ai play
          let score = this.minimax(table, 0, -Infinity, Infinity, false)
          table[i][j] = null
          if (score > bestScore) {
            bestScore = score
            move = { i, j }
          }
        }
      }
    }
    let board = this.state.table
    board[move.i][move.j] = 'O' // ai play
    this.storeSeqPlay(move.i, move.j, 'O')
  }

  minimax = (rtable, depth, alpha, beta, isMaximize) => {
    var table = JSON.parse(JSON.stringify(rtable))
    let result = this.winnerCondition(table)
    let scores = {
      O: 10,
      X: -10,
      draw: 0
    }

    if (result != null) {
      if (result === 'O') {
        return scores[result] + depth
      } else if (result === 'X') {
        return scores[result] - depth
      }
      return scores[result]
    }

    if (depth === 1) {
      return depth
    }

    if (isMaximize) {
      let bestScore = -Infinity
      forloop: for (let i = 0; i < this.state.size.x; i++) {
        for (let j = 0; j < this.state.size.y; j++) {
          if (table[i][j] === null) {
            table[i][j] = 'O'
            let score = this.minimax(table, depth + 1, alpha, beta, false)
            table[i][j] = null
            bestScore = Math.max(score, bestScore)
            alpha = Math.max(alpha, score)
            if (beta <= alpha) {
              break forloop
            }
          }
        }
      }
      return bestScore
    } else {
      let bestScore = Infinity
      forloop: for (let i = 0; i < this.state.size.x; i++) {
        for (let j = 0; j < this.state.size.y; j++) {
          if (table[i][j] === null) {
            table[i][j] = 'X'
            let score = this.minimax(table, depth + 1, alpha, beta, true)
            table[i][j] = null
            bestScore = Math.min(score, bestScore)
            beta = Math.min(beta, score)
            if (beta <= alpha) {
              break forloop
            }
          }
        }
      }
      return bestScore
    }
  }

  nextTurn = () => {
    if (this.state.turn === 'X') {
      // ai play as O
      // return this.setState({ turn: 'O' }, () =>
      //   setTimeout(() => {
      //     this.aiBotPlay()
      //   }, 200)
      // )
      return this.setState({ turn: 'O' }) // player 2 play
    }
    return this.setState({ turn: 'X' })
  }

  check = () => {
    let result = this.winnerCondition(this.state.table)
    if (result != null) {
      this.setState({ isEndGame: true })
      return this.setState({
        message:
          result === 'draw' ? `Game is ${result}` : `Player ${result} won`
      })
      // return this.setState({ isEndGame: true }, () => console.log(`Game over ${result} won`))
    }
    this.nextTurn()
  }

  handdleClick = (i, j) => {
    let playedTable = this.state.table
    if (playedTable[i][j] === undefined) {
      playedTable[i][j] = this.state.turn
      this.setState({ table: playedTable }, () =>
        this.storeSeqPlay(i, j, this.state.turn)
      )
    }
  }

  gameRestart = () => {
    let table = this.state.table
    table = [...Array(this.state.size.x)].map(e =>
      Array(this.state.size.y).fill(undefined)
    )
    this.setState({ table: table }, () => this.setState({ store: [] }))
  }

  handdleSubmit = () => {}

  storeSeqPlay = (i, j, player) => {
    let payload = this.state.store
    payload.push({ i: i, j: j, player: player })
    this.setState({ store: payload }, () => this.check())
    // set to axios on click hanndleSubmit
  }

  renderXO = () => {
    let h = window.innerHeight/2
    let xoTable = []
    for (let index = 0; index < this.state.size.x; index++) {
      for (let jindex = 0; jindex < this.state.size.y; jindex++) {
        this.state.table[index][jindex] === 'X'
          ? xoTable.push(
              <Button
                className='xo-button'
                color='info'
                style={{
                  width: h / this.state.size.x,
                  height: h / this.state.size.x
                }}
                onClick={() => this.handdleClick(index, jindex)}
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
                  width: h / this.state.size.x,
                  height: h / this.state.size.x
                }}
                onClick={() => this.handdleClick(index, jindex)}
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
                  width: h / this.state.size.x,
                  height: h / this.state.size.x
                }}
                disabled={this.state.isEndGame}
                onClick={() => this.handdleClick(index, jindex)}
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
      <Container className='container'>
        <Row>
          <Col className='xo-bg'>{this.renderXO()}</Col>
        </Row>
        <Row>
          <Col>
            <div className='footer-ingame-menu'>
              <Button
                color='danger'
                size='lg'
                onClick={() => this.gameRestart()}
              >
                Restart
              </Button>
              <Button
                color='success'
                onClick={() => this.handdleSubmit()}
                size='lg'
              >
                Save
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div id='overlay' onClick={() => this.toggleOverlay()}>
              {this.state.message}
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
