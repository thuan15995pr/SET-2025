using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace HomeRemoteControl
{
    public class Fan
    {
        private PictureBox status;

        public Fan(PictureBox status)
        {
            this.status = status;
        }

        public void On()
        {
            this.status.Image = global::HomeRemoteControl.Properties.Resources.fan_on;
        }

        public void Off()
        {
            this.status.Image = global::HomeRemoteControl.Properties.Resources.fan_off;
        }
    }

    public class FanON : ICommand
    {
        private Fan fan;

        public FanON(Fan fan)
        {
            this.fan = fan;
        }

        public void Execute()
        {
            this.fan.On();
        }
    }

    public class FanOFF : ICommand
    {
        private Fan fan;

        public FanOFF(Fan fan)
        {
            this.fan = fan;
        }

        public void Execute()
        {
            this.fan.Off();
        }
    }
}
