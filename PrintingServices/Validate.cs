using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.DirectoryServices;
using System.IO;
using System.Linq;
using System.Web;

namespace PrintingServices {
    public static class Validate {
        // Names of computers that are excepted from check
        static string[] exceptions = {"information"};

        // Check the database for whether the given user is an admin.
        public static bool isAdmin(string user) {
            // Get the connection info from the server
            StreamReader stream = new StreamReader("C:\\passwords\\passwordDCP.csv");
            string data = stream.ReadLine();
            stream.Close();

            // Connect to the database
            string[] connectInfo = data.Split(",".ToCharArray());
            SqlConnection conn = new SqlConnection("Server=" + connectInfo[0] + ";Database=" + connectInfo[1] +
                ";User Id=" + connectInfo[2] + ";Password=" + connectInfo[3] + ";");

            try {
                conn.Open();
                // Look for the user in the database
                string query = @"SELECT username, role FROM PS_Users WHERE username = @User";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@User", user);
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read()) {
                    // Make sure their role is admin
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

        // Check whether the given user is listed as Staff in AD
        public static bool isStaff(string user) {
            if (exceptions.Contains(user)) {
                return true;
            } else {
                try {
                    // Connect to AD, search for user
                    DirectoryEntry entry = new DirectoryEntry("LDAP://edmonds.wednet.edu");
                    DirectorySearcher search = new DirectorySearcher(entry);
                    search.Filter = "(samaccountname=" + user + ")";
                    SearchResult result = search.FindOne();
                    if (result == null) {
                        return false;
                    }
                    // Return whether their employee type is staff
                    return result.Properties["employeetype"][0].ToString().ToLower().Contains("staff");
                } catch {
                    return false;
                }
            }
        }
    }
}