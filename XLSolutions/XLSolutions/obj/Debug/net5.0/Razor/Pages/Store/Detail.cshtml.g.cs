#pragma checksum "C:\Users\mazze\source\repos\XLSolutions\XLSolutions\Pages\Store\Detail.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "137c921562967e632083977a4c4873f67a79ba95"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(XLSolutions.Pages.Store.Pages_Store_Detail), @"mvc.1.0.razor-page", @"/Pages/Store/Detail.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure.RazorPageAttribute(@"/Pages/Store/Detail.cshtml", typeof(XLSolutions.Pages.Store.Pages_Store_Detail), @"{phoneId:int}")]
namespace XLSolutions.Pages.Store
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "C:\Users\mazze\source\repos\XLSolutions\XLSolutions\Pages\_ViewImports.cshtml"
using XLSolutions;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemMetadataAttribute("RouteTemplate", "{phoneId:int}")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"137c921562967e632083977a4c4873f67a79ba95", @"/Pages/Store/Detail.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"fd1bef82f84254888551fa415c041645cbe9bf1d", @"/Pages/_ViewImports.cshtml")]
    public class Pages_Store_Detail : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#line 3 "C:\Users\mazze\source\repos\XLSolutions\XLSolutions\Pages\Store\Detail.cshtml"
  
    ViewData["Title"] = "Detail";

#line default
#line hidden
            BeginContext(109, 35, true);
            WriteLiteral("\r\n<div class=\"container\">\r\n    <h1>");
            EndContext();
            BeginContext(145, 17, false);
#line 8 "C:\Users\mazze\source\repos\XLSolutions\XLSolutions\Pages\Store\Detail.cshtml"
   Write(Model.Phone.Brand);

#line default
#line hidden
            EndContext();
            BeginContext(162, 15, true);
            WriteLiteral("</h1>\r\n    <h4>");
            EndContext();
            BeginContext(178, 17, false);
#line 9 "C:\Users\mazze\source\repos\XLSolutions\XLSolutions\Pages\Store\Detail.cshtml"
   Write(Model.Phone.Model);

#line default
#line hidden
            EndContext();
            BeginContext(195, 28, true);
            WriteLiteral("</h4>\r\n    <h4>\r\n        <b>");
            EndContext();
            BeginContext(224, 16, false);
#line 11 "C:\Users\mazze\source\repos\XLSolutions\XLSolutions\Pages\Store\Detail.cshtml"
      Write(Model.Phone.Type);

#line default
#line hidden
            EndContext();
            BeginContext(240, 6, true);
            WriteLiteral("</b>\r\n");
            EndContext();
#line 12 "C:\Users\mazze\source\repos\XLSolutions\XLSolutions\Pages\Store\Detail.cshtml"
         if (Model.Phone.SubType != null)
        {

#line default
#line hidden
            BeginContext(300, 15, true);
            WriteLiteral("            <b>");
            EndContext();
            BeginContext(316, 19, false);
#line 14 "C:\Users\mazze\source\repos\XLSolutions\XLSolutions\Pages\Store\Detail.cshtml"
          Write(Model.Phone.SubType);

#line default
#line hidden
            EndContext();
            BeginContext(335, 6, true);
            WriteLiteral("</b>\r\n");
            EndContext();
#line 15 "C:\Users\mazze\source\repos\XLSolutions\XLSolutions\Pages\Store\Detail.cshtml"
        }

#line default
#line hidden
            BeginContext(352, 26, true);
            WriteLiteral("    </h4>\r\n    <h4>Price: ");
            EndContext();
            BeginContext(379, 56, false);
#line 17 "C:\Users\mazze\source\repos\XLSolutions\XLSolutions\Pages\Store\Detail.cshtml"
          Write(Model.Phone.Price.ToString("C", Model.GetNumberFormat()));

#line default
#line hidden
            EndContext();
            BeginContext(435, 19, true);
            WriteLiteral("</h4>\r\n</div>\r\n\r\n\r\n");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<XLSolutions.Pages.Store.DetailModel> Html { get; private set; }
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<XLSolutions.Pages.Store.DetailModel> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<XLSolutions.Pages.Store.DetailModel>)PageContext?.ViewData;
        public XLSolutions.Pages.Store.DetailModel Model => ViewData.Model;
    }
}
#pragma warning restore 1591
