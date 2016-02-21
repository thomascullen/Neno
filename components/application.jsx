'use strict';

const React = require('react');
const Editor = require('./editor.jsx');
const Preview = require('./preview.jsx');
const wordcount = require('wordcount');
const ipcRenderer = electron.ipcRenderer;

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = { previewing: false, word_count: 0 }
    this.getContent = this.getContent.bind(this);
    this.update = this.update.bind(this);
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

  update() {
    const word_count = wordcount(this.getContent());
    this.setState({ word_count });
  }

  render() {
    return (
      <div className="application">
        <Editor
          ref="editor"
          onChange={this.update}
          visible={!this.state.previewing}
        />

        <Preview
          ref="preview"
          getContent={this.getContent}
          visible={this.state.previewing}
        />

        <div className="info_bar">
          <div className="current_mode">
            {this.state.previewing ? "Preview" : "Edit"} Mode
          </div>
          <span className="wordcount">{this.state.word_count} words</span>
        </div>
      </div>
    )
  }
}

module.exports = Application;
