using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeRemoteControl
{
    public class PasswordValidation : Validation
    {
        private String password;
        private String email;

        public PasswordValidation(String email, String password)
        {
            this.email = email;
            this.password = password;
        }
        public bool Validation()
        {
            string connectionString = "datasource=127.0.0.1;port=3306;username=root;password=;database=dptdtu;";
            string query = "select * from accounts where email = '" + email + "' and password = '" + password + "'";
            MySqlConnection databaseConnection = new MySqlConnection(connectionString);
            MySqlCommand commandDatabase = new MySqlCommand(query, databaseConnection);
            commandDatabase.CommandTimeout = 60;
            MySqlDataReader reader;

            try
            {
                databaseConnection.Open();
                Debug.WriteLine("Connect success !");
                reader = commandDatabase.ExecuteReader();
                if (reader.HasRows)
                {
                    return true;
                }
                else
                {
                    Debug.WriteLine("No rows found.");
                    return false;
                }
                databaseConnection.Close();
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
