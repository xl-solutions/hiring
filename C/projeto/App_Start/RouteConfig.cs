using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace projeto
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Upload", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
               name: "Produtos",
               url: "{controller}/{action}/{id}",
               defaults: new { controller = "Produtos", action = "Index", id = UrlParameter.Optional }
           );

            routes.MapRoute(
                 name: "Resumo",
                 url: "{controller}/{action}/{id}",
                 defaults: new { controller = "Upload", action = "ResumoImportacao", id = UrlParameter.Optional }
             );

        }
    }
}
