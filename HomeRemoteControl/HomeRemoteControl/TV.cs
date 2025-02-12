using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace HomeRemoteControl
{
    public class TV
    {
        private PictureBox status;

        public TV(PictureBox status)
        {
            this.status = status;
        }

        public void On()
        {
            this.status.Image = global::HomeRemoteControl.Properties.Resources.tv_on;
        }

        public void Off()
        {
            this.status.Image = global::HomeRemoteControl.Properties.Resources.tv_off;
        }
    }

    public class TVON : ICommand
    {
        private TV tv;

        public TVON(TV tv)
        {
            this.tv = tv;
        }

        public void Execute()
        {
            this.tv.On();
        }
    }

    public class TVOFF : ICommand
    {
        private TV tv;

        public TVOFF(TV tv)
        {
            this.tv = tv;
        }

        public void Execute()
        {
            this.tv.Off();
        }
    }
}
