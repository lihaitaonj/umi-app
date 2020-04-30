import React from 'react';
import { Row, Col, Card, Pagination, Tooltip, Icon, Popconfirm, message } from 'antd';
import {connect} from 'dva';

const List = ({ list, page, pageSize, total, dispatch }) => {
  const colSpan = { xl: 6, xxl: 4, span: 6 };
  const handleChange = pageNum => {
    if (pageNum !== page) {
      reload(pageNum);
    }
  };
  const handleDelete = id => {
    dispatch({type: "reports/remove", payload: id}).then(res => {
      if(res && res.state === "success") {
        message.success(res.msg || "周报删除成功！");
        reload(1);
      } else {
        message.error(res.msg || "周报删除失败！");
      }
    })
  }
  const reload = pageNum => {
    dispatch({type: 'reports/fetch', payload: {page: pageNum}});
  };
  return (
    <div>
      <Row gutter={20}>
        {list.map(item => (
          <Col key={item.id} {...colSpan}>
            <Card
              title={item.createTime}
              extra={
                <>
                  <Tooltip placement="top" title="编辑">
                    <a href={`/reports/write/${item.id}`}>
                      <Icon type="form" />
                    </a>
                  </Tooltip>
                  <Popconfirm title="确认要删除周报吗？" onConfirm={handleDelete(item.id)}>
                    <Tooltip placement="top" title="编辑">
                      <Icon type="delete" />
                    </Tooltip>
                  </Popconfirm>
                </>
              }
            >
              <p>{item.title}</p>
              <p>接收人：{item.receiverName}</p>
            </Card>
          </Col>
        ))}
      </Row>
      {list.length ? (
        <Pagination current={page} pageSize={pageSize} total={total} onChange={handleChange} />
      ) : (
        ''
      )}
    </div>
  );
};
export default connect(({reports}) => ({...reports}))(List);
