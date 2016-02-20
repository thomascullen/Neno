'use strict';

const React = require('react');
const Editor = require('./editor.jsx');
const Preview = require('./preview.jsx');
const ipcRenderer = electron.ipcRenderer;

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = { previewing: false }
    this.getContent = this.getContent.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('togglePreview', function(event, content) {
      this.togglePreview();
    }.bind(this));
  }

  getContent() {
    if (this.refs.editor) {
      return this.refs.editor.getContent();
    }
  }

  togglePreview() {
    this.setState({ previewing: !this.state.previewing });
  }

  render() {
    return (
      <div className="application">
        <Editor
          ref="editor"
          visible={!this.state.previewing}
        />

        <Preview
          ref="preview"
          getContent={this.getContent}
          visible={this.state.previewing}
        />
      </div>
    )
  }
}

module.exports = Application;
