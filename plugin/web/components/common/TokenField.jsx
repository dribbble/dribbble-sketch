const React = require('react')
const tagsInput = require('../../vendor/tags-input')

module.exports = class TokenField extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    tagsInput(this.refs.field)
  }

  render() {
    return (
      <input ref="field" type="tags" {...this.props} />
    )
  }
}
