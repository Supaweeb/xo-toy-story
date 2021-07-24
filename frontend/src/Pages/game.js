import { Component } from 'react'
import '../style.css'
import { Container, Row, Col, Button } from 'reactstrap'
import SettingPage from '../Component/setting'
import FromReplayPage from '../Component/formReplay.js'
import axios from 'axios'

class App extends Component {
  constructor (props) {
    super(props)
    let x = props.size.x
    let y = props.size.y
    this.state = {
      settingModal: false,
      size: { x, y },
      turn: 'X',
      table: [...Array(x)].map(e => Array(y).fill(undefined)),
      isEndGame: false,
      isOverlay: false,
      message: 'Welcome',
      store: [],
      ai: false,
      formReplayModal: false,
      activeItem: { name: '', boardSize: {},winInRow:props.winCondition, gameplay: [] }
    }
  }

  componentDidMount () {
    this.setState({ ai: this.props.ai })
  }

  toggleSetting = () => {
    this.setState({ settingModal: !this.state.settingModal })
  }

  onSave = e => {
    this.toggleSetting()
    this.setState({ size: e }, () => this.gameRestart())
  }

  componentDidUpdate () {
    this.state.isOverlay
      ? (document.getElementById('overlay').style.display = 'block')
      : (document.getElementById('overlay').style.display = 'none')
  }

  toggleOverlay = () => {
    this.setState({ isOverlay: false }, () => this.setState({ turn: 'X' }))
  }

  winnerCondition = checkTable => {
    for (let i = 0; i < this.state.size.x; i++) {
      for (let j = 0; j < this.state.size.y; j++) {
        if ([undefined, null].includes(checkTable[i][j])) {
          continue
        }
        try {
          // horizontal check for winner
          var winning_stack = 1
          var compare = checkTable[i][j]
          for (let stack = 1; stack < this.state.activeItem.winInRow; stack++) {
            if (compare === checkTable[i][j + stack]) {
              winning_stack = winning_stack + 1
              continue
            }
            winning_stack = 1
          }
          // check game was ended from case 1 horizontal
          if (winning_stack === this.state.activeItem.winInRow) {
            return checkTable[i][j]
          }
          // vertical check for winner
          for (let stack = 1; stack < this.state.activeItem.winInRow; stack++) {
            // check index out of bound break
            if (i + stack >= this.state.size.x) {
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
          if (winning_stack === this.state.activeItem.winInRow) {
            return checkTable[i][j]
          }
          // diagonal check for winner
          for (let stack = 1; stack < this.state.activeItem.winInRow; stack++) {
            // check index out of bound break
            if (i + stack >= this.state.size.x) {
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
          if (winning_stack === this.state.activeItem.winInRow) {
            return checkTable[i][j]
          }
          for (let stack = 1; stack < this.state.activeItem.winInRow; stack++) {
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
          if (winning_stack === this.state.activeItem.winInRow) {
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
      return 0
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
      return this.state.ai
        ? this.setState({ turn: 'O' }, () =>
            setTimeout(() => {
              this.aiBotPlay()
            }, 200)
          )
        : this.setState({ turn: 'O' }) // player 2 play
    }
    return this.setState({ turn: 'X' })
  }

  check = () => {
    let result = this.winnerCondition(this.state.table)
    if (result != null) {
      this.setState({ isEndGame: true, isOverlay: true })
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
      // payload.push({ i: i, j: j, player: playedTable[i][j] })
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
    this.setState({ table: table, store: [], isEndGame: false })
  }

  toggleFormReplayModal = () => {
    this.setState({ formReplayModal: !this.state.formReplayModal })
  }

  onSaveReplay = e => {
    this.toggleFormReplayModal()
    // this.setState({ size: e }, () => this.gameRestart())
    let activeItem = this.state.activeItem
    activeItem.name = e
    activeItem.boardSize = this.props.size
    activeItem.gameplay = this.state.store
    this.setState({ activeItem: activeItem }, () =>
      axios.post('http://localhost:8000/api/xogames/', activeItem)
    )
  }

  handdleSubmit = () => {
    if (this.state.isEndGame) {
      return this.toggleFormReplayModal()
    }
    return alert('Game not over yet')
  }

  storeSeqPlay = (i, j, player) => {
    let payload = this.state.store
    payload.push({ i: i, j: j, player: player })
    this.setState({ store: payload }, () => this.check())
    // set to axios on click hanndleSubmit
  }

  renderXO = () => {
    let h = window.innerHeight / 2
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
          <Col>
            <div className='footer-ingame-menu'>
              <Button
                color='primary'
                size='lg'
                onClick={() => (window.location.pathname = '/')}
              >
                Menu
              </Button>
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
            <div style={{ position: 'relative' }}>
              <p className='text-turn'>{this.state.turn} Turn</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='xo-bg'>{this.renderXO()}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div id='overlay' onClick={() => this.toggleOverlay()}>
              {this.state.message}
            </div>
          </Col>
        </Row>
        {this.state.settingModal ? (
          <SettingPage
            toggleSetting={this.toggleSetting}
            onSave={this.onSave}
          />
        ) : null}
        {this.state.formReplayModal ? (
          <FromReplayPage
            toggle={this.toggleFormReplayModal}
            onSave={this.onSaveReplay}
          />
        ) : null}
      </Container>
    )
  }
}

export default App
