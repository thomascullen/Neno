CodeMirror.defineSimpleMode("markdown-extended-simple", {
	// The start state contains the rules that are intially used
	start: [
		{ regex: /#{1,6}\s/, sol: true, token: "markdown-header" },
    { regex: /```.*/, sol: true, token: 'markdown-code' },
		{ regex: /`.+`/, token: "markdown-code-span" },
		{ regex: /-\s/, sol: true, token: "markdown-list" },
		{ regex: /\d+\.\s/, sol: true, token: "markdown-list" },
		{ regex: /\[.+\]/, token: "link" },
	],
});

CodeMirror.defineMode("markdown-extended", function(config, parserConfig) {
  const gfm = CodeMirror.getMode(config, "gfm");
  const markdownExtended = CodeMirror.getMode(config, "markdown-extended-simple");
  return CodeMirror.overlayMode(gfm, markdownExtended);
});
