import { Component } from 'react'
import {
  Table,
  Container,
  Button,
  Row,
  Col,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'
import '../style.css'
import axios from 'axios'
import ReplayPage from '../Component/replay'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      activeItem: {},
      modalReplay: false,
      search: '',
      currentNavigation: 1
    }
  }

  componentDidMount () {
    this.refreshList()
  }

  componentDidUpdate () {
    console.log(this.state.currentNavigation)
  }

  refreshList = () => {
    axios.get('http://localhost:8000/api/xogames/').then(res =>
      this.setState({
        list: res.data.filter(
          item =>
            item.name.toUpperCase().includes(this.state.search) ||
            item.name.toLowerCase().includes(this.state.search)
        )
      })
    )
    // .filter(item => {
    //   return item.name.includes(this.state.search) ? item : null
    // })
    // .map(item =>
    //   this.setState({ list: item }, () => console.log(this.state.list))
    // )
  }

  toggle = () => {
    this.setState({ modalReplay: !this.state.modalReplay })
  }

  wacthReplay = data => {
    this.setState({ activeItem: data, modalReplay: !this.state.modalReplay })
  }

  handdleChange = e => {
    this.setState({ search: e.target.value }, () => this.refreshList())
  }

  renderPagination = () => {
    let pagination = []
    for (let i = 1; i <= Math.ceil(this.state.list.length / 5); i++) {
      pagination.push(
        <PaginationItem>
          <PaginationLink>{i}</PaginationLink>
        </PaginationItem>
      )
    }
    return pagination
  }

  renderItem () {
    return this.state.list
      .filter((data, index) => index + 1 === this.state.currentNavigation)
      .map((data, index) => (
        <tr key={index}>
          <td className='tbody-column'>{data.name}</td>
          <td className='tbody-column'>
            <Button color='success' onClick={() => this.wacthReplay(data)}>
              Watch
            </Button>
          </td>
        </tr>
      ))
  }

  render () {
    return (
      <Container className='container'>
        <Row>
          <Col>
            <div className='back-menu'>
              <Button
                color='primary'
                size='lg'
                onClick={() => (window.location.pathname = '/')}
              >
                Menu
              </Button>
              <Input
                type='search'
                name='search'
                placeholder='search by name'
                onChange={this.handdleChange}
                style={{ marginLeft: '10px', textAlign: 'center' }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table className='table-replay' bordered hover>
              <thead>
                <tr>
                  <th className='thead-column'>Name</th>
                  <th className='thead-column'>Replay</th>
                </tr>
              </thead>
              <tbody>{this.renderItem()}</tbody>
            </Table>
            <div className='navigation'>
              <Pagination aria-label='Page navigation example'>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => this.setState({ currentNavigation: 1 })}
                  >
                    {'<<'}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() =>
                      this.setState({
                        currentNavigation: this.state.currentNavigation - 1
                      })
                    }
                  >
                    {'<'}
                  </PaginationLink>
                </PaginationItem>
                {this.renderPagination()}
                <PaginationItem>
                  <PaginationLink
                    onClick={() =>
                      this.setState({
                        currentNavigation: this.state.currentNavigation + 1
                      })
                    }
                  >
                    {'>'}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() =>
                      this.setState({
                        currentNavigation: Math.ceil(this.state.list.length / 5)
                      })
                    }
                  >
                    {'>>'}
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </div>
          </Col>
        </Row>
        {this.state.modalReplay ? (
          <ReplayPage toggle={this.toggle} activeItem={this.state.activeItem} />
        ) : null}
      </Container>
    )
  }
}
export default App
