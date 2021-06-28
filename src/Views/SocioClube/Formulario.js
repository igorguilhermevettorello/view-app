/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { Form, Button, Spin, Row, Col, Select } from 'antd';
import Http from "../../Components/Http";
import { notificationError, notificationSuccess } from "../../Components/Funcoes";
import { useHistory } from "react-router-dom";

const { Option } = Select;

const SocioClubeFormulario = (props) => {
  let history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [keyFomulario, setKeyFomulario] = useState(1);
  const [dados, setDados] = useState({
    SocioId: "",
    ClubeId: ""
  });

  const [socios, setSocios] = useState([]);
  const [clubes, setClubes] = useState([]);

  useEffect(() => {
    getSocios();
    getClubes();
  },[]);

  const getSocios = () => {
    setLoading(true);
    Http({
      method: "GET",
      url: "socio",
    }).then((result) => {
      setLoading(false);
      setSocios(result.data);
      setKeyFomulario(Math.random());
    }).catch((error) => {
      setLoading(false);
      alertMessage();
    });
  }

  const getClubes = () => {
    setLoading(true);
    Http({
      method: "GET",
      url: "clube",
    }).then((result) => {
      setLoading(false);
      setClubes(result.data);
      setKeyFomulario(Math.random());
    }).catch((error) => {
      setLoading(false);
      alertMessage();
    });
  }

  const alertMessage = () => {
    notificationError("Falha durante o processo. Entre em contato com o Administrador.");
  }

  const onFinish = formulario => {
    setLoading(true);
    Http({
      method: `POST`,
      url: `/socioclube`,
      data: {
        SocioId: formulario.SocioId,
        ClubeId: formulario.ClubeId
      }
    }).then((result) => {
      setLoading(false);
      let _dados = result.data;
      setDados(_dados);
      setKeyFomulario(Math.random());
      form.setFieldsValue(_dados);
      history.push(`/socios`);
      notificationSuccess("Dados atualizados com sucesso.");

    }).catch((error) => {
      setLoading(false);
      if (typeof error.response.data != "undefined" && Array.isArray(error.response.data)) {
        error.response.data.map(item => {
          form.setFields([
            {name: item.campo, errors:[item.descricao]}
          ]);
        });
      } else {
        alertMessage();
      }
    });
  };

  const validaCampoSocio = (rule, value, callback) => {
    return new Promise((resolve, reject) => {
      if (typeof value !== "undefined" && value !== null && value !== "") {
        resolve();
      } else {
        reject(`Por favor preencha o campo, sócio é obrigatório.`);
      }
    });
  };

  const validaCampoClube = (rule, value, callback) => {
    return new Promise((resolve, reject) => {
      if (typeof value !== "undefined" && value !== null && value !== "") {
        resolve();
      } else {
        reject(`Por favor preencha o campo, clube é obrigatório.`);
      }
    });
  };

  const handleCancel = () => {
    history.push(`/`);
  }

  const handleClean = (event) => {
    event.preventDefault();

    let dados = {
      SocioId: "",
      ClubeId: ""
    };

    setDados(dados);
    setKeyFomulario(Math.random());
    form.setFieldsValue(dados);

    history.push(`/socioclube`);
  }

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{
          SocioId: dados.SocioId,
          ClubeId: dados.ClubeId
        }}
        key={keyFomulario}
        onFinish={onFinish}
      >
        <Row gutter={0} type="flex">
          {/* <Form.Item name="id" hidden>
            <Input type="hidden" />
          </Form.Item>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <label className="label-formulario">Código</label>
            <Form.Item name="codigo">
              <Input type="text" disabled={true} />
            </Form.Item>
          </Col> */}

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <label className="label-formulario">Sócio</label>
            <Form.Item name="SocioId" rules={[{ validator: validaCampoSocio }]} >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Selecione"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {socios.map(socio => (
                  <Option value={socio.Id} key={socio.Id}>{socio.Nome}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <label className="label-formulario">Clube</label>
            <Form.Item name="ClubeId" rules={[{ validator: validaCampoClube }]} >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Selecione"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {clubes.map(clube => (
                  <Option value={clube.Id} key={clube.Id}>{clube.Nome}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div>
              <Row gutter={0} type="flex">
                <Col xs={0} sm={0} md={15} lg={15} xl={15}></Col>
                <Col xs={8} sm={8} md={3} lg={3} xl={3}>
                  <Form.Item>
                    <Button htmlType="submit" className="login-form-button" onClick={handleClean} block>
                      Limpar
                    </Button>
                  </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={3} lg={3} xl={3}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleCancel} block danger>
                      Cancelar
                    </Button>
                  </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={3} lg={3} xl={3}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" block>
                      Salvar
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}

export default SocioClubeFormulario;