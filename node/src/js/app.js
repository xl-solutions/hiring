 
const urlAtual = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=1min';
const urlHistorico = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full';
const apikey = 'P7XNLDU8DYA9OO1A'; // your api key
$globalArrayAcoes = ['AMZN','PETR4.SA'];  
$dataIni = '2019-09-20';
$dataFim = '2019-09-24';
$qtdeComprada = '1';

function montaUrl(url,symbol) {
    return url + "&symbol=" + symbol + "&apikey=" + apikey;
}


Vue.component('sidebar', {
     data() {
       return {
         //lista de acoes
         symbols: $globalArrayAcoes,
         itemClass: 'selected',
         symbol: '',
         dataIni: '',
         dataFim: '',
         qtdeComprada: 1,
         isActive: false
       }
     },
     methods: { 
          //set Datas
          setDataInicial(){
               $dataIni = this.dataIni;
               alert('Data Inicial '+ this.dataIni +' setada');
          },
          setDataFinal(){
               $dataFim = this.dataFim;
               alert('Data Final '+ this.dataFim +' setada');
          },
          setQtdeComprada(){
               $qtdeComprada = this.qtdeComprada;
               alert('Quantidade Comprada '+ this.qtdeComprada +' setada');
          },
          //adiciona acao na lista
          adicionaAcao(){
               console.log("Adicionando '"+this.symbol+"' na lista de acoes;" + " Lista : ["+this.symbols + "]" );
               this.symbols.push(this.symbol.toUpperCase());
               this.symbol = ''; 
               //equipara a lista do objeto VUE
               vm.setStocks(this.symbols); 
               console.log($globalArrayAcoes);
          },
          //remove acao
          removeAcao(symbol){ 
               this.symbols.splice(this.symbols.indexOf(symbol), 1);
               console.log("Removendo '"+symbol+"' na lista de acoes;" + " Lista : ["+this.symbols + "]" );
               //equipara a lista do objeto VUE
               vm.setStocks(this.symbols);
          }, 
          //a funcao vai adicionar a classe 'selected' no item, para que a soma seja feita a partir dele
          acaoSelecionada(){
               // armazena o nome da acao desejada em uma variavel de sessão 
               sessionStorage.setItem('acaoAtual', (event.target.textContent));
               alert('A Ação selecionada é '+  sessionStorage.getItem('acaoAtual'));
               console.log("1 - Ação Selecionada: " + sessionStorage.getItem('acaoAtual')); 

              //console.log(event.target.innerText || event.target.textContent);
               // $(this).children('a').addClass('ativo');
          }
     },
     template: 
     `     
     <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
               <span>
               <hr>
                    <input placeholder="Quantidade Comprada" class="input-data" type="text" @keyup.enter="setQtdeComprada()" v-model="qtdeComprada"> 
               <hr>
                    <input placeholder="Data Inicial" class="input-data" type="text" @keyup.enter="setDataInicial()" v-model="dataIni">  
                    <input placeholder="Data Final" class="input-data" type="text" @keyup.enter="setDataFinal()" v-model="dataFim">
               <hr>
               </span>
               <h4>  Lista de Ações</h4>
               <input placeholder="Adicionar Ação" type="text" @keyup.enter="adicionaAcao()" v-model="symbol"> 
               <ul id="acao-list" class="nav flex-column">
                    <li v-for="symbol in symbols"  class="nav-item">
                         <a v-bind:href="symbol" v-on:click.prevent="acaoSelecionada()" ref="stockSymbol" class="nav-link">{{ symbol }}</a> 
                         <button  @click.prevent="removeAcao(symbol)" class = "delete-acao">X</button> 
                    </li>
               </ul>
          </div>
     </nav>
     `
});

