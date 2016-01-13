using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PrintingServices.CatalogItem {
    public partial class indexCI : System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e) {
            // Set recently viewed tab as Catalogue tab.
            Session["tab"] = "5";
        }
    }
}