import { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container
} from 'reactstrap'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Container>
        <Modal>
          <ModalHeader>Setting</ModalHeader>
          <ModalBody>Size</ModalBody>
          <ModalFooter>WTF</ModalFooter>
        </Modal>
      </Container>
    )
  }
}

export default App
