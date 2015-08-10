using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.DirectoryServices;
using System.IO;
using System.Data.SqlClient;

namespace PrintingServices {
    public partial class index : System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e) {
            error.Visible = false;

            string user = HttpContext.Current.User.Identity.Name.Split("\\".ToCharArray())[1];
            if (PrintingServices.Validate.isAdmin(user) && Request.QueryString["user"] != null) {
                user = Request.QueryString["user"];
            }
            Session["user"] = user;
            name.Mode = LiteralMode.Encode;
            name.Text = getUserName(user);

            if (!getUserType(user).Equals("staff")) {
                body.Visible = false;
                error.Visible = true;
                if (errormsg.Text == "") {
                    errormsg.Text = "Unauthorized Credentials.";
                }
            }

            if (Session["tab"] == null) {
                Session["tab"] = "0";
            }
            tabNum.Text = Session["tab"].ToString();
        }

        private string getUserName(string user) {
            try {
                DirectoryEntry entry = new DirectoryEntry("LDAP://edmonds.wednet.edu");
                DirectorySearcher search = new DirectorySearcher(entry);
                search.Filter = "(samaccountname=" + user + ")";
                SearchResult result = search.FindOne();
                if (result == null) {
                    body.Visible = false;
                    error.Visible = true;
                    errormsg.Text = "Login name not found.";
                    return "No Name";
                }
                return result.Properties["name"][0].ToString();
            } catch (Exception err) {
                body.Visible = false;
                error.Visible = true;
                errormsg.Text = err.Message;
                return "Unknown";
            }
        }

        private string getUserType(string user) {
            try {
                DirectoryEntry entry = new DirectoryEntry("LDAP://edmonds.wednet.edu");
                DirectorySearcher search = new DirectorySearcher(entry);
                search.Filter = "(samaccountname=" + user + ")";
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