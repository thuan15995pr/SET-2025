using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace HomeRemoteControl
{
    public class Door
    {
        private PictureBox status;

        public Door(PictureBox status)
        {
            this.status = status;
        }

        public void On()
        {
            this.status.Image = global::HomeRemoteControl.Properties.Resources.OIP_OPEN;
        }

        public void Off()
        {
            this.status.Image = global::HomeRemoteControl.Properties.Resources.OIP_CLOSE;
        }
    }

    public class DoorON : ICommand
    {
        private Door door;

        public DoorON(Door door)
        {
            this.door = door;
        }

        public void Execute()
        {
            this.door.On();
        }
    }

    public class DoorOFF : ICommand
    {
        private Door door;

        public DoorOFF(Door door)
        {
            this.door = door;
        }

        public void Execute()
        {
            this.door.Off();
        }
    }
}
