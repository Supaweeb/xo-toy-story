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

  refreshList = () => {
    axios.get('http://localhost:8000/api/xogames/').then(res =>
      this.setState({
        list: res.data.filter(
          item =>
            item.name.toUpperCase().includes(this.state.search.toUpperCase()) ||
            item.name.toLowerCase().includes(this.state.search.toLowerCase())
        )
      })
    )
  }

  toggle = () => {
    this.setState({ modalReplay: !this.state.modalReplay })
  }

  wacthReplay = data => {
    this.setState({ activeItem: data, modalReplay: !this.state.modalReplay })
  }

  handdleChange = e => {
    this.setState({ search: e.target.value,currentNavigation:1 }, () => this.refreshList())
  }

  handdleClick = e => {
    if (e.target.name === 'first') {
      return this.setState({ currentNavigation: 1 })
    } else if (e.target.name === 'prev') {
      return this.setState({
        currentNavigation: this.state.currentNavigation - 1
      })
    } else if (e.target.name === 'next') {
      return this.setState({
        currentNavigation: this.state.currentNavigation + 1
      })
    } else if (e.target.name === 'last') {
      return this.setState({
        currentNavigation: Math.ceil(this.state.list.length / 5)
      })
    }
    return this.setState({
      currentNavigation: Number(e.target.name)
    })
  }

  renderPagination = () => {
    let pagination = []
    for (let i = 1; i <= Math.ceil(this.state.list.length / 5); i++) {
      pagination.push(
        <PaginationItem key={i}>
          <PaginationLink name={i} onClick={this.handdleClick}>
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }
    return pagination
  }

  renderItem () {
    return this.state.list
      .filter(
        (data, index) =>
          Math.ceil((index + 1) / 5) === this.state.currentNavigation
      )
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
                style={{ marginLeft: '10px', textAlign: 'center'}}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table className='table-replay' bordered hover>
              <thead>
                {this.state.list.length === 0 ? null : (
                  <tr>
                    <th className='thead-column'>Name</th>
                    <th className='thead-column'>Replay</th>
                  </tr>
                )}
              </thead>
              <tbody>{this.renderItem()}</tbody>
            </Table>
            <div className='navigation'>
              <Pagination aria-label='Page navigation example'>
                {this.state.currentNavigation > 1 ? (
                  <PaginationItem>
                    <PaginationLink name='first' onClick={this.handdleClick}>
                      {'<<'}
                    </PaginationLink>
                  </PaginationItem>
                ) : null}
                {this.state.currentNavigation > 1 ? (
                  <PaginationItem>
                    <PaginationLink name='prev' onClick={this.handdleClick}>
                      {'<'}
                    </PaginationLink>
                  </PaginationItem>
                ) : null}

                {Math.ceil(this.state.list.length / 5) === 1
                  ? null
                  : this.renderPagination()}
                {this.state.currentNavigation <
                Math.ceil(this.state.list.length / 5) ? (
                  <PaginationItem>
                    <PaginationLink name='next' onClick={this.handdleClick}>
                      {'>'}
                    </PaginationLink>
                  </PaginationItem>
                ) : null}
                {this.state.currentNavigation <
                Math.ceil(this.state.list.length / 5) ? (
                  <PaginationItem>
                    <PaginationLink name='next' onClick={this.handdleClick}>
                      {'>>'}
                    </PaginationLink>
                  </PaginationItem>
                ) : null}
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
