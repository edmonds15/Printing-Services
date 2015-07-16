using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.DirectoryServices;

namespace PrintingServices {
    public partial class index : System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e) {
            error.Visible = false;
            string user = HttpContext.Current.User.Identity.Name.Split("\\".ToCharArray())[1];
            name.Mode = LiteralMode.Encode;
            name.Text = user;
            if (!userType(user).Equals("staff")) {
                body.Visible = false;
                error.Visible = true;
                if (errormsg.Text == "") {
                    errormsg.Text = "Unauthorized Credentials.";
                }
            }
        }

        private string userType(string username) {
            try {
                DirectoryEntry entry = new DirectoryEntry("LDAP://edmonds.wednet.edu");
                DirectorySearcher search = new DirectorySearcher(entry);
                search.Filter = "(samaccountname=" + username + ")";
                SearchResult result = search.FindOne();
                if (result == null) {
                    body.Visible = false;
                    error.Visible = true;
                    errormsg.Text = "Login name not found.";
                    return "No Name";
                }
                return result.Properties["employeetype"][0].ToString().ToLower();
            } catch (Exception err) {
                body.Visible = false;
                error.Visible = true;
                errormsg.Text = err.Message;
                return "Unknown";
            }
        }
    }
}