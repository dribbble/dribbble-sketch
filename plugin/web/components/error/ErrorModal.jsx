const React = require('react')
const _ = require('../../library/utils')
const Header = require('../header/Header.jsx')
const CloseFooter = require('../common/CloseFooter.jsx')

const errorMessages = {
  notConnected() {
    return 'Whoops! It looks like you’re not connected to the internet.'
  },
  noSelection() {
    return `You’ll need to first select a layer from the Layers panel.`
  },
  multipleSelection() {
    return 'You’ve selected more than one Layer. Please select one and try again.'
  },
  tooSmall() {
    return `Your selection is ${this.props.selection.frame.width}px × ${this.props.selection.frame.height}px, which is too small. Dribbble requires Shots to be at least ${_.config.dimensionReqs.width}px × ${_.config.dimensionReqs.height}px.`
  }
}

module.exports = class ErrorModal extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    _.sendMessage('setBrowserSize', { height: this.refs.container.clientHeight })
  }

  render() {
    return (
      <div id="errors" ref="container">
        <Header type={this.props.type === 'notConnected' ? 'connection' : 'error'} />
        <p className="message default-cursor">{errorMessages[this.props.type].call(this)}</p>
        <CloseFooter />
      </div>
    )
  }
}
