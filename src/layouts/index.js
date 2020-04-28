import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Header from './Header';
import Footer from './Footer';

import './index.scss';

const { Content } = Layout;

function BasicLayout({ children, location }) {
  if (location.pathname === '/login') {
    return children;
  }
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="layout">
        <Header />
        <Content className="content">{children}</Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
}

export default BasicLayout;
