using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.DirectoryServices;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PrintingServices.History {
    public partial class getHistory : System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e) {
            string user = HttpContext.Current.User.Identity.Name.Split("\\".ToCharArray())[1];
            if (Session["user"] != null) {
                user = Session["user"].ToString();
            }
            Session["user"] = user;
            if (!PrintingServices.Validate.isStaff(user)) {
                Response.Write("Not Authorized.");
                Response.End();
            }

            string name = "";
            string firstName = "";
            string lastName = "";
            try {
                DirectoryEntry entry = new DirectoryEntry("LDAP://edmonds.wednet.edu");
                DirectorySearcher search = new DirectorySearcher(entry);
                search.Filter = "(samaccountname=" + user + ")";
                SearchResult result = search.FindOne();
                if (result == null) {
                    Response.Write("Username not found");
                    Response.End();
                }
                name = result.Properties["name"][0].ToString();
                firstName = result.Properties["givenname"][0].ToString();
                lastName = result.Properties["sn"][0].ToString();
            } catch (Exception err) {
                Response.Write(err);
                Response.End();
            }

            List<Dictionary<string, string>> entries = new List<Dictionary<string, string>>();
            OleDbConnection conn = new OleDbConnection(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=\\miso\shares\Groups\DCP\Testing\Jonathan\PS4_be_Jonathan.accdb");
            try {
                conn.Open();
                string query = "SELECT Description, Date_Recieved, Job_Status, Date_completed FROM [PS Jobs] WHERE Requester = @requesterFull OR Requester = @requesterPartial ORDER BY ID DESC";
                OleDbCommand cmd = new OleDbCommand(query, conn);
                cmd.Parameters.AddWithValue("@requesterFull", name);
                cmd.Parameters.AddWithValue("@requesterPartial", firstName + " " + lastName);
                OleDbDataReader reader = cmd.ExecuteReader();

                while (reader.Read()) {
                    Dictionary<string, string> entry = new Dictionary<string, string>();
                    if (!reader.IsDBNull(reader.GetOrdinal("Date_Recieved"))) {
                        entry.Add("description", reader.GetString(reader.GetOrdinal("Description")));
                    }
                    if (!reader.IsDBNull(reader.GetOrdinal("Date_Recieved"))) {
                        entry.Add("received", reader.GetDateTime(reader.GetOrdinal("Date_Recieved")).ToShortDateString());
                    }
                    if (!reader.IsDBNull(reader.GetOrdinal("Job_Status"))) {
                        entry.Add("status", reader.GetString(reader.GetOrdinal("Job_Status")));
                    }
                    if (!reader.IsDBNull(reader.GetOrdinal("Date_completed"))) {
                        entry.Add("completed", reader.GetDateTime(reader.GetOrdinal("Date_completed")).ToShortDateString());
                    }
                    entries.Add(entry);
                }
                reader.Close();

                JavaScriptSerializer serializer = new JavaScriptSerializer();
                string entriesJson = serializer.Serialize(entries);
                Response.Write(entriesJson);
                conn.Close();
            } catch (Exception err) {
                conn.Close();
                Response.Write(err);
            }
        }
    }
}