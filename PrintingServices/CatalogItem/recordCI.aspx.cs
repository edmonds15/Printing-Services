using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.DirectoryServices;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PrintingServices.CatalogItem {
    public partial class recordCI : System.Web.UI.Page {
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

            // Pull info from request
            string item = Request.Form["item"].ToString();
            int num = Convert.ToInt32(Request.Form["num"].ToString());
            string to = Request.Form["to"].ToString();
            string comment = Request.Form["comment"].ToString();
            string keyCode = Request.Form["keyCode"].ToString();
            string acctCode = Request.Form["acctCode"].ToString();
            string description = num + " " + item;
            string received = DateTime.Now.ToShortDateString();
            string output = "";

            // Get name, phone, and location from AD
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

            OleDbConnection conn = new OleDbConnection(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=\\miso\shares\Groups\DCP\PS Data\PS5_be.accdb");
            try {
                conn.Open();
                // Get the next reference number
                string query = @"SELECT * FROM [PS Jobs] WHERE Reference_No LIKE 'ItemReq #%' ORDER BY ID DESC";
                OleDbCommand cmd = new OleDbCommand(query, conn);
                OleDbDataReader reader = cmd.ExecuteReader();
                // If no reference numbers found, set to 1
                string refNo = "";
                string newRefNo = "ItemReq #1";
                // If found, set to next number
                if (reader.Read()) {
                    refNo = reader.GetString(reader.GetOrdinal("Reference_No")).Split("#".ToCharArray())[1];
                    newRefNo = "ItemReq #" + (Convert.ToInt32(refNo) + 1);
                }
                reader.Close();

                // Put values into database
                query = @"INSERT INTO [PS Jobs] (Reference_No, Description, KeyCode, Account_Code, Requester, Requester_phone, Requester_school_dept, Deliver_To, Date_Recieved, Job_Status, Notes)
                                VALUES (@refNo, @desc, @keyCode, @acctCode, @name, @phone, @requesterLoc, @to, @received, 'Processed', @comment)";
                cmd = new OleDbCommand(query, conn);
                cmd.Parameters.AddWithValue("@refNo", newRefNo);
                cmd.Parameters.AddWithValue("@desc", description);
                cmd.Parameters.AddWithValue("@keyCode", keyCode);
                cmd.Parameters.AddWithValue("@acctCode", acctCode);
                cmd.Parameters.AddWithValue("@name", name);
                cmd.Parameters.AddWithValue("@phone", phone);
                cmd.Parameters.AddWithValue("@requesterLoc", requesterLoc);
                cmd.Parameters.AddWithValue("@to", to);
                cmd.Parameters.AddWithValue("@received", received);
                cmd.Parameters.AddWithValue("@comment", comment);

                // Write output
                int rows = cmd.ExecuteNonQuery();

                // Get Job ID
                query = @"SELECT ID FROM [PS Jobs] WHERE Reference_No = @refNo";
                cmd = new OleDbCommand(query, conn);
                cmd.Parameters.AddWithValue("@refNo", newRefNo);
                reader = cmd.ExecuteReader();
                int id = 0;
                if (reader.Read()) {
                    id = reader.GetInt32(reader.GetOrdinal("ID"));
                }

                output += "Request ID:" + id + "\n";

                if (rows == 1) {
                    output += rows + " row affected from recordCI.\n";
                } else {
                    output += rows + " rows affected from recordCI. Error.\n";
                }

                conn.Close();
                Response.Write(output);
            } catch (Exception err) {
                conn.Close();
                Response.Write(err.Message);
            }
        }
    }
}