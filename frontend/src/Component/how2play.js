import { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  FormGroup,
  Label,
  Input,
  Col,
  Form
} from 'reactstrap'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handdleCancal = () => {
    this.props.toggle()
  }

  render () {
    return (
      <Container>
        <Modal isOpen={true} toggle={this.props.toggle} size='lg'>
          <ModalHeader>How to play</ModalHeader>
          <ModalBody>
            <Form>
              <p className='how2play-text'>
                1. The game is played on a grid that's 3 row by 3 column{' '}
                <mark>
                  (You can change it to other by setting on setting menu)
                </mark>
                . <br />
              </p>
              <p className='how2play-text'>
                2. You are X, your friend <mark>(or the computer)</mark> is O.
                Players take turns putting their marks in empty point. <br />
              </p>
              <p className='how2play-text'>
                3. The first player to get 3 of her marks in a row{' '}
                <mark>(up, down, across, or diagonally)</mark> is the winner
                <mark>(You can change it to other by setting on setting menu)</mark>. <br />
              </p>
              <p className='how2play-text'>
                4. When all board point are full, the game is over. If no player
                has 3 marks in a row{' '}
                <mark>(or something as you setting in 3.)</mark> ,the game ends
                in a draw. <br />
              </p>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={() => this.handdleCancal()}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}

export default App
