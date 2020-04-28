/*
 * title: 用户
 */
import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { Content, Tool } from '@/components/Layout';
import Table from '@/components/Table';
import { connect } from 'dva';
import UserModal from './components/UserModal';

// import { fetch } from './services/users';

const index = ({list, dispatch, loading, addLoading, page, pageSize, total}) => {
  // fetch().then(res => console.log(res));
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: '25%',
    },
    {
      title: '姓名',
      dataIndex: 'nickname',
      key: 'nickname',
      width: '25%',
    },
    {
      title: '用户类型',
      dataIndex: 'type',
      key: 'type',
      width: '25%',
      render: text => <span>{text === '0' ? '管理员' : '普通用户'}</span>,
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <div>
          <UserModal title="编辑用户" record={record} onOk={values => handleEdit(record.id, values)}>
            <a>编辑</a>
          </UserModal>
          <Popconfirm title="确定要删除该用户吗？" onConfirm={() => handleRemove(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const reload = pageNum => {
    dispatch({ type: 'users/fetch', payload: { page: pageNum } });
  }
  const handleSubmit = (values) => {
    // console.log(values);
    return dispatch({type: "users/add", payload: values}).then( res => {
      if(res && res.state === 'success') {
        message.success(res.msg);
        reload(1);
        return res;
      } else {
        message.error("添加用户失败");
      }
    })
  }
  const handleEdit = (id, values) => {
    return dispatch({ type: 'users/edit', payload: {id, values}}).then(res => {
      if (res && res.state === 'success') {
        message.success(res.msg || "编辑用户成功");
        reload(1);
        return res;
      } else {
        message.error('编辑用户失败');
      }
    });
  }
  const handleRemove = id => {
    dispatch({ type: 'users/remove', payload: id }).then(res => {
      if (res && res.state === 'success') {
        message.success(res.msg || '删除用户成功');
        reload(1);
        return res;
      } else {
        message.error('删除用户失败');
      }
    });
  }
  const handleChange = pageNum => {
    if (page !== pageNum) reload(pageNum);
  }
  return (
    <Content>
      <Tool>
        <UserModal onOk={handleSubmit} addLoading={addLoading}>
          <Button type="primary" >添加用户</Button>
        </UserModal>
      </Tool>
      <Table
        columns={columns}
        dataSource={list}
        rowKey={(list, index) => list.id}
        loading={loading}
        pagination={{
          current: page,
          pageSize,
          total,
          onChange: handleChange
        }}></Table>
    </Content>
  )
}
export default connect(({ users, loading }) => ({
  ...users,
  loading: loading.effects['users/fetch'],
  addLoading: loading.effects['users/add']
}))(index);
