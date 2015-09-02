using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.DirectoryServices;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PrintingServices.DistrictForms {
    public partial class recordDF : System.Web.UI.Page {
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

            string form = Request.Form["form"].ToString();
            string loc = Request.Form["loc"].ToString();
            int num = Convert.ToInt32(Request.Form["num"].ToString());
            string comment = Request.Form["comment"].ToString();
            string description = "(" + num + ") " + form;
            DateTime day = DateTime.Now;
            string received = day.ToShortDateString();

            string name = "";
            string phone = "";
            string requesterLoc = "";
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
                if (result.Properties.Contains("telephonenumber")) {
                    phone = result.Properties["telephonenumber"][0].ToString();
                }
                if (result.Properties.Contains("physicaldeliveryofficename")) {
                    requesterLoc = result.Properties["physicaldeliveryofficename"][0].ToString();
                }
            } catch (Exception err) {
                Response.Write(err.Message);
                Response.End();
            }

            OleDbConnection conn = new OleDbConnection(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=\\miso\shares\Groups\DCP\Testing\Jonathan\PS4_be_Jonathan.accdb");
            try {
                conn.Open();
                string query = @"SELECT * FROM [PS Jobs] WHERE Reference_No LIKE 'FormReq #%' ORDER BY ID DESC";
                OleDbCommand cmd = new OleDbCommand(query, conn);
                OleDbDataReader reader = cmd.ExecuteReader();
                string refNo = "";
                string newRefNo = "FormReq #1";
                if (reader.Read()) {
                    refNo = reader.GetString(reader.GetOrdinal("Reference_No")).Split("#".ToCharArray())[1];
                    newRefNo = "FormReq #" + (Convert.ToInt32(refNo) + 1);
                }
                reader.Close();

                query = @"INSERT INTO [PS Jobs] (Reference_No, Description, KeyCode, Account_Code, Requester, Requester_phone, Requester_school_dept, Date_Recieved, Instructions, Job_Status, Notes)
                                VALUES (@refNo, @desc, 30, '9700 13 0570 097 7441 0000', @name, @phone, @requesterLoc, @received, @loc, 'Processed', @comment)";
                cmd = new OleDbCommand(query, conn);
                cmd.Parameters.AddWithValue("@refNo", newRefNo);
                cmd.Parameters.AddWithValue("@desc", description);
                cmd.Parameters.AddWithValue("@name", name);
                cmd.Parameters.AddWithValue("@phone", phone);
                cmd.Parameters.AddWithValue("@requesterLoc", requesterLoc);
                cmd.Parameters.AddWithValue("@received", received);
                cmd.Parameters.AddWithValue("@loc", loc);
                cmd.Parameters.AddWithValue("@comment", comment);

                int rows = cmd.ExecuteNonQuery();
                if (rows == 1) {
                    Response.Write(rows + " row affected from recordDF.");
                } else {
                    Response.Write(rows + " rows affected from recordDF. Error.");
                }
                conn.Close();
            } catch (Exception err) {
                conn.Close();
                Response.Write(err.Message);
            }
        }
    }
}