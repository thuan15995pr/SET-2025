using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace HomeRemoteControl
{
    interface ICommand
    {
        void Execute();
    }
    public class NoCommand : ICommand
    {
        private static NoCommand Instance = new NoCommand();

        private NoCommand() { }

        public static NoCommand GetInstance()
        {
            return Instance;
        }

        public void Execute()
        {
            MessageBox.Show("Please choose device in this slot");
        }
    }
}
