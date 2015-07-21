using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PrintingServices.History {
    public partial class index : System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e) {
            Session["tab"] = "4";
            //OleDbConnection conn = new OleDbConnection(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=\\miso\shares\Groups\DCP\Testing\Jonathan\PS4_be_Jonathan.accdb");
            //conn.Open();
        }
    }
}