using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.DirectoryServices;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PrintingServices.CustomPrintshop {
    public partial class recordCP : System.Web.UI.Page {
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

            string desc = Request.Form["desc"].ToString();
            string fulfill = Request.Form["fulfill"].ToString();
            HttpFileCollection files = Request.Files;
            string comment = "";
            if (files.Count == 0) {
                comment = "No attached documents.";
            } else if (files.Count == 1) {
                comment = "1 attached document.";
            } else {
                comment = files.Count + " attached documents.";
            }
            string keyCode = "";
            if (Request.Form["keyCode"] != null) {
                keyCode = Request.Form["keyCode"].ToString();
            }
            string acctCode = "";
            if (Request.Form["acctCode"] != null) {
                acctCode = Request.Form["acctCode"].ToString();
            }
            string instruct = Request.Form["instruct"].ToString();
            string received = DateTime.Now.ToShortDateString();

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
                Response.Write(err);
                Response.End();
            }

            OleDbConnection conn = new OleDbConnection(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=\\miso\shares\Groups\DCP\Testing\Jonathan\PS4_be_Jonathan.accdb");
            try {
                conn.Open();
                string query = @"SELECT * FROM [PS Jobs] WHERE Reference_No LIKE 'CustomReq #%' ORDER BY ID DESC";
                OleDbCommand cmd = new OleDbCommand(query, conn);
                OleDbDataReader reader = cmd.ExecuteReader();
                string refNo = "";
                string newRefNo = "CustomReq #1";
                if (reader.Read()) {
                    refNo = reader.GetString(reader.GetOrdinal("Reference_No")).Split("#".ToCharArray())[1];
                    newRefNo = "CustomReq #" + (Convert.ToInt32(refNo) + 1);
                }
                reader.Close();

                query = @"INSERT INTO [PS Jobs] (Reference_No, Description, KeyCode, Account_Code, Requester, Requester_phone, Requester_school_dept, Date_Recieved, Date_Needed, Instructions, Job_Status, Notes)
                                VALUES (@refNo, @desc, @keyCode, @acctCode, @name, @phone, @requesterLoc, @received, @fulfill, @instruct, 'Processed', @comment)";
                cmd = new OleDbCommand(query, conn);
                cmd.Parameters.AddWithValue("@refNo", newRefNo);
                cmd.Parameters.AddWithValue("@desc", desc);
                cmd.Parameters.AddWithValue("@keyCode", keyCode);
                cmd.Parameters.AddWithValue("@acctCode", acctCode);
                cmd.Parameters.AddWithValue("@name", name);
                cmd.Parameters.AddWithValue("@phone", phone);
                cmd.Parameters.AddWithValue("@requesterLoc", requesterLoc);
                cmd.Parameters.AddWithValue("@received", received);
                cmd.Parameters.AddWithValue("@fulfill", fulfill);
                cmd.Parameters.AddWithValue("@instruct", instruct);
                cmd.Parameters.AddWithValue("@comment", comment);

                int rows = cmd.ExecuteNonQuery();
                if (rows == 1) {
                    Response.Write(rows + " row affected from recordCP.\n");
                } else {
                    Response.Write(rows + " rows affected from recordCP. Error.\n");
                }

                query = @"SELECT ID FROM [PS Jobs] WHERE Reference_No = @refNo";
                cmd = new OleDbCommand(query, conn);
                cmd.Parameters.AddWithValue("@refNo", newRefNo);
                reader = cmd.ExecuteReader();

                int id = 0;
                if (reader.Read()) {
                    id = reader.GetInt32(0);
                }
                reader.Close();

                for (int i = 0; i < files.Count; i++) {
                    string fileName = id + "_" + files[i].FileName;
                    files[i].SaveAs("\\\\miso\\shares\\Groups\\DCP\\Testing\\Jonathan\\" + fileName);
                    query = @"INSERT INTO Attachments (PSJobID, FileN) VALUES (@id, @name)";
                    cmd = new OleDbCommand(query, conn);
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@name", fileName + "#\\\\miso\\shares\\Groups\\DCP\\Testing\\Jonathan\\" + fileName);
                    cmd.ExecuteNonQuery();
                }
                if (files.Count == 1) {
                    Response.Write(files.Count + " attachment saved from recordCP.\n");
                } else {
                    Response.Write(files.Count + " attachments saved from recordCP.\n");
                }
                conn.Close();

            } catch (Exception err) {
                conn.Close();
                Response.Write(err);
            }
        }
    }
}