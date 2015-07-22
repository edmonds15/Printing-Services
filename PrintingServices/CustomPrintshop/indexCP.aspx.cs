using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PrintingServices.CustomPrintshop {
    public partial class index : System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e) {
            Session["tab"] = "3";
            string user = Session["user"].ToString();
            name.Value = getFullName(user);
            date.Value = DateTime.Now.ToShortDateString();
        }

        private string getFullName(string user) {
            try {
                DirectoryEntry entry = new DirectoryEntry("LDAP://edmonds.wednet.edu");
                DirectorySearcher search = new DirectorySearcher(entry);
                search.Filter = "(samaccountname=" + user + ")";
                SearchResult result = search.FindOne();
                if (result == null) {
                    return "unknown";
                }
                return result.Properties["givenname"][0] + " " + result.Properties["sn"][0];
            } catch {
                return "unknown";
            }
        }
    }
}