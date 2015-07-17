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
            if (isAdmin(user) && Request.QueryString["user"] != null) {
                user = Request.QueryString["user"];
            }
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

        private string userType(string user) {
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

        private bool isAdmin(string user) {
            StreamReader stream = new StreamReader("C:\\passwords\\passwordDCP.csv");
            string data = stream.ReadLine();
            stream.Close();
            char[] split = { ',' };
            string[] connectInfo = data.Split(split);
            SqlConnection conn = new SqlConnection("Server=" + connectInfo[0] + ";Database=" + connectInfo[1] + ";User Id=" + connectInfo[2] + ";Password=" + connectInfo[3] + ";");
            try {
                conn.Open();
                string query = @"SELECT username, role FROM PS_Users WHERE username = @User";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@User", user);
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read()) {
                    string role = reader.GetString(1);
                    if (role.ToLower().Contains("admin")) {
                        conn.Close();
                        return true;
                    } else {
                        conn.Close();
                        return false;
                    }
                } else {
                    conn.Close();
                    return false;
                }
            } catch {
                conn.Close();
                return false;
            }
        }
    }
}