Vue.component('actions-menu', { 
     data (){
          return{
               valor: 0,
               texto: ' ',               
               ganhos: {
                    "name": '',
                    "purchasedAmount": 0,
                    "purchasedAt": ' ', // data em formato ISO 8601,
                    "priceAtDate": 0, // preço na data de compra
                    "lastPrice": 0,   // preço mais recente
                    "capitalGains": 0 // ganhos ou perdas com a ação, em reais
               } 
          }
     },
     computed: {
          notifiy() {
               return this.msg;
          }
     },
     methods: { 
          mostraMontante(){ 
               console.log('SOMA: '+this.valor);
               //return this.valor;
          },
          mostraPrecoAtual(){ 
              this.texto = vm.precoAtual(sessionStorage.getItem('acaoAtual'));
              vm.trocaInformacao(1);              
          },
          mostraGanhosInvestimento(){
               this.ganhos = vm.ganhoInvestimento(sessionStorage.getItem('acaoAtual'),$dataIni,$qtdeComprada);
               //this.ganhos = vm.ganhoInvestimento(sessionStorage.getItem('acaoAtual'),"2019-09-13",10);
               console.log('DATA INICIAL:' +$dataIni)
              vm.trocaInformacao(2);
          },
          mostraComparaAcoes(){ 
              vm.comparaAcoes(); 
              vm.trocaInformacao(3);
          },
          mostraPrecoHistorico(){ 
              vm.precoHistorico(sessionStorage.getItem('acaoAtual'),$dataIni,$dataFim); 
              vm.trocaInformacao(4);
          }
     },
     template:
     `
          <div class="actions-menu"> 
               <ul class='upper-menu'> 
                    <li @click="mostraPrecoAtual()">Mostra Preço Atual</li> 
                    <li @click="mostraGanhosInvestimento()">Mostra Ganhos</li> 
                    <li @click="mostraComparaAcoes()">Compara Ações</li>         
                    <li @click="mostraPrecoHistorico()">Preço Histórico</li>                     
               </ul>               
          </div>
       `
});

