import React from "react";
import { withRouter } from "react-router-dom";

import "bootswatch/dist/flatly/bootstrap.css";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import UsuarioService from "../app/service/usuarioService";

import { mensagemErro } from "../components/toastr";

import { AuthContext } from "../main/provedorAutenticacao";

class Login extends React.Component {
  state = {
    email: "",
    senha: "",
    // mensagemErro: null,
  };

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  entrar = () => {
    this.service
      .autenticar({
        email: this.state.email,
        senha: this.state.senha,
      })
      .then((response) => {
        // console.log(response);
        // LocalStorageService.adicionarItem("_usuario_logado", response.data);
        // localStorage.setItem("_usuario_logado", JSON.stringify(response.data));
        this.context.iniciarSessao(response.data);
        this.props.history.push("/home");
      })
      .catch((erro) => {
        mensagemErro(erro.response.data);
        // this.setState({ mensagemErro: erro.response.data });
        // <div className="row">
        // <span>{this.state.mensagemErro}</span>
        // </div>
        // console.log(erro.response);
      });

    // console.log("Email:", this.state.email);
    // console.log("Senha:", this.state.senha);
  };

  prepareCadastrar = () => {
    this.props.history.push("/cadastro-usuarios");
  };

  render() {
    return (
      <div className="row">
        <div
          className="col-md-6"
          style={{ position: "relative", left: "300px" }}
        >
          <div className="bs-docs-section">
            <Card title="Login">
              <div className="row">
                <div className="col-lg-12">
                  <div className="bs-component">
                    <fieldset>
                      <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                        <input
                          type="email"
                          value={this.state.email}
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Digite o Email"
                        />
                      </FormGroup>
                      <FormGroup
                        label="Senha: *"
                        htmlFor="exampleInputPassword1"
                      >
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Password"
                          value={this.state.senha}
                          onChange={(e) =>
                            this.setState({ senha: e.target.value })
                          }
                        />
                      </FormGroup>

                      <button className="btn btn-success" onClick={this.entrar}>
                        <i className="pi pi-sign-in"></i> Entrar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={this.prepareCadastrar}
                      >
                        <i className="pi pi-plus"></i> Cadastrar
                      </button>
                    </fieldset>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

Login.contextType = AuthContext;
export default withRouter(Login);
