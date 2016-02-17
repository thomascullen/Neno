'use strict';

const React = require('react');
const Editor = require('./editor.jsx');

class Application extends React.Component {
  render() {
    return <Editor />
  }
}

module.exports = Application;
