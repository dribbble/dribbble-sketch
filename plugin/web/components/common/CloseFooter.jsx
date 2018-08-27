const React = require('react')
const _ = require('../../library/utils')

module.exports = class CloseFooter extends React.Component {
  constructor(props) {
    super(props)
  }

  dismissDialog() {
    _.sendMessage('closeBrowser')
  }

  render() {
    return (
      <footer id="close-footer">
        <div className="spacer"></div>
        <button className="cta" onClick={this.dismissDialog.bind(this)}>Okay</button>
      </footer>
    )
  }
}
