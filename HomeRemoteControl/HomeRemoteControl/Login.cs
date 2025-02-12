using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace HomeRemoteControl
{
    public partial class FormLogin : Form
    {
        public bool IsLogin { get; set; }
        public FormLogin()
        {
            InitializeComponent();
            IsLogin = false;
        }

        private void btnLogin_Click(object sender, EventArgs e)
        {
            String email = txtEmail.Text;
            String password = txtPassword.Text;

            EmailValidation emailValidation = new EmailValidation(email);

            if (emailValidation.Validation())
            {
                PasswordValidation passwordValidation = new PasswordValidation(email, password);
                if (passwordValidation.Validation())
                {
                    // switch to remote control
                    IsLogin = true;
                    this.Close();

                }
                else
                {
                    // Email or Password is invalid
                    MessageBox.Show("Email or Password is invalid.");
                }
            }
            else
            {
                // Email is invalid
                MessageBox.Show("Email is invalid.");
            }
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Are you sure want to exit?", "Confirm", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                this.Close();
            }
        }
    }
}
