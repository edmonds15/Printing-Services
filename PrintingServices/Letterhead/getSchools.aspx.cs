using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PrintingServices.Letterhead {
    public partial class getSchools : System.Web.UI.Page {
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

            List<Dictionary<string, string>> schools = new List<Dictionary<string, string>>();
            OleDbConnection conn = new OleDbConnection(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=\\miso\shares\Groups\DCP\PS Data\PS5_be.accdb");
            try {
                conn.Open();
                // Get all catalog items
                string query = "SELECT * FROM Letterhead_Schools";
                OleDbCommand cmd = new OleDbCommand(query, conn);
                OleDbDataReader reader = cmd.ExecuteReader();
                while (reader.Read()) {
                    Dictionary<string, string> school = new Dictionary<string, string>();
                    school.Add("name", reader.GetString(reader.GetOrdinal("SchoolName")));

                    if (!reader.IsDBNull(reader.GetOrdinal("Address"))) {
                        school.Add("address", reader.GetString(reader.GetOrdinal("Address")));
                    } else {
                        school.Add("address", "");
                    }

                    if (!reader.IsDBNull(reader.GetOrdinal("Phone"))) {
                        school.Add("phone", reader.GetString(reader.GetOrdinal("Phone")));
                    } else {
                        school.Add("phone", "");
                    }

                    if (!reader.IsDBNull(reader.GetOrdinal("Fax"))) {
                        school.Add("fax", reader.GetString(reader.GetOrdinal("Fax")));
                    } else {
                        school.Add("fax", "");
                    }

                    schools.Add(school);
                }
                reader.Close();

                // Send data
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                string schoolsJson = serializer.Serialize(schools);
                Response.Write(schoolsJson);
                conn.Close();
            } catch (Exception err) {
                conn.Close();
                Response.Write(err.Message);
            }
        }
    }
}