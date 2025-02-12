using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace HomeRemoteControl
{
    public class AirConditioner
    {
        private PictureBox status;

        public AirConditioner(PictureBox status)
        {
            this.status = status;
        }

        public void On()
        {
            this.status.Image = global::HomeRemoteControl.Properties.Resources.ac_on;
        }

        public void Off()
        {
            this.status.Image = global::HomeRemoteControl.Properties.Resources.ac_off;
        }
    }

    public class AirConditionerON : ICommand
    {
        private AirConditioner ac;

        public AirConditionerON(AirConditioner ac)
        {
            this.ac = ac;
        }

        public void Execute()
        {
            this.ac.On();
        }
    }
    public class AirConditionerOFF : ICommand
    {
        private AirConditioner ac;

        public AirConditionerOFF(AirConditioner ac)
        {
            this.ac = ac;
        }

        public void Execute()
        {
            this.ac.Off();
        }
    }
}
