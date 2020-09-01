import React from "react";

class App extends React.Component {
  state = {
    nome: "Danyllo",
    numero1: null,
    numero2: null,
    resultado: null,
  };

  somar = () => {
    const resultado =
      parseInt(this.state.numero1) + parseInt(this.state.numero2);
    this.setState({ resultado: resultado });
  };
  render() {
    return (
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={this.state.nome}
          onChange={(e) => this.setState({ nome: e.target.value })}
        />
        O nome digitado foi: {this.state.nome}
        <br />
        <label>Número 1:</label>
        <input
          type="text"
          value={this.state.numero1}
          onChange={(e) => this.setState({ numero1: e.target.value })}
        />
        <label>Número 2:</label>
        <input
          type="text"
          value={this.state.numero2}
          onChange={(e) => this.setState({ numero2: e.target.value })}
        />
        <button onClick={this.somar}>Somar</button>O resultado é:
        {this.state.resultado}
      </div>
    );
  }
}

export default App;
