using projeto.DAL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace projeto.Models
{
    public class Produtos
    {
        private int _idProduto;
        private string _nomeProduto;
        private string _unidadeProduto;
        private decimal _valorProduto;
        private int _quantidadeProduto;
        private decimal _valorTotal;
        private string _corProduto;
        private string _tipoPlano;
        private int _idMarca;
        private DalProduto _objDal;

        public int ID
        {
            get
            {
                return this._idProduto;
            }
            set
            {
                this._idProduto = value;
            }
        }
        public string NomeProduto {
            get
            {
                return this._nomeProduto;
            }
            set
            {
                this._nomeProduto = value;
            }
        }

        public string Unidade {
            get
            {
                return this._unidadeProduto;
            }
            set
            {
                this._unidadeProduto = value;
            }
        }
        public int Quantidade {
            get
            {
                return this._quantidadeProduto;
            } set
            {
                this._quantidadeProduto = value;
            }
        }

        public decimal Valor {
            get
            {
                return this._valorProduto;
            }
            set
            {
                this._valorProduto = value;
            }
        }

        public decimal ValorTotal {
            get
            {
                return this._valorTotal;
            }
            set
            {
                this._valorTotal = value;
            }
        }

        public string CorProduto
        {
            get
            {
                return this._corProduto;
            }
            set
            {
                this._corProduto = value;
            }
        }

        public string TipoPlano
        {
            get
            {
                return this._tipoPlano;
            }
            set
            {
                this._tipoPlano = value;
            }
        }

        public int Marca
        {
            get
            {
                return this._idMarca;
            }
            set
            {
                this._idMarca = value;
            }
        }


        public Produtos(int id, string nome, decimal valor, int quantidade, string cor, string plano, int marca)
        {
            this._idProduto = id;
            this._nomeProduto = nome;
            this._valorProduto = valor;
            this._quantidadeProduto = quantidade;
            this._corProduto = cor;
            this._tipoPlano = plano;
            this._idMarca = marca;
        }


        public Produtos()
        {
            _objDal = new DalProduto();
        }

        public List<Produtos> SelecionarProdutos(string nomeProduto)
        {
            List<Produtos> listaProdutos = new List<Produtos>();
            listaProdutos  = _objDal.SelecionarProdutos(nomeProduto);

            return listaProdutos;
        }

        public void salvarProduto(Produtos Info)
        {
            int codigoProduto = produtoJaExiste(Info);

            if (codigoProduto == 0)
                _objDal.insereProduto(Info);
            else
            {
                Info.ID = codigoProduto;
                _objDal.atualizaProduto(Info);
            }
        }

        public int produtoJaExiste(Produtos prod)
        {
            int codigoProduto = _objDal.verificaProdutoExiste(prod);
            return codigoProduto;
        }

        public bool validaProduto(string[] linhaSeparada)
        {
            bool valido = true;
            double valorProduto = 0;
            int quantidadeProduto = 0;

            if (!double.TryParse(linhaSeparada[5], out valorProduto))
            {
                valido = false;
            }
            else
            {
                if (valorProduto > 999999)
                    valido = false;
            }

            if (!int.TryParse(linhaSeparada[4], out quantidadeProduto))
                valido = false;

            return valido;
        }

    }
}