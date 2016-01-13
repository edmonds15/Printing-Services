using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PrintingServices.DistrictForms {
    public partial class getForms : System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e) {
            // Check whether the user is authorized
            string user = HttpContext.Current.User.Identity.Name.Split("\\".ToCharArray())[1];
            if (Session["user"] != null) {
                user = Session["user"].ToString();
            }
            Session["user"] = user;
            if (!PrintingServices.Validate.isStaff(user)) {
                Response.Write("Not Authorized.");
                Response.End();
            }

            List<string> forms = new List<string>();
            OleDbConnection conn = new OleDbConnection(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=\\miso\shares\Groups\DCP\PS Data\PS5_be.accdb");
            try {
                conn.Open();
                // Get all district forms
                string query = "SELECT Form FROM [District Forms Table]";
                OleDbCommand cmd = new OleDbCommand(query, conn);
                OleDbDataReader reader = cmd.ExecuteReader();
                while (reader.Read()) {
                    forms.Add(reader.GetString(0));
                }
                reader.Close();

                // Send data
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                string formsJson = serializer.Serialize(forms);
                Response.Write(formsJson);
                conn.Close();
            } catch (Exception err) {
                conn.Close();
                Response.Write(err.Message);
            }
        }
    }
}