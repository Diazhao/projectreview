//图片上传组件，上传后，展示上传的图片，上传按钮消失
import React from 'react';
import ReactDOM from 'react-dom';
import { Upload, Icon, message } from 'antd';

// function getBase64(img, callback) {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
// }

function beforeUpload(file) {
    const islmtSize = file.size/1024/1024 < 2;
    if(!islmtSize){
        message.error("图片不能超过2M");
    }
    return islmtSize;
}

class Avatar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false
        };
        this.handleChange = (info) => {
            if(info.file.status === 'uploading') {
                this.setState({loading: true});
                return;
            }
            if(info.file.status === 'done') {
                debugger;
                getBase64(info.file.originFileObj, imageUrl => this.setState({
                    imageUrl,
                    loading: false,
                }));
            }
        }
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus' } />
                <div className='ant-upload-text'>上传</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/image/post"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
        )
    }
}

// ReactDOM.render(<Avatar />);

export default Avatar;