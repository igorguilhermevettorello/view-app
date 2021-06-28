// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Sistema from "../Views/Sistema/Sistema";
import ClubesFormulario from "../Views/Clubes/Formulario";
import ClubesLista from "../Views/Clubes/Lista";
import SociosFormulario from "../Views/Socios/Formulario";
import SociosLista from "../Views/Socios/Lista";
import SocioClubeFormulario from "../Views/SocioClube/Formulario";

const Routers = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" key="0" exact>
        <Sistema key="s0" title={"Bem vindo ao sistema"}>
        </Sistema>
      </Route>

      <Route path="/clube" key="1" exact>
        <Sistema key="s1" title={"Cadastrar de clube"}>
          <ClubesFormulario />
        </Sistema>
      </Route>

      <Route path="/clube/:id" key="2" exact>
        <Sistema key="s2" title={"Alterar clube"}>
          <ClubesFormulario />
        </Sistema>
      </Route>

      <Route path="/clubes" key="3" exact>
        <Sistema key="s3" title={"Listagem de clubes"}>
          <ClubesLista />
        </Sistema>
      </Route>

      <Route path="/socio" key="4" exact>
        <Sistema key="s4" title={"Cadastrar de sócio"}>
          <SociosFormulario />
        </Sistema>
      </Route>

      <Route path="/socio/:id" key="5" exact>
        <Sistema key="s5" title={"Alterar sócio"}>
          <SociosFormulario />
        </Sistema>
      </Route>

      <Route path="/socios" key="6" exact>
        <Sistema key="s6" title={"Listagem de sócios"}>
          <SociosLista />
        </Sistema>
      </Route>

       <Route path="/socioclube" key="7" exact>
        <Sistema key="s7" title={"Sócio clube"}>
          <SocioClubeFormulario />
        </Sistema>
      </Route>

    </Switch>
  </BrowserRouter>
);


export default Routers;