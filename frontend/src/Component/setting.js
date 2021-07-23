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
    this.state = {
      size: { x: 3, y: 3 }
    }
  }

  handdleChange = e => {
    let size = this.state.size
    if (e.target.name === 'row') {
      size.x = Number(e.target.value)
      return this.setState({ size: size })
    }
    if (e.target.name === 'column') {
      size.y = Number(e.target.value)
      return this.setState({ size: size })
    }
  }

  handdleCancal = () => {
    this.props.toggleSetting()
  }

  handdleSave = () => {
    this.props.onSave(this.state.size)
  }

  render () {
    return (
      <Container>
        <Modal isOpen={true} toggle={this.state.toggle}>
          <ModalHeader>Setting board size</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for='exampleEmail' sm={4} size='lg'>
                  Row
                </Label>
                <Col sm={8}>
                  <Input
                    type='number'
                    name='row'
                    placeholder={'Not less than 3'}
                    min={3}
                    bsSize='lg'
                    value={this.state.size.x}
                    onChange={this.handdleChange}
                  />
                </Col>
              </FormGroup>
              <br />
              <FormGroup row>
                <Label for='exampleEmail' sm={4} size='lg'>
                  Column
                </Label>
                <Col sm={8}>
                  <Input
                    type='number'
                    name='column'
                    placeholder={'Not less than 3'}
                    min={3}
                    bsSize='lg'
                    value={this.state.size.y}
                    onChange={this.handdleChange}
                  />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={() => this.handdleCancal()}>
              Close
            </Button>
            <Button color='success' onClick={this.handdleSave}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}

export default App
