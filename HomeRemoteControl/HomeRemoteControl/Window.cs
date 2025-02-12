using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace HomeRemoteControl
{
    public class Window
    {
        private PictureBox status;

        public Window(PictureBox status)
        {
            this.status = status;
        }

        public void On()
        {
            this.status.Image = global::HomeRemoteControl.Properties.Resources.win_open;
        }

        public void Off()
        {
            this.status.Image = global::HomeRemoteControl.Properties.Resources.win_close;
        }
    }

    public class WindowON : ICommand
    {
        private Window window;

        public WindowON(Window window)
        {
            this.window = window;
        }

        public void Execute()
        {
            this.window.On();
        }
    }

    public class WindowOFF : ICommand
    {
        private Window window;

        public WindowOFF(Window window)
        {
            this.window = window;
        }

        public void Execute()
        {
            this.window.Off();
        }
    }
}
