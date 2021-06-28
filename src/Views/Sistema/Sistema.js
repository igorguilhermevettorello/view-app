/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { PageHeader } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';


const Sistema = (props) => {

  let teste = props.title;

  const menuClube = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/clube">Cadastrar</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/clubes">Listar</Link>
      </Menu.Item>
    </Menu>
  );

  const menuSocio = (
    <Menu>
      <Menu.Item key="2">
        <Link to="/socio">Cadastrar</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/socios">Listar</Link>
      </Menu.Item>
    </Menu>
  );

  const menuSocioClube = (
    <Menu>
      <Menu.Item key="4">
        <Link to="/socioclube">Cadastrar</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        title="Sistema"
        subTitle={teste}
        extra={[
          <Dropdown overlay={menuClube} trigger={['click']} key="d0">
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Clubes <DownOutlined />
            </a>
          </Dropdown>,
          <Dropdown overlay={menuSocio} trigger={['click']} key="d1">
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Sócios <DownOutlined />
            </a>
          </Dropdown>,
          <Dropdown overlay={menuSocioClube} trigger={['click']} key="d2">
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Sócio Clube <DownOutlined />
            </a>
          </Dropdown>
        ]}
      >
        <div size="small" className="site-page-content">
          <div>{props.children}</div>
        </div>
      </PageHeader>
    </div>
  );
}

export default Sistema;