using LojaVirtual.Models;
using LojaVirtual.Repositorio;
using System.Collections.Generic;
using System.Web.Mvc;

namespace LojaVirtual.Controllers
{
    public class ProdutosController : Controller
    {

        private ProdutoRepositorio _repositorioProduto;

        // GET: Produtos
        public ActionResult Index()
        {
            return View(new List<ProdutoModel>());
        }

        [HttpGet]
        public ActionResult Index(string Pesquisar, string Gender)
        {
            _repositorioProduto = new ProdutoRepositorio();
            switch (Gender)
            {
                case "Modelo":
                    return View(_repositorioProduto.ObterProdutosPorModelo(Pesquisar));
                case "Fabricante":
                    return View(_repositorioProduto.ObterProdutosPorFabricante(Pesquisar));
                case "PlanodeVenda":
                    return View(_repositorioProduto.ObterProdutosPorTipoVenda(Pesquisar));
                default:
                    if (string.IsNullOrEmpty(Pesquisar))
                        return View(_repositorioProduto.ObterProdutos(Pesquisar));
                    else
                    {
                        ViewBag.Message = "Por favor informar o tipo de pesquisa.";
                        return View(new List<ProdutoModel>());
                    }
            }

        }
    }
}