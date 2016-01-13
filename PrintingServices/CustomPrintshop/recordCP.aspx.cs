using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.DirectoryServices;
using System.Linq;
using System.IO;      // Chris added  20150924
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PrintingServices.CustomPrintshop {
    public partial class recordCP : System.Web.UI.Page {
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
            string desc = Request.Form["desc"].ToString();
            string to = Request.Form["to"].ToString();
            string fulfill = Request.Form["fulfill"].ToString();
            HttpFileCollection files = Request.Files;
            string keyCode = Request.Form["keyCode"].ToString();
            string acctCode = Request.Form["acctCode"].ToString();
            string type = Request.Form["type"].ToString();
            string num = Request.Form["num"].ToString();
            string sideCP = Request.Form["sideCP"].ToString();
            //string side = Request.Form["side"].ToString();
            string instruct = Request.Form["instruct"].ToString();
            string instructions = "type: " + type + ", quantity: " + num + ", sided: " + sideCP + ", other: " + instruct;
            //string instructions = "type: " + type + ", quantity: " + num + ", sided: " + side + ", other: " + instruct;
            string received = DateTime.Now.ToShortDateString();
            string comment = "";
            if (files.Count == 0) {
                comment = "No attached documents.";
            } else if (files.Count == 1) {
                comment = "1 attached document.";
            } else {
                comment = files.Count + " attached documents.";
            }
            string output = "";

            // Get user info from AD
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

            // Connect to database
            OleDbConnection conn = new OleDbConnection(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=\\miso\shares\Groups\DCP\PS Data\PS5_be.accdb");
            try {
                conn.Open();
                // Get the latest reference number
                string query = @"SELECT * FROM [PS Jobs] WHERE Reference_No LIKE 'CstmReq #%' ORDER BY ID DESC";
                OleDbCommand cmd = new OleDbCommand(query, conn);
                OleDbDataReader reader = cmd.ExecuteReader();
                // Set this reference number one higher
                string refNo = "";
                string newRefNo = "CstmReq #1";
                if (reader.Read()) {
                    refNo = reader.GetString(reader.GetOrdinal("Reference_No")).Split("#".ToCharArray())[1];
                    newRefNo = "CstmReq #" + (Convert.ToInt32(refNo) + 1);
                }
                reader.Close();

                // Enter info into database
                query = "";
                if (fulfill.Equals("")) {
                    query = @"INSERT INTO [PS Jobs] (Reference_No, Description, BW_Color, KeyCode, Account_Code, Requester, Requester_phone, Requester_school_dept, Deliver_To, Date_Recieved, Instructions, Job_Status, Notes)
                                VALUES (@refNo, @desc, @type, @keyCode, @acctCode, @name, @phone, @requesterLoc, @to, @received, @instruct, 'Processed', @comment)";
                } else {
                    query = @"INSERT INTO [PS Jobs] (Reference_No, Description, BW_Color, KeyCode, Account_Code, Requester, Requester_phone, Requester_school_dept, Deliver_To, Date_Recieved, Date_Needed, Instructions, Job_Status, Notes)
                                VALUES (@refNo, @desc, @type, @keyCode, @acctCode, @name, @phone, @requesterLoc, @to, @received, @fulfill, @instruct, 'Processed', @comment)";
                }
                cmd = new OleDbCommand(query, conn);
                cmd.Parameters.AddWithValue("@refNo", newRefNo);
                cmd.Parameters.AddWithValue("@desc", desc);
                cmd.Parameters.AddWithValue("@type", type);
                cmd.Parameters.AddWithValue("@keyCode", keyCode);
                cmd.Parameters.AddWithValue("@acctCode", acctCode);
                cmd.Parameters.AddWithValue("@name", name);
                cmd.Parameters.AddWithValue("@phone", phone);
                cmd.Parameters.AddWithValue("@requesterLoc", requesterLoc);
                cmd.Parameters.AddWithValue("@to", to);
                cmd.Parameters.AddWithValue("@received", received);
                if (!fulfill.Equals("")) {
                    cmd.Parameters.AddWithValue("@fulfill", fulfill);
                }
                cmd.Parameters.AddWithValue("@instruct", instructions);
                cmd.Parameters.AddWithValue("@comment", comment);

                int rows = cmd.ExecuteNonQuery();

                // Get the ID of the newly created job
                query = @"SELECT ID FROM [PS Jobs] WHERE Reference_No = @refNo";
                cmd = new OleDbCommand(query, conn);
                cmd.Parameters.AddWithValue("@refNo", newRefNo);
                reader = cmd.ExecuteReader();

                int id = 0;
                if (reader.Read()) {
                    id = reader.GetInt32(0);
                }
                reader.Close();

                // Write ID to output
                output += "Request ID:" + id + "\n";

                // Write written rows to output
                if (rows == 1) {
                    output += rows + " row affected from recordCP.\n";
                } else {
                    output += rows + " rows affected from recordCP. Error.\n";
                }

                // Use ID to rename the files, write them to the server, and enter in database
                rows = 0;
                for (int i = 0; i < files.Count; i++) {

                    //string fileName = id + "_" + files[i].FileName;     // Chris added comment 20510924

                    // Chris is testing these next several lines;   Needed to add  "using System.IO"  up at top of this page for next line to work    added 20510924
                    string fileName = id + "_" + Path.GetFileName(files[i].FileName);
                    //Response.Write("Path: " + fileName);      // Jonathan removed to fix display bug 20151221   

                    // End Chris testing


                    files[i].SaveAs("\\\\miso\\shares\\Groups\\DCP\\PS Data\\Attachments\\" + fileName);     
                    query = @"INSERT INTO Attachments (PSJobID, FileN) VALUES (@id, @name)";
                    cmd = new OleDbCommand(query, conn);
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@name", fileName + "#\\\\miso\\shares\\Groups\\DCP\\PS Data\\Attachments\\" + fileName);  
                    rows += cmd.ExecuteNonQuery();
                }
                if (rows != files.Count) {
                    Response.Write("Files saved incorrectly");
                    Response.End();
                }
                // Send number of written files
                if (files.Count == 1) {
                    output += files.Count + " attachment saved from recordCP.";
                } else {
                    output += files.Count + " attachments saved from recordCP.";
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