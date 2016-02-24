'use strict';
const React = require('react');
const classNames = require('classnames');
const ipcRenderer = electron.ipcRenderer;

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
  }

  componentDidMount() {
    this.editor = CodeMirror(this.refs.editor, {
      mode: 'markdown-extended',
      autofocus: true,
      lineWrapping: true,
    });

    this.editor.on('change', this.props.onChange);

    ipcRenderer.on('setContent', function(event, content) {
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

  focus() {
    this.editor.focus();
  }

  scrollTop() {
    return this.refs.editor.scrollTop;
  }

  scrollTo(top) {
    this.refs.editor.scrollTop = top;
  }

  className() {
    return classNames(
      "editor",
      { "editor--open": this.props.visible }
    )
  }

  render() {
    return (
      <div
        ref="editor"
        onClick={this.focus}
        className={this.className()}
        onScroll={this.props.onScroll}
      />
    )
  }
}

module.exports = Editor;
