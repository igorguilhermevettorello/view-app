/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Spin, Row, Col } from 'antd';
import Http from "../../Components/Http";
import { notificationError, notificationSuccess } from "../../Components/Funcoes";
import { useHistory, useParams } from "react-router-dom";

const SociosFormulario = (props) => {
  let history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [keyFomulario, setKeyFomulario] = useState(1);
  const [dados, setDados] = useState({
    Id: "",
    Codigo: "",
    Nome: ""
  });

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      getSocio(id);
    }
  },[]);

  const getSocio = (id) => {

    setLoading(true);
    let url = `/socio/${id}`;
    Http({
      method: "GET",
      url: url,
    }).then((result) => {
      setLoading(false);
      let _dados = result.data;
      _dados.Codigo = _dados.Id.toString().padStart(10, "0");
      setDados(_dados);
      setKeyFomulario(Math.random());
      form.setFieldsValue(_dados);
    }).catch((error) => {
      setLoading(false);
      alertMessage();
    });
  }

  const alertMessage = () => {
    notificationError("Falha durante o processo. Entre em contato com o Administrador.");
  }

  const onFinish = formulario => {
    let _method = `POST`;
    let _url = `/socio`;
    if (formulario.Id !== "") {
      _method = `PUT`;
      _url = `/socio/${formulario.Id}`;
    }

    setLoading(true);
    Http({
      method: _method,
      url: _url,
      data: {
        Nome: formulario.Nome,
      }
    }).then((result) => {
      setLoading(false);
      let _dados = result.data.socio;
      _dados.Codigo = _dados.Id.toString().padStart(10, "0");
      setDados(_dados);
      setKeyFomulario(Math.random());
      form.setFieldsValue(_dados);
      notificationSuccess("Dados atualizados com sucesso.");
      history.push(`/socio/${_dados.Id}`);
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

  const validaCampoNome = (rule, value, callback) => {
    return new Promise((resolve, reject) => {
      if (typeof value !== "undefined" && value !== null && value.trim() !== "") {
        resolve();
      } else {
        reject(`Por favor preencha o campo, nome é obrigatório.`);
      }
    });
  };

  const handleCancel = () => {
    history.push(`/`);
  }

  const handleClean = (event) => {
    event.preventDefault();

    let dados = {
      Id: "",
      Codigo: "",
      Nome: "",
    };

    setDados(dados);
    setKeyFomulario(Math.random());
    form.setFieldsValue(dados);
    history.push(`/socio`);
  }

  const enableButton = () => {
    return (dados.id === "");
  }

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{
          Id: dados.Id,
          Codigo: dados.Codigo,
          Nome: dados.Nome
        }}
        key={keyFomulario}
        onFinish={onFinish}
      >
        <Row gutter={0} type="flex">
          <Form.Item name="Id" hidden>
            <Input type="hidden" />
          </Form.Item>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <label className="label-formulario">Código</label>
            <Form.Item name="Codigo">
              <Input type="text" disabled={true} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <label className="label-formulario">Nome</label>
            <Form.Item name="Nome" rules={[{ validator: validaCampoNome }]} >
              <Input type="text" placeholder="Preencha o campo" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div>
              <Row gutter={0} type="flex">
                <Col xs={0} sm={0} md={15} lg={15} xl={15}></Col>
                <Col xs={8} sm={8} md={3} lg={3} xl={3}>
                  <Form.Item hidden={enableButton()}>
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

export default SociosFormulario;