import React from 'react'
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
    }

    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }

  onChange = (editorState) => {
    this.setState({
      editorState 
    }) 
    var editorStateText ='';
    convertToRaw(editorState.getCurrentContent()).blocks.map(block => {editorStateText += block.text + '\n'});
    this.props.editorStateChangeHandler(editorStateText);
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }

  onItalicClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  }


  render() {
    return(
      <div className="editorContainer mt-2">
        <button onClick={this.onUnderlineClick}>U</button>
        <button onClick={this.onBoldClick}><b>B</b></button>
        <button onClick={this.onItalicClick}><em>I</em></button>        
        <div style={styles.editor} onClick={this.focusEditor}>
          <Editor 
            className="text-left"
            ref={this.setEditor}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange= { this.onChange }
            placeholder="Type your document in here..."
            />
          </div>
      </div>
    )
  }
}

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '20em',
  }
};

export default RichTextEditor
