const React = require('react')
const _ = require('../../library/utils')
const Header = require('../header/Header.jsx')
const Preview = require('./Preview.jsx')
const Form = require('./Form.jsx')

module.exports = class ShareModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      imageData: null,
      submitting: false,
    }
  }

  componentDidMount() {
    _.pluginActions.receiveSelectionImage = ({ imageData }) => {
      this.setState({
        loading: false,
        imageData: imageData
      })

      setTimeout(() => {
        _.sendMessage('setBrowserSize', { height: this.refs.container.clientHeight })
      })
    }

    _.sendMessage('requestSelectionImage')
  }

  dismissDialog() {
    _.sendMessage('closeBrowser')
  }

  submitShot() {
    let formData = _.serialize(this.refs.shotForm, { hash: true })
    this.setState({ submitting: true })
    console.log(formData)
  }

  render() {
    return (
      <div id="share-sheet" ref="container">
        <Header type="share" />

        { this.state.loading ? (
          <div className="loading-container">
            <img className="loading-image" src="../web/images/processing.gif" />
          </div>
        ) : (
          <div>
            <Form ref="shotForm" selection={this.props.selection} preview={(
              <Preview
                imageData={this.state.imageData}
                width={this.props.selection.frame.width}
                height={this.props.selection.frame.height}
              />
            )} />

            <footer>
              <div className="spacer"></div>
              <button onClick={this.dismissDialog.bind(this)} className="adtl">Cancel</button>
              { this.state.submitting ? (
                <div className="loading-button">
                  <img src="../web/images/processing.gif" />
                  <span className="default-cursor">Hold tight!</span>
                </div>
              ) : (
                <button onClick={this.submitShot.bind(this)} className="cta">Share to Dribbble</button>
              ) }
            </footer>
          </div>
        ) }
      </div>
    )
  }
}
