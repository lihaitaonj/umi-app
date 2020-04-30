/*
 * title: 写周报
 * Routes:
 *   - ./src/routes/PrivateRoute.js
 * authority: ["admin", "user"]
 */
import React, { Component } from 'react';
import { Input, Select, Button, Form, message } from 'antd';
import { Content } from '@/components/Layout';
import E from 'wangeditor';
import {connect} from 'dva';
import { router } from 'umi';

const FormItem = Form.Item;

class $id$ extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.state = {
      editorContent: null,
      editorCheck: true,
    };
    this.handleOk = this.handleOk.bind(this);
  }

  componentDidMount() {
    if(this.id) {
      this.getDatas().then(() => {
        const {content} = this.props.info;
        this.setState({
          editorContent: content
        })
        this.initEditor();
      });
    } else {
      this.initEditor();
    }
    // this.initEditor();
    this.getAllUsers();
  }
  getDatas() {
    return this.props.dispatch({
      type: "reports/fetchInfo",
      payload: this.id
    })
  }
  getAllUsers() {
    // console.log(this.props.dispatch)
    this.props
      .dispatch({
        type: 'reports/getAllUsers',
      })
      .then(res => {
        this.renderUsers();
      });
  }

  renderUsers() {
    const { allUsersList } = this.props;
    return (
      <Select placeholder="请选择接收人">
        {allUsersList.map(({ username }, index) => [
          <Select.Option key={index} value={username}>
            {username}
          </Select.Option>,
        ])}
      </Select>
    );
  }

  initEditor() {
    const editor = new E(this.refs.editorRef);
    //监听编辑器内容变换
    editor.customConfig.onchange = html => {
      let editorCheck = true;
      if (!html || html === '<p><br></p>') {
        editorCheck = false;
      }
      this.setState({
        editorContent: html,
        editorCheck: editorCheck,
      });
    };
    editor.create();
  }

  handleOk() {
    const { editorContent, editorCheck } = this.state;
    this.props.form.validateFields((err, values) => {
      if(!err) {
        //校验富文本
        if(editorCheck && editorContent) {
          this.props.dispatch({
            type: this.id ? "reports/update" : "reports/add",
            payload: {...values, content: editorContent, id: this.id}
          }).then(res => {
            if(res && res.state === "success") {
              message.success(res.msg || "周报提交成功")
              router.push("/reports")
            } else {
              message.error(res.msg || "周报提交失败")
            }
          })
        } else {
          this.setState({
            editorCheck: false
          })
        }
      } else if (!editorCheck || !editorContent) {
        this.setState({
          editorCheck: false,
        });
      }
    })
  }

  render() {
    const { form, loading } = this.props;
    const { editorCheck } = this.state;
    const { title, receiverName, content } = this.props.info;
    return (
      <Content style={{ textAlign: 'left' }}>
        <Form>
          <FormItem label="标题">
            {form.getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '周报标题不能为空',
                },
              ],
              initialValue: title,
            })(<Input placeholder="请输入周报标题" />)}
          </FormItem>
          <FormItem label="接收人">
            {form.getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '接收人不能为空',
                },
              ],
              initialValue: receiverName,
            })(this.renderUsers())}
          </FormItem>
          <FormItem label="内容" required>
            <div ref="editorRef" style={!editorCheck ? { border: '1px solid red' } : {}}
            dangerouslySetInnerHTML={{__html: content}}/>
            {!editorCheck ? <p style={{ color: 'red' }}>内容不能为空</p> : ''}
          </FormItem>
          <FormItem>
            <Button>取消</Button>
            <Button onClick={this.handleOk} type="primary" loading={loading}>
              提交
            </Button>
          </FormItem>
        </Form>
      </Content>
    );
  }
}
export default connect(({ reports, loading }) => ({
  ...reports,
  loading: loading.effects['reports/add'],
}))(Form.create()($id$));
