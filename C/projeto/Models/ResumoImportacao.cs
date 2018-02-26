using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace projeto.Models
{
    public class ResumoImportacao
    {
        private int _quantidadeInserida;
        private int _quantidadeAtualizada;
        private int _quantidadeErro;
        private string _arquivoErros;

        public ResumoImportacao(int erros, int inseridos, int atualizados, string arquivo)
        {
            this._quantidadeAtualizada = atualizados;
            this._quantidadeErro = erros;
            this._quantidadeInserida = inseridos;
            this._arquivoErros = arquivo;
        }

        public int QuantidadeInserida
        {
            set
            {
                this._quantidadeInserida = value;
            }
            get
            {
                return this._quantidadeInserida;
            }
        }

        public int QuantidadeAtualizada
        {
            set
            {
                this._quantidadeInserida = value;
            }
            get
            {
                return this._quantidadeAtualizada;
            }
        }

        public int QuantidadeErros
        {
            set
            {
                this._quantidadeInserida=value;
            }
            get
            {
                return this._quantidadeErro;
            }
        }

        public string ArquivoErros {
            get
            {
                return this._arquivoErros;
            }
            set
            {
                this._arquivoErros = value;
            }
        }
    }

}