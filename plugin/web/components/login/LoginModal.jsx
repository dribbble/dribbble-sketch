const React = require('react')
const Header = require('./Header.jsx')
const Actions = require('./Actions.jsx')
const _ = require('../../library/utils')

module.exports = class LoginModal extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    _.sendMessage('setBrowserSize', { height: this.refs.container.clientHeight })
    _.trackPage({ path: 'login' })
  }

  render() {
    return (
      <div ref="container">
        <Header />
        <Actions dialog={this.props.dialog} />
      </div>
    )
  }
}
