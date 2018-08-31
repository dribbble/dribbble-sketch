const React = require('react')
const _ = require('../../library/utils')

module.exports = class CloseFooter extends React.Component {
  constructor(props) {
    super(props)
  }

  dismissDialog() {
    _.sendMessage('closeBrowser')
  }

  componentDidMount() {
    this.refs.okayBtn.focus()
  }

  render() {
    return (
      <footer id="close-footer">
        <div className="spacer"></div>
        <button className="cta" onClick={this.dismissDialog.bind(this)} ref="okayBtn">Okay</button>
      </footer>
    )
  }
}
