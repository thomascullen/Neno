'use strict';
const React = require('react');
const classNames = require('classnames');
const ipcRenderer = electron.ipcRenderer;

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.editor = CodeMirror(this.refs.editor, {
      mode: 'markdown-extended',
      autofocus: true,
      lineWrapping: true,
    });

    ipcRenderer.on('open', function(event, content) {
      this.setContent(content);
    }.bind(this));

    ipcRenderer.on('save', function(e) {
      ipcRenderer.send('save', this.getContent());
    }.bind(this));
  }

  getContent() {
    return this.editor.getValue();
  }

  setContent(content) {
    this.editor.setValue(content);
  }

  className() {
    return classNames(
      "editor",
      { "editor--open": this.props.visible }
    )
  }

  render() {
    return <div ref="editor" className={this.className()} />
  }
}

module.exports = Editor;
