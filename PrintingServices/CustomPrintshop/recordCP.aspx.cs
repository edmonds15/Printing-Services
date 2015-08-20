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
                comment = "No documents attached.";
            } else if (files.Count == 1) {
                comment = "1 document attached.";
            } else {
                comment = files.Count + " documents attached.";
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
                string query = @"INSERT INTO [PS Jobs] (Reference_No, Description, KeyCode, Account_Code, Requester, Requester_phone, Requester_school_dept, Date_Recieved, Date_Needed, Instructions, Job_Status, Notes)
                                VALUES ('CustomReq', @desc, @keyCode, @acctCode, @name, @phone, @requesterLoc, @received, @fulfill, @instruct, 'Processed', @comment)";
                OleDbCommand cmd = new OleDbCommand(query, conn);
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
                    Response.Write(rows + " row affected from recordDF.\n");
                } else {
                    Response.Write(rows + " rows affected from recordDF. Error.\n");
                }

                query = @"SELECT ID FROM [PS Jobs] WHERE Instructions = @instruct";
                cmd = new OleDbCommand(query, conn);
                cmd.Parameters.AddWithValue("@instruct", instruct);
                OleDbDataReader reader = cmd.ExecuteReader();

                int id = 0;
                if (reader.Read()) {
                    id = reader.GetInt32(0);
                }
                reader.Close();
                conn.Close();

                for (int i = 0; i < files.Count; i++) {
                    files[i].SaveAs("\\\\miso\\shares\\Groups\\DCP\\Testing\\Jonathan\\" + id + "_" + files[i].FileName);
                }
                if (files.Count == 1) {
                    Response.Write(files.Count + " file written from recordCP.");
                } else {
                    Response.Write(files.Count + " files written from recordCP.");
                }
            } catch (Exception err) {
                conn.Close();
                Response.Write(err);
            }
        }
    }
}