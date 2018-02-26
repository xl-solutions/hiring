using projeto.core.DAL;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace projeto.Models
{
    public class Importacao
    {
        private InfImportacao _objInfo;
        private DalImportacao _objDal;
        StreamReader ArquivoImportacao;
        private string _mensagem;
        List<ResumoImportacao> _resumoImportacao;
        List<string> _erros;


        public InfImportacao Info
        {
            get { return _objInfo; }
            set { _objInfo = value; }
        }

        public string Mensagem { get { return _mensagem; } }

        public Importacao()
        {

            _objInfo = new InfImportacao();
            _objDal = new DalImportacao();
        }

        public List<ResumoImportacao> ResumoImportacao { get { return _resumoImportacao; } }

        public void inserirImportacao()
        {
            _objDal.insereImportacao(_objInfo);
        }

        public bool abrirArquivo()
        {
            bool deuCerto = true;

            try
            {
                string fileImportacao = _objInfo.NomeArquivo;
                if (File.Exists(fileImportacao))
                {

                    ArquivoImportacao = new StreamReader(fileImportacao);

                }
                else
                {
                    deuCerto = false;
                    _mensagem = "O arquivo não existe";
                }
            }
            catch (Exception ex)
            {
                ArquivoImportacao = null;
                //throw new Exception("Não foi possível encontrar o arquivo");
            }

            return deuCerto;
        }


        public void fecharArquivo()
        {

            try
            {
                ArquivoImportacao.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("Não foi possível encontrar o arquivo");
            }

        }

        public bool validaArquivo()
        {
            bool valido = true;
            string[] extensoesPermitidas = new string[] { ".txt", ".csv" };
   
            string ext = Path.GetExtension(_objInfo.NomeArquivo);
            if (!extensoesPermitidas.Contains(ext))
            {
                valido = false;
                _mensagem = "Extensão inválida.";
            }
           

            return valido;
        }

        public void processaImportacao()
        {
            if (abrirArquivo())
            {
                List<Produtos> listaProdutos = new List<Produtos>();
                _erros = new List<string>();
                string linha = string.Empty;
                int quantidadeErros = 0;
                int quantidadeInseridos = 0;
                int quantidadeAlterada = 0;
                _resumoImportacao = new List<ResumoImportacao>();

                while ((linha = ArquivoImportacao.ReadLine()) != null)
                {
                    if (!string.IsNullOrEmpty(linha))
                    {
                        string[] linhaSeparada = linha.Split(',');
                        if (linhaSeparada[0] != "manufacturer")
                        {
                            if (linhaSeparada.Length >= 6)
                            {
                                Produtos prod = new Produtos();
                                Marcas marca = new Marcas();


                                if (prod.validaProduto(linhaSeparada))
                                {
                                    string valor = linhaSeparada[5];
                                    string nomeMarca = "";
                                    nomeMarca = linhaSeparada[0];
                                    int idMarca = 0;

                                    idMarca = marca.verificaMarcaExiste(nomeMarca);
                                    //se a marca nao existir.. insere
                                    if (idMarca == 0)
                                    {
                                        marca.Nome = nomeMarca;
                                        marca.insereMarca(marca);
                                        idMarca = marca.verificaMarcaExiste(nomeMarca);
                                    }

                                    prod.Marca = idMarca;
                                    prod.NomeProduto = linhaSeparada[1];
                                    prod.Valor = Convert.ToDecimal(valor);
                                    prod.Quantidade = Convert.ToInt32(linhaSeparada[4]);
                                    prod.CorProduto = linhaSeparada[2];
                                    prod.TipoPlano = linhaSeparada[3];
                                    prod.salvarProduto(prod);
                                    quantidadeInseridos++;
                                }
                                else
                                {
                                    quantidadeErros++;
                                    _erros.Add("O produto " + linhaSeparada[0] + " não foi inserido. Verifique se o valor do produto e quantidade em estoque estão preenchidos corretamente.");
                                }
                            }
                            else
                            {
                                quantidadeErros++;
                                _erros.Add("Produto inválido. A estrutura do arquivo não corresponde ao modelo.");
                            }
                        }                      
                    }                  
                   
                }

                string arquivoErros = criaArquivoErros();
                _resumoImportacao.Add(new ResumoImportacao(quantidadeErros, quantidadeInseridos, quantidadeAlterada, arquivoErros));


                fecharArquivo();
            }

        }

        public bool verifcaJaImportou(string nomeArquivo)
        {
            bool importou = false;
            importou =_objDal.verificaImportacaoJaExiste(nomeArquivo);
            return importou;
        }

        public string criaArquivoErros()
        {
            string nomeArquivo = string.Empty;
            string path = string.Empty;

            if (_erros != null && _erros.Count > 0)
            {
                nomeArquivo = "erros-importacao.csv";
                path = Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath("~/Arquivos/erros/"), nomeArquivo);
                

                StreamWriter objEscrita = new StreamWriter(path);

                for(int i=0; i < _erros.Count; i++)
                {
                    objEscrita.WriteLine(_erros[i]);
                }
                objEscrita.Close();
            }

            return path;
        }
      
    }
    

    public class InfImportacao
    {
        private int _idImportacao;
        private string _nomeArquivo;
        private DateTime _dataImportacao;

        public int IdImportacao
        {
            get { return _idImportacao; }
            set { _idImportacao = value; }
        }
        public string NomeArquivo
        {
            get { return _nomeArquivo; }
            set { _nomeArquivo = value; }
        }
        public DateTime DataImportacao
        {
            get { return _dataImportacao; }
            set { _dataImportacao = value; }
        }
       
        public InfImportacao()
        {
            this._idImportacao = 0;
            this._nomeArquivo = string.Empty;
            this._dataImportacao = new DateTime();
        }
    }
}