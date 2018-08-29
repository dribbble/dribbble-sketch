const React = require('react')
const _ = require('../../library/utils')

module.exports = class Form extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <form id="shot-form" ref="shotForm">
        <div className="left-column">
          { this.props.preview }

          <label className="checkbox-container">
            <input type="checkbox" name="low_profile" value="true" />
            <span>Hide from my profile</span>
          </label>
        </div>

        <div className="right-column">
          <label className="text-field-container">
            <span>Title</span>
            <input type="text" name="title" placeholder="Title of your shot" defaultValue={this.props.selection.name} />
          </label>

          <label className="text-field-container">
            <span>Tags</span>
            <input type="text" name="tags" placeholder="sketch" />
          </label>

          <label className="text-field-container">
            <span>Description</span>
            <textarea name="description" placeholder="Tell us about your process and how you arrived at this design"></textarea>
          </label>
        </div>
      </form>
    )
  }
}
