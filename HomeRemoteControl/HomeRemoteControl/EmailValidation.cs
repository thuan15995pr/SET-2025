using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace HomeRemoteControl
{
    public class EmailValidation : Validation
    {
        private String email;
        private Regex regax = new Regex("^\\w+@\\w+\\.\\w+$");
        public EmailValidation(String email)
        {
            this.email = email;
        }
        public bool Validation()
        {
            if (regax.Match(email).Success)
            {
                return true;
            }
            return false;
        }
    }
}
