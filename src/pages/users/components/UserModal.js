import React, { Component } from 'react';
import { Modal, Form, Input, Radio, message } from 'antd';
import { widthClick } from '@/utils/hoc';
// import { connect } from 'dva';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

//表单单排格式
const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14}
}

class userModal extends Component {
  state = {
    visible: false,
  };
  handleOpenClick = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handleOk = () => {
    //form 表单校验
    this.props.form.validateFields((err, values) => {
      if(!err) {

        //请求 save
        this.props.onOk(values).then(res => {
          if (res && res.state === 'success') {
            //关闭弹窗
            this.handleCancel();
          } else {
            message.error(res ? res.msg : "添加用户失败！");
          }
        });
      }
    })
  }
  render() {
    const { visible } = this.state;
    const { children, form, addLoading, title, record } = this.props;
    return (
      <>
        {widthClick(children, this.handleOpenClick)}
        <Modal
          title={title}
          visible={visible}
          centered={true}
          maskClosable={false}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          confirmLoading={addLoading}
        >
          <Form>
            <FormItem label="用户名" {...formItemLayout}>
              {form.getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '用户名不能为空',
                  },
                ],
                initialValue: record.username,
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem label="姓名" {...formItemLayout}>
              {form.getFieldDecorator('nickname', {
                rules: [
                  {
                    required: true,
                    message: '姓名不能为空',
                  },
                ],
                initialValue: record.nickname,
              })(<Input placeholder="请输入姓名" />)}
            </FormItem>
            <FormItem label="用户类型" {...formItemLayout}>
              {form.getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: '用户类型不能为空',
                  },
                ],
                initialValue: record.type || '1',
              })(
                <RadioGroup>
                  <Radio value={'0'}>管理员</Radio>
                  <Radio value={'1'}>普通用户</Radio>
                </RadioGroup>,
              )}
            </FormItem>
          </Form>
        </Modal>
      </>
    );
  }
}

userModal.defaultProps = {
  title: '添加用户',
  record: {username: '', nickname: '', type: '1'},
};

export default Form.create()(userModal);
