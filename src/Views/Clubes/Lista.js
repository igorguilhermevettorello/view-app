/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, FormOutlined, DeleteOutlined, LockOutlined, FileImageOutlined } from '@ant-design/icons';
import Http from "../../Components/Http";
import { useHistory } from "react-router-dom";
import { notificationError, notificationSuccess, formatDateBR } from "../../Components/Funcoes";
const { confirm } = Modal;

const ClubesLista = () => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getClubes();
  },[]);

  const getClubes = Id => {
    setLoading(true);
    Http({
      method: "GET",
      url: "/clube"
    }).then((result) => {
      let _dados = result.data.map(item => {
        return {
          Id: item.Id,
          Codigo: item.Id.toString().padStart(10, "0"),
          Nome: item.Nome
        }
      });
      setData(_dados);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      alertMessage();
    });
  }

  const actDeletarClube = id => {
    console.log("id", id);

    setLoading(true);
    let url = `/clube/${id}`;
    Http({
      method: "DELETE",
      url: url,
    }).then((result) => {
      setLoading(false);
      notificationSuccess("Registro excluido com sucesso.");
      let dados = [...data];
      dados = dados.filter(item => item.Id !== id).map(item => item);
      setData(dados);
    }).catch((error) => {
      setLoading(false);
      alertMessage();
    });
  }

  const alertMessage = () => {
    notificationError("Falha durante o processo. Entre em contato com o Administrador.");
  }

  /****************************************************************************/
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            setSearchInput(node);
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Limpar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => console.log(searchInput));
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText("");
  }

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo({ filteredInfo: filters });
  };

  const strcmp = (a, b) => {
    if (a.toString() < b.toString()) return -1;
    if (a.toString() > b.toString()) return 1;
    return 0;
  }

  const editarClube = (id) => {
    history.push(`/clube/${id}`);
  }

  const deletarClube = (id) => {
    confirm({
      title: 'Deletar clube',
      content: 'Você deseja excluir esse clube?',
      onOk() {
        actDeletarClube(id);
      },
      onCancel() {},
    });
  }

  const columns = [
    {
      title: 'Opçoes',
      dataIndex: 'Id',
      key: 'Id',
      width: '10%',
      render: (Id, item) => {
        return (
          <div>
            <Button
              type="primary"
              icon={<FormOutlined />}
              onClick={() => editarClube(Id)}></Button>

            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => deletarClube(Id)}></Button>
          </div>
        )
      }
    },
    {
      title: 'Código',
      dataIndex: 'Codigo',
      key: 'Codigo',
      width: '10%',
      sorter: {
        compare: (a, b) => {
          return strcmp(a.Codigo, b.Codigo)
        }
      },
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Nome',
      dataIndex: 'Nome',
      key: 'Nome',
      width: '80%',
      ...getColumnSearchProps('Nome'),
      sorter: {
        compare: (a, b) => {
          return strcmp(a.Nome, b.Nome)
        }
      },
      sortDirections: ['descend', 'ascend']
    }
  ];

  return <Table
    loading={loading}
    columns={columns}
    dataSource={data}
    onChange={handleChange}
    pagination={{ pageSize: 10 }}
    size="small"/>;
}

export default ClubesLista;