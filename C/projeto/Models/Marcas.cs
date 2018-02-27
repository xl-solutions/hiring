using projeto.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace projeto.Models
{
    public class Marcas
    {
        private int _idMarca;
        private string _nomeMarca;
        private DalMarca _objDal;

        public Marcas()
        {
            _objDal = new DalMarca();
        }
        public int ID
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
        public string Nome
        {
            get
            {
                return this._nomeMarca;
            }
            set
            {
                this._nomeMarca = value;
            }
        }

        public int verificaMarcaExiste(string nome)
        {
            int codigo = 0;
            codigo = _objDal.verificaMarcaExiste(nome);

            return codigo;
        }

        public int insereMarca(Marcas obj)
        {
            int codigo = 0;
            _objDal.insereMarca(obj);
            return codigo;
        }
    }
}