using projeto.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace projeto.Controllers
{
    public class UploadController : Controller
    {
        // GET: Upload
        public ActionResult Index()
        {
            return View();
        }

        public FileResult Dowload()
        {
            string contentType = "application/txt";
            return File("~/Arquivos/erros/erros-importacao.csv", contentType, "erros.txt");
        }

        public ActionResult ResumoImportacao(List<ResumoImportacao> listaResumo)
        {
           return View(listaResumo);
        }

        public ActionResult Upload(HttpPostedFileBase Files)
        {
            string mensagem = string.Empty;

            // Verifica se o usuário selecionou algum arquivo
            if (Files != null && Files.ContentLength > 0)
            {               
                // Extrai apenas o nome do arquivo
                var fileName = Path.GetFileName(Files.FileName);
                // Armazena o arquivo dentro da pasta ~/Arquivo
                var path = Path.Combine(Server.MapPath("~/Arquivos"), fileName);              

                Importacao imp = new Importacao();
                imp.Info.NomeArquivo =path;

                if (imp.validaArquivo())
                {
                    if (!imp.verifcaJaImportou(path))
                    {
                        Files.SaveAs(path);
                        imp.Info.DataImportacao = DateTime.Now;
                        imp.inserirImportacao();
                        imp.processaImportacao();
                        List<ResumoImportacao> erros = imp.ResumoImportacao;
                        mensagem = imp.Mensagem;
                        imp = null;

                        if (erros[0].QuantidadeErros > 0)
                            ViewBag.Erros = "Sim";
                        else
                            ViewBag.Erros = "Não";

                        return View("ResumoImportacao",erros);
                    }
                    else
                    {
                        mensagem = "O arquivo já foi importado";
                        ViewBag.Mensagem = mensagem;
                        imp = null;
                        return View("Index");
                    }
                }
                else
                {
                    mensagem = imp.Mensagem;
                    ViewBag.Mensagem=mensagem;
                    imp = null;
                    return View("Index");
                }

            }
            else
            {
                mensagem = "Nenhum arquivo foi selecionado";
                return View("Index");
            }

            
        }
    }
}