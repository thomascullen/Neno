'use strict';
const React = require('react');
const markdown = require('marked');
const ipcRenderer = electron.ipcRenderer;

markdown.setOptions({
  breaks: true,
});

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.editor = CodeMirror(this.refs.editor, {
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

  render() {
    return (
      <div>
        <div ref="editor" className='editor' />
        <div ref='preview' className='preview' />
      </div>
    )
  }
}

module.exports = Editor;
