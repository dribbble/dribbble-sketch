const React = require('react')
const Dropdown = require('./Dropdown.jsx')

const titleTypes = {
  error: {
    text: 'Whoops!',
    icon: 'x-cloud.png'
  },
  connection: {
    text: 'No connection',
    icon: 'x-cloud.png'
  },
  share: {
    text: 'Share this selection',
    icon: 'upload-cloud.png'
  }
}

module.exports = class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const title = titleTypes[this.props.type]

    return (
      <div id="share-header">
        <header>
          <div className="top-section">
            <div className="logo-container">
              <div className="logo">
                <img src={`../web/images/dribbble-logo.png`} />
              </div>
            </div>

            <Dropdown />
          </div>

          <p className="title">
            <img src={`../web/images/${title.icon}`} />
            <span className="default-cursor">{title.text}</span>
          </p>

          <div className="border" />
        </header>
      </div>
    )
  }
}
