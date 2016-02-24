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
    this.scrollTop = this.scrollTop.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
  }

  parse() {
    const content = this.props.getContent();
    if (content) { return markdown(content); }
  }

  previewHTML() {
    return { __html: this.parse() };
  }

  scrollTop() {
    return this.refs.preview.scrollTop();
  }

  scrollTo(top) {
    this.refs.preview.scrollTop = top;
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
