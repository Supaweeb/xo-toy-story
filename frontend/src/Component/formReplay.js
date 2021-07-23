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
      name: ''
    }
  }

  handdleChange = e => {
    this.setState({ name: e.target.value })
  }

  handdleSave = () => {
    this.props.onSave(this.state.name)
  }

  handdleCancel = () => {
    this.props.toggle()
  }

  render () {
    return (
      <Container>
        <Modal isOpen={true} toggle={this.props.toggle}>
          <ModalHeader>Replay config</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label sm={4} size='lg'>
                  Name
                </Label>
                <Col sm={8}>
                  <Input
                    type='text'
                    name='row'
                    placeholder={'name'}
                    onChange={this.handdleChange}
                  />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={this.props.toggle}>
              Cancel
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
