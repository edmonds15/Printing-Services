using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PrintingServices.CatalogItem {
    public partial class getItems : System.Web.UI.Page {
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

            List<string> items = new List<string>();
            OleDbConnection conn = new OleDbConnection(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=\\miso\shares\Groups\DCP\PS Data\PS5_be.accdb");
            try {
                conn.Open();
                // Get all catalog items
                string query = "SELECT Item FROM Catalog_Items";
                OleDbCommand cmd = new OleDbCommand(query, conn);
                OleDbDataReader reader = cmd.ExecuteReader();
                while (reader.Read()) {
                    items.Add(reader.GetString(0));
                }
                reader.Close();

                // Send data
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                string itemsJson = serializer.Serialize(items);
                Response.Write(itemsJson);
                conn.Close();
            } catch (Exception err) {
                conn.Close();
                Response.Write(err.Message);
            }
        }
    }
}