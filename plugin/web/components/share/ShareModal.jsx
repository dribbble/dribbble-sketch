const React = require('react')
const _ = require('../../library/utils')
const Header = require('../header/Header.jsx')
const Preview = require('./Preview.jsx')
const Form = require('./Form.jsx')
const AccountSelector = require('./AccountSelector.jsx')

module.exports = class ShareModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      headerType: 'share',
      status: 'loading',
      submitting: false,
      imageData: null,
      selectedAccount: null,
      shotUrl: null
    }
  }

  dismissDialog() {
    _.sendMessage('closeBrowser')
  }

  setDialogHeight() {
    setTimeout(() => {
      _.sendMessage('setBrowserSize', { height: this.refs.container.clientHeight })
    })
  }

  componentDidMount() {
    _.trackPage({ path: 'share' })

    this.setDialogHeight()

    if (!this.props.user) {
      _.trackEvent('user-request-start')

      const requestHeaders = new Headers()
      requestHeaders.append('Authorization', `Bearer ${this.props.auth}`)

      fetch(`${_.config.apiUrl}/user`, {
        method: 'GET',
        headers: requestHeaders
      }).then((response) => {
        if (response.status !== 200) {
          _.trackEvent('user-request-failure', response)
          return this.showError(response)
        }

        _.trackEvent('user-request-success')
        response.json().then((user) => {
          let userData = {
            id: user.id,
            name: user.name,
            login: user.login,
            pro: user.pro || false,
            avatar_url: user.avatar_url,
            teams: user.teams || {}
          }

          this.setState({ user: userData })
          _.sendMessage('saveUserDetails', { user: userData })
        })
      })
    } else {
      this.setUpContents()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.status === 'loading' && this.state.status !== 'error') {
      this.setUpContents()
    }
  }

  setUpContents() {
    _.pluginActions.receiveSelectionImage = ({ imageData }) => {
      this.setState({
        status: 'ready',
        imageData: imageData
      })

      this.setDialogHeight()
    }

    _.sendMessage('requestSelectionImage')
  }

  submitShot() {
    _.trackEvent('submit-shot-start')
    this.setState({ submitting: true })

    const formData = new FormData(this.refs.shotForm.refs.shotForm)
    formData.set('tags', formData.get('tags').split(','))
    const imageBlob = _.b64toBlob(this.state.imageData, 'image/png')
    formData.append('image', imageBlob)

    const requestHeaders = new Headers()
    requestHeaders.append('Authorization', `Bearer ${this.props.auth}`)

    fetch(`${_.config.apiUrl}/shots`, {
      method: 'POST',
      headers: requestHeaders,
      body: formData
    }).then((response) => {
      if (response.status === 202) {
        const splitUrl = response.headers.get('location').split('/')
        const shotUrl = `${_.config.siteUrl}/shots/${splitUrl[splitUrl.length - 1]}`

        this.setState({
          headerType: 'success',
          status: 'success',
          shotUrl: shotUrl
        })

        _.trackEvent('submit-shot-success', {
          shotUrl: shotUrl
        })

        this.setDialogHeight()
      } else {
        try {
          response.json().then((data) => {
            if (data.errors && data.errors[0].message.includes('daily limit')) {
              _.trackEvent('max-daily-limit')

              this.setState({
                headerType: 'error',
                status: 'limit'
              })

              this.setDialogHeight()
            } else {
              _.trackEvent('submit-shot-error', data)
              this.showError(data)
            }
          })
        } catch(error) {
          _.trackEvent('submit-shot-error', error)
          this.showError(error)
        }
      }
    }).catch(this.showError.bind(this))
  }

  showError(error) {
    console.log(error)

    this.setState({
      headerType: 'error',
      status: 'error'
    })

    this.setDialogHeight()
  }

  setTitleState(input) {
    const value = input.target ? input.target.value : input
    this.setState({
      title: value
    })
  }

  selectedAccountChanged(selectedAccount) {
    this.setState({
      selectedAccount: selectedAccount
    })
  }

  launchShot() {
    _.sendMessage('openURL', { url: this.state.shotUrl })
  }

  launchContact() {
    _.sendMessage('openURL', { url: `${_.config.siteUrl}/contact` })
  }

  render() {
    const user = this.props.user || this.state.user

    switch(this.state.status)  {
    case 'loading':
      var view = (
        <div className="loading-container">
          <img className="loading-image" src="../web/images/processing.gif" />
        </div>
      )
      break
    case 'success':
      var view = (
        <div id="share-results-container">
          <div className="body-container">
            <p className="shot-success">Your shot has been posted!</p>

            <Preview
              imageData={this.state.imageData}
              width={this.props.selection.frame.width}
              height={this.props.selection.frame.height}
            />
          </div>

          <footer id="close-footer">
            <div className="spacer"></div>
            <button className="adtl" onClick={this.launchShot.bind(this)}>Open in Browser</button>
            <button className="cta" onClick={this.dismissDialog.bind(this)}>Okay</button>
          </footer>
        </div>
      )
      break
    case 'error':
      var view = (
        <div id="share-results-container">
          <div className="body-container">
            <p>
              Something went wrong on our end. You might want to try again.
              If this issue continues please contact us.
            </p>
          </div>

          <footer id="close-footer">
            <div className="spacer"></div>
            <button className="adtl" onClick={this.launchContact.bind(this)}>Contact Support</button>
            <button className="cta" onClick={this.dismissDialog.bind(this)}>Okay</button>
          </footer>
        </div>
      )
      break
    case 'limit':
      var view = (
        <div id="share-results-container">
          <div className="body-container">
            <p>Sorry, you've reached your daily shot limit! Please try posting again tomorrow.</p>
          </div>

          <footer id="close-footer">
            <div className="spacer"></div>
            <button className="cta" onClick={this.dismissDialog.bind(this)}>Okay</button>
          </footer>
        </div>
      )
      break
    case 'ready':
      var view = (
        <div>
          <Form
            ref="shotForm"
            selection={this.props.selection}
            selectedAccount={this.state.selectedAccount}
            setTitleState={this.setTitleState.bind(this)}
            submitShot={this.submitShot.bind(this)}
            preview={(
            <Preview
              imageData={this.state.imageData}
              width={this.props.selection.frame.width}
              height={this.props.selection.frame.height}
            />
          )} />

          <footer>
            <AccountSelector user={user} selectedAccountChanged={this.selectedAccountChanged.bind(this)} />
            <div className="spacer"></div>
            <button onClick={this.dismissDialog.bind(this)} className="adtl">Cancel</button>
            { this.state.submitting ? (
              <div className="loading-button">
                <img src="../web/images/processing.gif" />
                <span className="default-cursor">Hold tight!</span>
              </div>
            ) : (
              <button onClick={this.submitShot.bind(this)} disabled={!this.state.title} className="cta">Share to Dribbble</button>
            ) }
          </footer>
        </div>
      )
      break
    }

    return (
      <div id="share-sheet" ref="container">
        <Header type={this.state.headerType} />
        {view}
      </div>
    )
  }
}
