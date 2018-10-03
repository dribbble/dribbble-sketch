const React = require('react')
const _ = require('../../library/utils')

module.exports = class Dropdown extends React.Component {
  constructor(props) {
    super(props)
  }

  toggleMenu() {
    this.refs.container.classList.toggle('active')
  }

  logout() {
    _.sendMessage('saveAuthToken', { token: '' })
    _.sendMessage('saveUserDetails', { user: '' })
    window.location.reload()
  }

  launchAccount() {
    _.sendMessage('openURL', { url: `${_.config.siteUrl}/account` })
  }

  launchHelp() {
    _.sendMessage('openURL', { url: _.config.helpUrl })
  }

  launchSite() {
    _.sendMessage('openURL', { url: _.config.siteUrl })
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick.bind(this), false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick.bind(this), false)
  }

  handleClick(e) {
    if (!this.refs.container.contains(e.target)) {
      this.refs.container.classList.remove('active')
    }
  }

  render() {
    return (
      <div id="header-dropdown-container" ref="container">
        <div className="trigger" onClick={this.toggleMenu.bind(this)}>
          <img className="dots" src={`../web/images/icon-dots-dark.png`} />
        </div>

        <nav id="dropdown-navigation">
          <ul>
            <li><a href="#" onClick={this.logout.bind(this)}>Log out</a></li>
            <li><a href="#" onClick={this.launchAccount.bind(this)}>Account settings…</a></li>
            <li className="divider"><a href="#" onClick={this.launchHelp.bind(this)}>Support…</a></li>
            <li><a href="#" onClick={this.launchSite.bind(this)}>Visit Dribbble…</a></li>
          </ul>
        </nav>
      </div>
    )
  }
}
