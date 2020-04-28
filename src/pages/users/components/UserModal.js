import React, { Component } from 'react';
import { Modal, Form, Input, Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

//表单单排格式
const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14}
}

//克隆子元素button 并且添加事件 HOC: higher order components
const widthClick = (element, handleClick = () => {}) => {
  return <element.type {...element.props} onClick={handleClick} />
}

class userModal extends Component {
  state = {
    visible: false
  }
  handleOpenClick = () => {
    this.setState({
      visible: true
    })
  }
  render() {
    const {visible} = this.state;
    const {children} = this.props;
    return (
      <>
        {widthClick(children, this.handleOpenClick)}
        <Modal title="添加用户" visible={visible} centered={true} maskClosable={true}>
          <Form>
            <FormItem label="用户名" {...formItemLayout}>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem label="姓名" {...formItemLayout}>
              <Input placeholder="请输入姓名" />
            </FormItem>
            <FormItem label="用户类型" {...formItemLayout}>
              <RadioGroup>
                <Radio value={'0'}>管理员</Radio>
                <Radio value={'1'}>普通用户</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </Modal>
      </>
    );
  }
}

export default userModal;
