import React from 'react';
import ReactDOM from 'react-dom';
import { Upload, Icon, Modal } from 'antd';
import Interface from '../common/interface';
import './pictureWall.css'
import { file } from 'babel-types';

class PicturesWall extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: []
        };
        this.handleCancel = () => this.setState({ previewVisible: false });
        this.handlePreview = (file) => {
            this.setState({
                previewImage: file.url || file.thumbUrl,
                previewVisible: true
            });
        }
        this.handleChange = ({ fileList }) => this.setState({ fileList });
        this.getListImage();
    }

    getListImage(){
        Interface.getImageList().then((res) => {
            let urls = res.data;
            this.getFileList(urls);
        });
    }

    getFileList(urls){
        let fileList = [];
        for(let i=0;i<urls.length;i++){
            fileList.push({
                uid: i + 'file',
                name: "",
                status: 'loading',
                url: urls[i]
            })
        }
        this.setState({
            fileList: fileList
        })
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/image/post"
                    listType="picture-card"
                    fileList={fileList}
                    multiple={true}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default PicturesWall;