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
  badRatio() {
    return `Your selection is ${this.props.selection.frame.width.toFixed()}px × ${this.props.selection.frame.height.toFixed()}px, which is not the ratio accepted by Dribbble. The allowed ratio is 4:3 (e.g. 400 × 300, 720 × 540, or 1200 × 900).`
  },
  tooSmall() {
    return `Your selection is ${this.props.selection.frame.width.toFixed()}px × ${this.props.selection.frame.height.toFixed()}px, which is too small. Dribbble requires Shots to be at least ${_.config.dimensionReqs.min.width}px × ${_.config.dimensionReqs.min.height}px.`
  },
  tooLarge() {
    return `Your selection is ${this.props.selection.frame.width.toFixed()}px × ${this.props.selection.frame.height.toFixed()}px, which is too large. Dribbble requires Shots to be no larger than ${_.config.dimensionReqs.max.width}px × ${_.config.dimensionReqs.max.height}px.`
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
