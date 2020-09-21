import React from "react";
import { withRouter } from "react-router-dom";

import axios from "axios";

import "bootswatch/dist/flatly/bootstrap.css";

import Card from "../components/card";
import FormGroup from "../components/form-group";

class Login extends React.Component {
  state = {
    email: "",
    senha: "",
    mensagemErro: null,
  };

  entrar = async () => {
    await axios
      .post("http://localhost:8080/api/usuarios/autenticar", {
        email: this.state.email,
        senha: this.state.senha,
      })
      .then((response) => {
        console.log(response);
        this.props.history.push("/home");
      })
      .catch((erro) => {
        this.setState({ mensagemErro: erro.response.data });
        console.log(erro.response);
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
                <span>{this.state.mensagemErro}</span>
              </div>
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
                        Entrar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={this.prepareCadastrar}
                      >
                        Cadastrar
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

export default withRouter(Login);
