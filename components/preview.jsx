'use strict';
const React = require('react');
const classNames = require('classnames');
const markdown = require('marked');
markdown.setOptions({
  breaks: true,
});

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.parse = this.parse.bind(this);
    this.previewHTML = this.previewHTML.bind(this);
  }

  parse() {
    const content = this.props.getContent();
    if (content) { return markdown(content); }
  }

  previewHTML() {
    return { __html: this.parse() };
  }

  className() {
    return classNames(
      "preview",
      { "preview--open": this.props.visible }
    )
  }

  render() {
    return <div ref="preview" className={this.className()} dangerouslySetInnerHTML={this.previewHTML()} />
  }
}

module.exports = Preview;
