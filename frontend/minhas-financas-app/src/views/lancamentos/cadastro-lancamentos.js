import React from "react";
import { withRouter } from "react-router-dom";

import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageService";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";

import * as messages from "../../components/toastr";

class CadastroLancamentos extends React.Component {
  state = {
    id: null,
    descricao: "",
    valor: "",
    mes: "",
    ano: "",
    tipo: "",
    status: "",
    usuario: null,
    atualizando: false,
  };

  constructor() {
    super();
    this.service = new LancamentoService();
  }

  componentDidMount() {
    const params = this.props.match.params;
    if (params.id) {
      this.service
        .obterPorId(params.id)
        .then((response) => {
          this.setState({ ...response.data, atualizando: true });
        })
        .catch((erros) => {
          messages.mensagemErro(erros.reponse.data);
        });
    }
  }

  submit = () => {
    const usuarioLogado = LocalStorageService.obterItem("_usuario_logado");

    const { descricao, valor, mes, ano, tipo } = this.state;
    const lancamento = {
      descricao,
      valor,
      mes,
      ano,
      tipo,
      usuario: usuarioLogado.id,
    };

    try {
      this.service.validar(lancamento);
    } catch (erro) {
      const mensagens = erro.mensagens;
      mensagens.forEach((msg) => messages.mensagemErro(msg));
      return false;
    }

    this.service
      .salvar(lancamento)
      .then((repsonse) => {
        this.props.history.push("/consulta-lancamentos");
        messages.mensagemSucesso("Lançamento cadastrado com sucesso!");
      })
      .catch((error) => {
        messages.mensagemErro(error.response.data);
      });
  };

  atualizar = () => {
    const {
      descricao,
      valor,
      mes,
      ano,
      tipo,
      status,
      usuario,
      id,
    } = this.state;
    const lancamento = {
      descricao,
      valor,
      mes,
      ano,
      tipo,
      usuario,
      status,
      id,
    };

    this.service
      .atualizar(lancamento)
      .then((repsonse) => {
        this.props.history.push("/consulta-lancamentos");
        messages.mensagemSucesso("Lançamento atualizado com sucesso!");
      })
      .catch((error) => {
        messages.mensagemErro(error.response.data);
      });
  };

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };

  render() {
    const meses = this.service.obterListaMeses();
    const tipos = this.service.obterListaTipos();

    return (
      <Card
        title={
          this.state.atualizando
            ? "Atualização de Lançamento"
            : "Cadastro de Lançamento"
        }
      >
        <div className="row">
          <div className="col-md-12">
            <FormGroup htmlFor="inputDescricao" label="Descrição: *">
              <input
                type="text"
                className="form-control"
                id="inputDescricao"
                name="descricao"
                value={this.state.descricao}
                onChange={this.handleChange}
                placeholder="Digite a descrição"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroup htmlFor="inputAno" label="Ano: *">
              <input
                type="text"
                className="form-control"
                id="inputAno"
                name="ano"
                value={this.state.ano}
                onChange={this.handleChange}
                placeholder="Digite o Ano"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup htmlFor="inputMes" label="Mês: *">
              <SelectMenu
                id="inputMes"
                value={this.state.mes}
                onChange={this.handleChange}
                className="form-control"
                name="mes"
                lista={meses}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup htmlFor="inpuValor" label="Valor: *">
              <input
                type="text"
                className="form-control"
                id="inputValor"
                value={this.state.valor}
                name="valor"
                onChange={this.handleChange}
                placeholder="Digite o Valor"
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup htmlFor="inputTipo" label="Tipo: *">
              <SelectMenu
                id="inputTipo"
                value={this.state.tipo}
                name="tipo"
                onChange={this.handleChange}
                className="form-control"
                lista={tipos}
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup htmlFor="inputStatus" label="Status:">
              <input
                type="text"
                className="form-control"
                id="inputStatus"
                name="status"
                value={this.state.status}
                disabled
              />
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {this.state.atualizando ? (
              <button
                type="button"
                className="btn btn-success"
                onClick={this.atualizar}
              >
                <i className="pi pi-refresh"></i> Atualizar
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success"
                onClick={this.submit}
              >
                <i className="pi pi-save"></i> Salvar
              </button>
            )}
            <button
              type="button"
              className="btn btn-danger"
              onClick={(e) => this.props.history.push("/consulta-lancamentos")}
            >
              <i className="pi pi-times"></i> Cancelar
            </button>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(CadastroLancamentos);
