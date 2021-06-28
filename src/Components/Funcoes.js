/* eslint-disable no-control-regex */
import { notification } from 'antd';

export const notificationSuccess = descricao => {
  notification["success"]({
    message: "Sucesso",
    description: descricao,
    duration: null
  });
};

export const notificationError = descricao => {
  notification["error"]({
    message: "Erro",
    description: descricao,
    duration: null
  });
};

export const formatDateBR = (data) => {
  let _data = data.split("-");
  return _data[2] + "/" + _data[1] + "/" + _data[0];
}

export const formatDateDB = (data) => {
  let _data = data.split("/");
  return _data[2] + "-" + _data[1] + "-" + _data[0];
}