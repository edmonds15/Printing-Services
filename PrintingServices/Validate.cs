using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.DirectoryServices;
using System.IO;
using System.Linq;
using System.Web;

namespace PrintingServices {
    public static class Validate {
        public static bool isAdmin(string user) {
            StreamReader stream = new StreamReader("C:\\passwords\\passwordDCP.csv");
            string data = stream.ReadLine();
            stream.Close();

            char[] split = { ',' };
            string[] connectInfo = data.Split(split);
            SqlConnection conn = new SqlConnection("Server=" + connectInfo[0] + ";Database=" + connectInfo[1] +
                ";User Id=" + connectInfo[2] + ";Password=" + connectInfo[3] + ";");

            try {
                conn.Open();
                string query = @"SELECT username, role FROM PS_Users WHERE username = @User";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@User", user);
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read()) {
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

        public static bool isStaff(string user) {
            try {
                DirectoryEntry entry = new DirectoryEntry("LDAP://edmonds.wednet.edu");
                DirectorySearcher search = new DirectorySearcher(entry);
                search.Filter = "(samaccountname=" + user + ")";
                SearchResult result = search.FindOne();
                if (result == null) {
                    return false;
                }
                return result.Properties["employeetype"][0].ToString().ToLower().Contains("staff");
            } catch (Exception err) {
                return false;
            }
        }

    }
}