const vm = new Vue({
     el: '#app',
     data() {
          return {  
               informacao: 0,
               isLoading: false,
               stockName: '',
               stocks: $globalArrayAcoes,
               msg: '',
               texto: '',
               dataInicio: '',
               qtdeComprada: 0,
               //array para acoesComparadas
               arrayAcoesComparadas: [],
               //obj para comparar ações
               acoesComparadas: {
                    "name": '',  
                    "lastPrice": 0,
                    "pricedAt": ''    // preço mais recente 
               },
               //ganhos de acordo com compras
               ganhos: {
                    "name": '',
                    "purchasedAmount": 0,
                    "purchasedAt": ' ', // data em formato ISO 8601,
                    "priceAtDate": 0, // preço na data de compra
                    "lastPrice": 0,   // preço mais recente
                    "capitalGains": 0 // ganhos ou perdas com a ação, em reais
               },
               //variavel para o preco historico de uma ação 
               acaoHistorico: {
                    name : '',
                    price: []
               }, 
               //informações do price
               priceAcaoHistorico: { 
                         "opening": 0,
                         "low": 0,
                         "high": 0,
                         "closing": 0,
                         "pricedAt": '' 
               }
          }
     },
     created() {
       //armazena ultima ação pesquisada, caso nenhuma tenha sido carregada, carrega a PETR4.SA 
       let getSymbol = localStorage.getItem('symbol') !== null ? localStorage.getItem('symbol') : 'PETR4.SA';
       //this.calculaMontante(getSymbol);
     },
     methods: {

          //seta informações no Array 
          setStocks(stocks){
               this.stocks = stocks;
          },
 
          //troca informação que aparece na tela
          trocaInformacao(nInfo){
               this.informacao = nInfo;
               console.log(this.acaoHistorico); 
          },
          
          //obtem o preço atual de uma ação
          precoHistorico(stockName,dataInicio, dataFinal){
               this.isLoading = true;
               this.stockName = stockName; 
               var url = montaUrl(urlHistorico,this.stockName);
               //transformas datas em Dates               
               var dateDataInicio = new Date(dataInicio);
               var dateDataFinal = new Date(dataFinal);
               //log
               console.log('2 - A url é:' + url);
               localStorage.setItem('symbol', this.stockName);     
               this.$http.get(url).then(function(response){        
                    var vm = this; 
                    var stockObj = response.body["Time Series (Daily)"];
                   // var ultimaAtualizacao = response.body["Meta Data"]["3. Last Refreshed"]; //data e hora da ultima atualização
                    //log
                   // console.log('3 - Ultima Atualização: ' + ultimaAtualizacao);
                    let msg = typeof response.body["Meta Data"]["1. Information"] !== 'undefined' ? response.body["Meta Data"]["1. Information"] : ''; 
                    this.msg = msg;
                    this.isLoading = false;
                    //log 
                    console.log('4- a Response é :' + response);
                    //popula objeto 
                    console.log('fora for');
                    this.acaoHistorico.name = this.stockName;
                    for(key in stockObj){
                         //apenas adiciona no range de datas
                         //console.log('fora if');
                         //console.log('Date.parse(key) -> ', Date.parse(key));
                        // console.log('dateDataInicio -> ', dateDataInicio);
                         if(Date.parse(key) >= dateDataInicio & Date.parse(key) <= dateDataFinal){  
                              console.log('dentro if ->' + key + ' -> $' +  stockObj[key]["1. open"] );
                              this.priceAcaoHistorico = [];
                              this.priceAcaoHistorico["opening"] = stockObj[key]["1. open"];                   
                              this.priceAcaoHistorico["low"] = stockObj[key]["3. low"]; 
                              this.priceAcaoHistorico["high"] = stockObj[key]["2. high"]; 
                              this.priceAcaoHistorico["closing"] = stockObj[key]["4. close"]; 
                              this.priceAcaoHistorico["pricedAt"] = key; 
                              
                              this.acaoHistorico.price.push(this.priceAcaoHistorico);
                              console.log(this.acaoHistorico);
                              
                         }
                    }
                      
                    
                                   
               })
               .catch(function(e){
                    console.log(e);
                    alert('Erro ao obter dados, atualizando página');
                    location.reload();
               });
               console.log('5 - o texto é: '+this.texto);
               //return this.texto;

          },
          //obtem o preço atual de uma ação
          precoAtual(stockName){
               this.isLoading = true;
               this.stockName = stockName; 
               var url = montaUrl(urlAtual,this.stockName);
               //log
               console.log('2 - A url é:' + url);
               localStorage.setItem('symbol', this.stockName);     
               this.$http.get(url).then(function(response){        
                    var vm = this;
                     
                    /*
                    console.log(response);
                    console.log(response.body["Time Series (1min)"]);
                    console.log(response.body["Meta Data"]);
                    this.isLoading = false; 
                    //log
                    */ 
                    var stockObj = response.body["Time Series (1min)"];
                    var ultimaAtualizacao = response.body["Meta Data"]["3. Last Refreshed"]; //data e hora da ultima atualização
                    //log
                    console.log('3 - Ultima Atualização: ' + ultimaAtualizacao);
                    let msg = typeof response.body["Meta Data"]["1. Information"] !== 'undefined' ? response.body["Meta Data"]["1. Information"] : ''; 
                    this.msg = msg;
                    this.isLoading = false;
                    //log 
                    console.log('4- a Response é :' + response);
                    this.texto = "A ação "+ this.stockName + " possui o valor de $" + stockObj[ultimaAtualizacao]["4. close"] + " ("+ ultimaAtualizacao + ")";
                    
                    return this.texto;  
                                   
               })
               .catch(function(e){
                    console.log(e);
                    alert('Erro ao obter dados, atualizando página');
                    location.reload();
               });
               console.log('5 - o texto é: '+this.texto);
               //return this.texto;

          },

          //obtem o preço atual de varias ações
          comparaAcoes(){
               this.isLoading = true;
               console.log('---------------'+$globalArrayAcoes)
               for(index in $globalArrayAcoes){
                    this.arrayAcoesComparadas = [];
                    this.stockName = $globalArrayAcoes[index]; 
                    var url = montaUrl(urlAtual,this.stockName);
                    var st = this.stockName;
                    this.$http.get(url).then(function(response){        
                         var vm = this;
                         console.log('2 - A url é:' + url);
                         console.log(response);
                         var stockObj = response.body["Time Series (1min)"];
                         var ultimaAtualizacao = response.body["Meta Data"]["3. Last Refreshed"]; //data e hora da ultima atualização
                         //log
                         console.log('3 - Ultima Atualização: ' + ultimaAtualizacao);
                         let msg = typeof response.body["Meta Data"]["1. Information"] !== 'undefined' ? response.body["Meta Data"]["1. Information"] : ''; 
                         this.msg = msg;
                         this.isLoading = false;
                         //log 
                         this.texto = "A ação "+ st + " possui o valor de $" + stockObj[ultimaAtualizacao]["4. close"] + " ("+ ultimaAtualizacao + ")";
                         
                         console.log('5- O texto é :' + this.texto);
                         
                         this.acoesComparadas = {};
                         this.acoesComparadas["name"] = response.body["Meta Data"]["2. Symbol"];
                         //preço ação no fechamento
                         this.acoesComparadas["lastPrice"] = stockObj[ultimaAtualizacao]["4. close"];
                         //data mais recente
                         this.acoesComparadas["pricedAt"] = ultimaAtualizacao;                      
                         //adiciona na array
                         this.arrayAcoesComparadas.push(this.acoesComparadas);
                         //return this.texto;  
                                        
                    })
                    .catch(function(e){
                         console.log(e);
                         alert('Erro ao obter dados, atualizando página');
                         location.reload();
                    });
                   // console.log('5 - o texto é: '+this.texto);
                    //return this.texto;
               } 
          },

          
          
          //calcula quanto teria ganho caso investido (calculo ficticio)
          ganhoInvestimento(stockName, dataInicio, qtdeComprada){
               this.isLoading = true;
               this.stockName = stockName; 
               this.qtdComprada = qtdeComprada;
               this.dataInicio = dataInicio;
               var url = montaUrl(urlHistorico,this.stockName);
               //log
               console.log('2 - A url é:' + url);
               localStorage.setItem('symbol', this.stockName);     
               this.$http.get(url).then(function(response){        
                    var vm = this; 
                     
                    /*
                    console.log(response);
                    console.log(response.body["Time Series (1min)"]);
                    console.log(response.body["Meta Data"]);
                    this.isLoading = false; 
                    //log
                    */ 
                    var stockObj = response.body["Time Series (Daily)"];
                    var ultimaAtualizacao = response.body["Meta Data"]["3. Last Refreshed"]; //data e hora da ultima atualização
                    //log
                    console.log('3 - Ultima Atualização: ' + ultimaAtualizacao);
                    let msg = typeof response.body["Meta Data"]["1. Information"] !== 'undefined' ? response.body["Meta Data"]["1. Information"] : ''; 
                    this.msg = msg;
                    this.isLoading = false;
                    //log
                    console.log('4- a Response é :' + response); 

                    //montando o objeto
                    this.ganhos["name"] = this.stockName;
                    this.ganhos["purchasedAmount"] = this.qtdComprada;
                    this.ganhos["purchasedAt"] = this.dataInicio;// data em formato ISO 8601,
                    this.ganhos["priceAtDate"] = parseFloat(stockObj[this.dataInicio]["4. close"]);// preço na data de compra
                    this.ganhos["lastPrice"] = parseFloat(stockObj[ultimaAtualizacao]["4. close"]);  // preço mais recente
                    this.ganhos["capitalGains"] = (this.ganhos["priceAtDate"] - this.ganhos["lastPrice"])* this.qtdComprada;

                    // o total é o preço de hoje - preço pago no dia * quantidade comprada
                    console.log(this.ganhos) ;              
               })
               .catch(function(e){
                    console.log(e);
                    alert('Erro ao obter dados, atualizando página');
                    location.reload();
               });  

          } 
 
     }
});
