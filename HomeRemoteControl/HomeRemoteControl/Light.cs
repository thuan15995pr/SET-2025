using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace HomeRemoteControl
{
    public class Light
    {
        private PictureBox status;

        public Light(PictureBox status)
        {
            this.status = status;
        }

        public void On()
        {
            this.status.Image = global::HomeRemoteControl.Properties.Resources.light_on;
        }

        public void Off()
        {
            this.status.Image = global::HomeRemoteControl.Properties.Resources.light_off;
        }
    }

    public class LightON : ICommand
    {
        private Light light;

        public LightON(Light light)
        {
            this.light = light;
        }

        public void Execute()
        {
            this.light.On();
        }
    }

    public class LightOFF : ICommand
    {
        private Light light;

        public LightOFF(Light light)
        {
            this.light = light;
        }

        public void Execute()
        {
            this.light.Off();
        }
    }
}
