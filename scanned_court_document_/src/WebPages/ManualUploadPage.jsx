import React, { Component } from 'react';
import RichTextEditor from '../Components/RichTextEditor'
class ManualUploadPage extends Component {
    state = {  }
    render() { 
        return (  
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <RichTextEditor></RichTextEditor>
                    </div>
                    <div className="col-6">Show PDF file in here</div>
                </div>
            </div>
        );
    }
}
 
export default ManualUploadPage;