const React = require('react')
const shots = require('./shots')
const _ = require('../../library/utils')

module.exports = class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      shot: _.pickRandom(shots)
    }
  }

  launchSite() {
    _.sendMessage('openURL', { url: `https://dribbble.com/?utm_source=${_.config.platformIdentifier}-plugin` })
  }

  launchShot() {
    _.sendMessage('openURL', { url: this.state.shot.url })
  }

  render() {
    return (
      <div id="login-header">
        <header className="container" style={{ backgroundColor: this.state.shot.backgroundColor }}>
          <div className="shot-image" style={{ backgroundImage: `url('../web/images/shots/${this.state.shot.filename}')`, backgroundSize: 'cover' }} title={`${this.state.shot.title} by ${this.state.shot.user}`} onClick={(this.launchShot.bind(this))} />

          <div className="logo" onClick={this.launchSite}>
            <img src={`../web/images/dribbble-logo-large-${this.state.shot.logo}.png`} />
          </div>

          <div className={`info ${this.state.shot.theme}`}>
            <h1 className="default-cursor" style={{ color: this.state.shot.headingColor }}>What are you working on?</h1>
            <p className="default-cursor" style={{ color: this.state.shot.textColor }}>Dribbble is a community of designers sharing screenshots of their work, process, and projects.</p>
          </div>

          <div className="border" />
        </header>

        <div className="spacer" />
      </div>
    )
  }
}
