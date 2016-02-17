'use strict';
const ace = require('brace');
const React = require('react');
const markdown = require('marked');
const ipcRenderer = electron.ipcRenderer;
require('brace/mode/markdown');

markdown.setOptions({
  breaks: true,
});

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { preview: '' }
    this.onChange = this.onChange.bind(this);
    this.setContent = this.setContent.bind(this);
  }

  componentDidMount() {
    this.editor = ace.edit(this.refs.editor);
    this.editor.getSession().setMode('ace/mode/markdown');
    this.editor.on('change', this.onChange);
    this.editor.focus();

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

  onChange() {
    const value = this.editor.getValue();
    this.preview(value);
  }

  preview(content) {
    this.setState({ preview: markdown(content) });
  }

  previewHTML() {
    return { __html: this.state.preview };
  }

  render() {
    return (
      <div>
      <div ref="editor" className="editor" />
      <div ref='preview' className='preview' dangerouslySetInnerHTML={this.previewHTML()}/>
      </div>
    )
  }
}

module.exports = Editor;
