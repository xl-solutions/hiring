<template>
  <div>
    <div id="secao">
      <h1 class="text-center">Opções de buscas:</h1>
    </div>
    <!--Inicio incluir ações no portifólio-->
    <div id="secao">
      <h3 class="text-center">Adicionar ações ao portfólio:</h3>
      <div id="msgPortifolio" v-html="mensagemPortifolio"></div>
      <div id="formulario" class="format">
        <form id="formAcao" method="POST" action="/" v-on:submit.prevent="portifolio">
          <div class="row">
            <div class="col-sm-12">
              <label for="inlineFormInput">Adicionar ação:</label>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="acao"
                  name="acao"
                  v-model="acao"
                  required
                  placeholder="Ex: PETR4.SA, VVAR3.SA, IBM, etc..."
                />
              </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <button id="btn-Adicionar" type="submit" class="btn btn-success float-right">
                    <i class="fa fa-plus"></i> Adicionar
                  </button>
                </div>
              </div>
          </div>
        </form>
      </div>
            <div v-show="listaPortifolio.length > 0">
            <div v-for="item in listaPortifolio" :key="item.pricedAt">
                <div class="card text-center">
                  <div class="card-body">
                    <h5 class="card-title">{{item.name}}</h5>
                    <p class="card-text">Valor atual: {{item.lastPrice}}</p>
                    <p class="card-text">Ultima atualização: {{item.pricedAt[2]}}/{{item.pricedAt[1]}}/{{item.pricedAt[0]}}</p>
                    <button id="btn-limpar-atual" type="button" class="btn btn-danger" v-on:click="excluirPortifolio(item.indice)">
              <i class="fa fa-trash"></i> Remover
            </button>
            </div>
            </div>
          </div>
          </div>
      </div>
    <!--Fim incluir ações no portifólio -->
    <!--Inicio preço atual-->
    <div id="secao">
      <h3 class="text-center">Consultar cotação atual de uma ação:</h3>
      <div id="msgAtual" v-html="mensagemAtual"></div>
      <div id="formulario" class="format">
        <form id="formAcao" method="POST" action="/" v-on:submit.prevent="precoAtual">
          <div class="row">
            <div class="col-sm-12">
              <label for="inlineFormInput">Pesquisar ação:</label>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="acao"
                  name="acao"
                  v-model="acao"
                  required
                  placeholder="Ex: PETR4.SA, VVAR3.SA, IBM, etc..."
                />
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <button id="btn-pesquisar" type="submit" class="btn btn-info float-right">
                  <i class="fa fa-search"></i> Pesquisar
                </button>
              </div>
            </div>
          </div>
        </form>

        <div class="card text-center" v-show="atual">
          <div class="card-header">
            <h4>Cotação atual {{registroAtual.name}}</h4>
          </div>
          <div class="card-body">
            <h5 class="card-title">Último valor: {{registroAtual.lastPrice}}</h5>
            <h5
              class="card-title"
            >Data da última atualização: {{registroAtual.pricedAt[2]}}/{{registroAtual.pricedAt[1]}}/{{registroAtual.pricedAt[0]}}</h5>
            <button
              id="btn-limpar-atual"
              type="button"
              class="btn btn-primary"
              v-on:click="limparAtual()"
            >
              <i class="fa fa-eraser"></i> Limpar
            </button>
          </div>
          <div class="card-footer text-muted">Fonte: www.alphavantage.co</div>
        </div>
      </div>
    </div>
    <hr />
    <!--Fim preço atual-->

    <!--Inicio preço historico-->
    <div id="secao">
      <h3 class="text-center">Consultar histórico de uma ação:</h3>
      <div id="msgHistorico" v-html="mensagemHistorico"></div>
      <form method="POST" action="/" v-on:submit.prevent="precoHistorico">
        <div class="form-row align-items-center">
          <div class="col-sm-4">
            <label for="inlineFormInput">Ação:</label>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="acao"
                name="acao"
                v-model="acao"
                required
                placeholder="Ex: PETR4.SA, VVAR3.SA, IBM, etc..."
              />
            </div>
          </div>
          <div class="col-sm-4">
            <label for="inlineFormInput">Data inicial:</label>
            <input
              type="date"
              class="form-control mb-3"
              id="dataInicial"
              name="dataInicial"
              v-model="dataInicial"
              required
            />
          </div>
          <div class="col-sm-4">
            <label for="inlineFormInput">Data final:</label>
            <input
              type="date"
              class="form-control mb-3"
              id="dataFinal"
              name="dataFinal"
              v-model="dataFinal"
              required
            />
          </div>
          <div class="col-sm-12">
            <button id="btn-pesquisar" type="submit" class="btn btn-info float-right">
              <i class="fa fa-search"></i> Pesquisar
            </button>
          </div>
        </div>
      </form>
      <div v-show="historico">
        <table class="table table-striped table-bordered table-hover table-sm">
          <thead>
            <tr>
              <th>Ação</th>
              <th>Abertura</th>
              <th>Menor</th>
              <th>Maior</th>
              <th>Fechamento</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in registroHistorico.prices" :key="item.pricedAt">
              <td>{{registroHistorico.name}}</td>
              <td>{{item.opening.toFixed(2)}}</td>
              <td>{{item.low.toFixed(2)}}</td>
              <td>{{item.high.toFixed(2)}}</td>
              <td>{{item.closing.toFixed(2)}}</td>
              <td>{{item.pricedAt}}</td>
            </tr>
          </tbody>
        </table>
        <button
          id="btn-limpar-atual"
          type="button"
          class="btn btn-primary"
          v-on:click="limparHistorico()"
        >
          <i class="fa fa-eraser"></i> Limpar
        </button>
      </div>
    </div>
    <hr />
    <!--Fim preço historico-->

    <!--Inicio comparar ações -->
    <div id="secao">
      <h3 class="text-center">Comparar ações:</h3>
      <div id="msgComparaAcoes" v-html="mensagemComparaAcoes"></div>
      <form method="POST" action="/" v-on:submit.prevent="compararAcoes">
        <div class="form-row align-items-center">
          <div v-for="i in input" :key="i" class="col-sm-12">
            <label for="inlineFormInput">Ação {{i}}:</label>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                :id='"acao"+i'
                :name='"acao"+i'
                v-model="acoes[i-1]"
                required
                placeholder="Ex: PETR4.SA, VVAR3.SA, IBM, etc..."
              />
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group">
              <button
                id="btn-pesquisar"
                type="submit"
                style="margin-left: 15px;"
                class="btn btn-info float-right"
              >
                <i class="fa fa-search"></i> Pesquisar
              </button>
              <button
                @click="input++"
                id="btn-adicionar"
                type="button"
                style="margin-left: 15px;"
                class="btn btn-success float-right"
              >
                <i class="fa fa-plus"></i> Adicionar
              </button>
              <button
                v-if="input > 2"
                @click="input--"
                id="btn-adicionar"
                type="button"
                class="btn btn-danger float-right"
              >
                <i class="fa fa-trash"></i> Remover
              </button>
            </div>
          </div>
        </div>
      </form>

      <div v-show="comparAcoes">
        <table class="table table-striped table-bordered table-hover table-sm">
          <thead>
            <tr>
              <th>Ação</th>
              <th>Valor atual</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in registroComparaAcoes" :key="item.name">
              <td>{{item.name}}</td>
              <td>{{item.lastPrice.toFixed(2)}}</td>
              <td>{{item.pricedAt}}</td>
            </tr>
          </tbody>
        </table>
        <button
          id="btn-limpar-atual"
          type="button"
          class="btn btn-primary"
          v-on:click="limparComparaAcoes()"
        >
          <i class="fa fa-eraser"></i> Limpar
        </button>
      </div>
    </div>
    <hr />
    <!--Fim comparar ações-->

    <!--Inicio projeção de ganhos-->
    <div id="secao">
      <h3 class="text-center">Projeção de ganhos:</h3>
      <div id="msgProjecaoGanhos" v-html="mensagemProjecaoGanhos"></div>
      <form method="POST" action="/" v-on:submit.prevent="projecaoGanhos">
        <div class="form-row align-items-center">
          <div class="col-sm-4">
            <label for="inlineFormInput">Ação:</label>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="acao"
                name="acao"
                v-model="acao"
                required
                placeholder="Ex: PETR4.SA, VVAR3.SA, IBM, etc..."
              />
            </div>
          </div>
          <div class="col-sm-4">
            <label for="inlineFormInput">Quantidade comprada:</label>
            <div class="form-group">
              <input
                type="number"
                class="form-control"
                id="quantidade"
                name="quantidade"
                v-model="quantidade"
                required
                placeholder="Quantidade de ações compradas"
              />
            </div>
          </div>
          <div class="col-sm-4">
            <label for="inlineFormInput">Data da compra:</label>
            <input
              type="date"
              class="form-control mb-3"
              id="dataCompra"
              name="dataCompra"
              v-model="dataCompra"
              required
            />
          </div>
          <div class="col-sm-12">
            <div class="form-group">
              <button
                id="btn-pesquisar"
                type="submit"
                class="btn btn-info float-right"
                style="margin-bottom: 15px"
              >
                <i class="fa fa-search"></i> Pesquisar
              </button>
            </div>
          </div>
        </div>
      </form>

      <div class="card text-center" style="margin-bottom: 15px" v-show="ganhos">
        <div class="card-header">
          <h4>Ação pesquisada: {{registroGanhos.name}}</h4>
        </div>
        <div class="card-body">
          <h5 class="card-title">Quantidade comprada: {{registroGanhos.purchasedAmount}}</h5>
          <h5 class="card-title">Data da compra: {{registroGanhos.purchasedAt}}</h5>
          <h5 class="card-title">Valor na data da compra: {{registroGanhos.priceAtDate}}</h5>
          <h5 class="card-title">Valor Atual: {{registroGanhos.lastPrice}}</h5>
          <h4 class="card-title">Ganho ou perda: {{registroGanhos.capitalGains}}</h4>
          <button
            id="btn-limpar-atual"
            type="button"
            class="btn btn-primary"
            v-on:click="limparGanhos()"
          >
            <i class="fa fa-eraser"></i> Limpar
          </button>
        </div>
        <div class="card-footer text-muted">Fonte: www.alphavantage.co</div>
      </div>
      <br />
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  props: {},
  data() {
    return {
      listaPortifolio: [],
      mensagemPortifolio: "",
      registroAtual: { name: "", lastPrice: "", pricedAt: "" },
      acao: "",
      mensagemAtual: "",
      atual: false,
      dataInicial: "",
      dataFinal: "",
      historico: false,
      registroHistorico: { name: "", prices: [] },
      mensagemHistorico: "",
      acoes: [],
      mensagemComparaAcoes: "",
      comparAcoes: false,
      registroComparaAcoes: [],
      input: 2,
      dataCompra: "",
      quantidade: "",
      ganhos: false,
      registroGanhos: {},
      mensagemProjecaoGanhos: "",
      existe: false,
    };
  },
  methods: {
    portifolio() {
      return this.$apiService
        .getPrecoAtual(this.acao)
        .then((response) => {
          if (
            response.erro ||
            response.lastPrice == null ||
            response.pricedAt == null
          ) {
            this.exibirMsgAlertPortifolio(
              `Não foi possível encontrar a ação ${this.acao}.`,
              "erro"
            );
            return false;
          } else {
            this.limparMsgAlertPortifolio();
            for (let i = 0; i < this.listaPortifolio.length; i++) {
              if(this.listaPortifolio[i].name == response.name){
                this.existe = true
              }
            }
            if(!this.existe){
              this.existe = false
              this.listaPortifolio.push({
              name: response.name,
              lastPrice: response.lastPrice,
              pricedAt: response.pricedAt.split("-"),
            });
            for (let i = 0; i < this.listaPortifolio.length; i++) {
              this.listaPortifolio[i].indice = i
            }
            } else {
              this.existe = false
              this.exibirMsgAlertPortifolio(
            "Ação já cadastrada em seu portifólio.",
            "erro"
          );
            }
            return true;
          }
        })
        .catch((error) => {
          this.exibirMsgAlertPortifolio(
            "Não foi possível realizar a busca da ação informada, por favor tente novamente mais tarde. ",
            "erro"
          );
          return error;
        });
    },
    //consulta a api e retorna o preço atual da ação pesquisada
    precoAtual() {
      return this.$apiService
        .getPrecoAtual(this.acao)
        .then((response) => {
          if (
            response.erro ||
            response.lastPrice == null ||
            response.pricedAt == null
          ) {
            this.exibirMsgAlertAtual(
              `Não foi possível encontrar a ação ${this.acao}.`,
              "erro"
            );
            return false;
          } else {
            this.limparMsgAlertAtual();
            this.atual = true;
            this.registroAtual = {
              name: response.name,
              lastPrice: response.lastPrice,
              pricedAt: response.pricedAt.split("-"),
            };
            return true;
          }
        })
        .catch((error) => {
          this.exibirMsgAlertAtual(
            "Não foi possível realizar a busca da ação informada, por favor tente novamente mais tarde. ",
            "erro"
          );
          return error;
        });
    },
    //consulta a api e retorna o preço histórico da ação pesquisada
    precoHistorico() {
      return this.$apiService
        .getPrecoHistorico(this.acao, this.dataInicial, this.dataFinal)
        .then((response) => {
          if (response.erro || response.prices.length == 0) {
            this.exibirMsgAlertHistorico(
              `Não foi possível encontrar a ação ${this.acao} para as datas entre ${this.dataInicial} e ${this.dataFinal}.`,
              "erro"
            );
            return false;
          } else {
            this.limparMsgAlertHistorico();
            this.historico = true;
            for (let i = 0; i < response.prices.length; i++) {
              let dataAcao = response.prices[i].pricedAt.split("-");
              response.prices[
                i
              ].pricedAt = `${dataAcao[2]}/${dataAcao[1]}/${dataAcao[0]}`;
            }
            this.registroHistorico = {
              name: response.name,
              prices: response.prices,
            };
            return true;
          }
        })
        .catch((error) => {
          this.exibirMsgAlertHistorico(
            "Não foi possível realizar a busca da ação informada pelas datas informadas, por favor tente novamente mais tarde.",
            "erro"
          );
          return error;
        });
    },
    //consulta a api e retorna as ações
    compararAcoes() {
      return this.$apiService
        .compararAcoes(this.acoes, this.acoes[0])
        .then((response) => {
          if (response.erro || response.length == 0) {
            this.exibirMsgAlertComparaAcoes(
              `Não foi possível comparar as ações.`,
              "erro"
            );
            return false;
          } else {
            this.limparMsgAlertComparaAcoes();
            this.comparAcoes = true;
            for (let i = 0; i < response.lastPrices.length; i++) {
              let dataAcao = response.lastPrices[i].pricedAt.split("-");
              response.lastPrices[
                i
              ].pricedAt = `${dataAcao[2]}/${dataAcao[1]}/${dataAcao[0]}`;
            }
            this.registroComparaAcoes = response.lastPrices;
            return true;
          }
        })
        .catch((error) => {
          this.exibirMsgAlertComparaAcoes(
            "Não foi possível realizar a comparação das açoes informadas, por favor tente novamente mais tarde.",
            "erro"
          );
          return error;
        });
    },
    //consulta a api e traz o ganho já calculado
    projecaoGanhos() {
      return this.$apiService
        .getProjetarGanhos(this.acao, this.quantidade, this.dataCompra)
        .then((response) => {
          if (response.erro || response.capitalGains == null) {
            this.exibirMsgAlertGanhos(
              `Não foi possível encontrar um registro na data informada, finais de semana não tem cotação.`,
              "erro"
            );
            return false;
          } else {
            this.limparMsgAlertGanhos();
            this.ganhos = true;
            let dataAcao = response.purchasedAt.split("-");
            response.purchasedAt = `${dataAcao[2]}/${dataAcao[1]}/${dataAcao[0]}`;

            this.registroGanhos = response;
            return true;
          }
        })
        .catch((error) => {
          this.exibirMsgAlertGanhos(
            "Não foi possível encontrar resultados, por favor tente novamente mais tarde.",
            "erro"
          );
          return error;
        });
    },
    exibirMsgAlertPortifolio(msg, tipo) {
      let dados = "";
      if (tipo == "sucesso") {
        dados = `<div class='alert alert-success' role='alert'>
                    <strong>${msg}</strong>
                </div>`;
      } else if (tipo == "erro") {
        dados = `<div class='alert alert-danger' role='alert'>
                    <strong>${msg}</strong>
                </div>`;
      }
      this.mensagemPortifolio = dados;
    },
    exibirMsgAlertAtual(msg, tipo) {
      let dados = "";
      if (tipo == "sucesso") {
        dados = `<div class='alert alert-success' role='alert'>
                    <strong>${msg}</strong>
                </div>`;
      } else if (tipo == "erro") {
        dados = `<div class='alert alert-danger' role='alert'>
                    <strong>${msg}</strong>
                </div>`;
      }
      this.mensagemAtual = dados;
    },
    exibirMsgAlertHistorico(msg, tipo) {
      let dados = "";
      if (tipo == "sucesso") {
        dados = `<div class='alert alert-success' role='alert'>
                    <strong>${msg}</strong>
                </div>`;
      } else if (tipo == "erro") {
        dados = `<div class='alert alert-danger' role='alert'>
                    <strong>${msg}</strong>
                </div>`;
      }
      this.mensagemHistorico = dados;
    },
    exibirMsgAlertComparaAcoes(msg, tipo) {
      let dados = "";
      if (tipo == "sucesso") {
        dados = `<div class='alert alert-success' role='alert'>
                    <strong>${msg}</strong>
                </div>`;
      } else if (tipo == "erro") {
        dados = `<div class='alert alert-danger' role='alert'>
                    <strong>${msg}</strong>
                </div>`;
      }
      this.mensagemComparaAcoes = dados;
    },
    exibirMsgAlertGanhos(msg, tipo) {
      let dados = "";
      if (tipo == "sucesso") {
        dados = `<div class='alert alert-success' role='alert'>
                    <strong>${msg}</strong>
                </div>`;
      } else if (tipo == "erro") {
        dados = `<div class='alert alert-danger' role='alert'>
                    <strong>${msg}</strong>
                </div>`;
      }
      this.mensagemProjecaoGanhos = dados;
    },
    limparMsgAlertPortifolio() {
      this.mensagemPortifolio = "";
    },
    limparMsgAlertAtual() {
      this.mensagemAtual = "";
    },
    limparMsgAlertHistorico() {
      this.mensagemHistorico = "";
    },
    limparMsgAlertComparaAcoes() {
      this.mensagemHistorico = "";
    },
    limparMsgAlertGanhos() {
      this.mensagemProjecaoGanhos = "";
    },
    limparAtual() {
      this.atual = false;
    },
    limparHistorico() {
      this.historico = false;
    },
    limparComparaAcoes() {
      this.comparAcoes = false;
    },
    limparGanhos() {
      this.ganhos = false;
    },
    excluirPortifolio(indice){
     this.listaPortifolio.splice(indice, 1);
    },
    //testes
    testePrecoAtual() {
      this.acao = "PETR4.SA";
      return(this.precoAtual());
    },
    testePrecoHistorico() {
      this.acao = "PETR4.SA";
      this.dataInicial = "2020-07-20"
      this.dataFinal = "2020-07-21"
      return(this.precoHistorico());
    },
    testeCompararAcoes() {
      this.acoes = ["PETR4.SA", "IBM"]
      return(this.compararAcoes());
    },
    testeprojecaoGanhos() {
      this.acao = "PETR4.SA"
      this.quantidade = "1"
      this.dataCompra = "2020-07-24"
      return(this.projecaoGanhos());
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-center {
  margin-bottom: 20px;
}
#secao {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>