const React = require('react')
const _ = require('../../library/utils')

module.exports = class Actions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'login',
      sessionId: _.randomString()
    }
  }

  messages(status) {
    return ({
      login: 'To share your work from Sketch, please log in to Dribbble.',
      loading: 'Please visit the page opened in your browser.',
      error: 'Something went wrong. Want to try again?',
      success: 'You’re all set! Select a layer to start sharing.'
    })[status]
  }

  dismissDialog() {
    _.sendMessage('closeBrowser')
  }

  reloadBrowser() {
    window.location.reload()
  }

  componentDidMount() {
    this.refs.loginBtn.focus()
  }

  launchLogin() {
    const authUrl = `${_.config.siteUrl}/auth/plugin?state=${_.config.platformIdentifier}-${this.state.sessionId}`
    _.sendMessage('openURL', { url: authUrl })

    this.setState({ status: 'loading' })

    const checkParams = _.serializeObject({
      code: this.state.sessionId,
      platform: _.config.platformIdentifier
    })

    const checkHeaders = {}
    if (STAGING_AUTH != null) {
      checkHeaders['Authorization'] = `Basic ${btoa(STAGING_AUTH)}`
    }

    _.retriableFetch(`${_.config.siteUrl}/auth/plugin/check?${checkParams}`, {
      method: 'GET',
      headers: checkHeaders,
    }).then((response) => {
      response.json().then((data) => {
        _.sendMessage('saveAuthToken', { token: data.token })
        this.setState({ status: 'success' })
        this.refs.okayBtn.focus()
      }).catch((error) => {
        this.setState({ status: 'error' })
      })
    }).catch((error) => {
      this.setState({ status: 'error' })
    })
  }

  render() {
    return (
      <div id="login-footer">
        <p className="message default-cursor">{this.messages(this.state.status)}</p>

        <footer className="container">
          <div className="spacer"></div>
          { this.state.status === 'success' ? (
            <button onClick={this.reloadBrowser.bind(this)} className="cta" ref="okayBtn">Okay</button>
          ) : (
            <div className="button-group">
              <button onClick={this.dismissDialog.bind(this)} className="adtl">Cancel</button>
              { this.state.status === 'loading' ? (
                <div className="loading-button">
                  <img src="../web/images/processing.gif" />
                  <span className="default-cursor">Waiting...</span>
                </div>
              ) : (
                <button onClick={this.launchLogin.bind(this)} className="cta" ref="loginBtn">Log in to Dribbble</button>
              ) }
            </div>
          ) }
          <div className="spacer"></div>
        </footer>
      </div>
    )
  }
}
