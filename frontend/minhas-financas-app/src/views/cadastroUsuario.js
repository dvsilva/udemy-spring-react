import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../components/card";
import FormGroup from "../components/form-group";

class CadastroUsuario extends React.Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    senhaRepeticao: "",
  };

  cadastrar = () => {
    console.log(this.state);
  };

  cancelar = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <Card title="Cadastro de Usuário">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome: *" htmlFor="inputNome">
                <input
                  type="text"
                  id="inputNome"
                  name="nome"
                  className="form-control"
                  value={this.state.nome}
                  onChange={(e) => this.setState({ nome: e.target.value })}
                />
              </FormGroup>

              <FormGroup label="Email: *" htmlFor="inputEmail">
                <input
                  type="email"
                  id="inputEmail"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </FormGroup>
              <FormGroup label="Senha: *" htmlFor="inputSenha">
                <input
                  type="password"
                  className="form-control"
                  id="inputSenha"
                  name="senha"
                  value={this.state.senha}
                  onChange={(e) => this.setState({ senha: e.target.value })}
                />
              </FormGroup>
              <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                <input
                  type="password"
                  className="form-control"
                  id="inputRepitaSenha"
                  name="senhaRepeticao"
                  value={this.state.senhaRepeticao}
                  onChange={(e) =>
                    this.setState({ senhaRepeticao: e.target.value })
                  }
                />
              </FormGroup>

              <button className="btn btn-success" onClick={this.cadastrar}>
                Salvar
              </button>
              <button className="btn btn-danger" onClick={this.cancelar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(CadastroUsuario);
