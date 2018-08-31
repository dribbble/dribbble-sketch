const React = require('react')

module.exports = class Tip extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="tool-tip">
        <img src="../web/images/icon-help-circle.png" />
        <p className={this.props.position}>{this.props.text}</p>
      </div>
    )
  }
}
