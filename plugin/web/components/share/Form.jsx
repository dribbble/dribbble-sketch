const React = require('react')
const _ = require('../../library/utils')
const Tip = require('../common/Tip.jsx')
const TokenField = require('../common/TokenField.jsx')

module.exports = class Form extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.refs.titleField.focus()
    this.refs.titleField.select()
  }

  render() {
    return (
      <form id="shot-form" ref="shotForm">
        <div className="left-column">
          { this.props.preview }

          <label className="checkbox-container">
            <input type="checkbox" name="low_profile" value="true" />
            <span>
              Hide from my default profile
              <Tip position="right" text="Shots that are hidden from your default profile stream are called “Low Profile” shots. These shots are visible via a menu on your profile." />
            </span>
          </label>
        </div>

        <div className="right-column">
          <label className="text-field-container">
            <span>Title</span>
            <input ref="titleField" type="text" name="title" placeholder="Title of your shot" defaultValue={this.props.selection.name} />
          </label>

          <label className="text-field-container">
            <span>
              Tags
              <Tip position="left" text="Start typing tags. Hit tab, comma, or return to complete. Hit backspace/delete to remove." />
            </span>
            <TokenField name="tags" placeholder="sketch" />
          </label>

          <label className="text-field-container">
            <span>
              Description
              <Tip position="left" text="URLs are automatically hyperlinked. Line breaks and paragraphs are automatically generated. a, em, strong and code HTML tags are accepted." />
            </span>
            <textarea name="description" placeholder="Tell us about your process and how you arrived at this design"></textarea>
          </label>
        </div>
      </form>
    )
  }
}
