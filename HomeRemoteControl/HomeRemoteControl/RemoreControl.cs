using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace HomeRemoteControl
{
    public partial class FormRemoteControl : Form
    {
        #region 4 Slots
        //Slot 1
        private ICommand Slot1ON = NoCommand.GetInstance();
        private ICommand Slot1OFF = NoCommand.GetInstance();
        //Slot 2
        private ICommand Slot2ON = NoCommand.GetInstance();
        private ICommand Slot2OFF = NoCommand.GetInstance();
        //Slot 3
        private ICommand Slot3ON = NoCommand.GetInstance();
        private ICommand Slot3OFF = NoCommand.GetInstance();
        //Slot 4
        private ICommand Slot4ON = NoCommand.GetInstance();
        private ICommand Slot4OFF = NoCommand.GetInstance();
        #endregion

        #region 6 Devices
        //Light
        private Light light;
        private ICommand LightON;
        private ICommand LightOFF;

        //TV
        private TV tv;
        private ICommand TVON;
        private ICommand TVOFF;

        //Door
        private Door door;
        private ICommand DoorOn;
        private ICommand DoorOff;

        //Air conditioner
        private AirConditioner ac;
        private ICommand AirConditionerON;
        private ICommand AirConditionerOFF;

        //Fan
        private Fan fan;
        private ICommand FanON;
        private ICommand FanOFF;

        //Window
        private Window window;
        private ICommand WindowON;
        private ICommand WindowOFF;
        #endregion

        public FormRemoteControl()
        {
            InitializeComponent();

            //Light
            light = new Light(this.pictureBoxLight);
            LightON = new LightON(light);
            LightOFF = new LightOFF(light);

            //TV
            tv = new TV(this.pictureBoxTV);
            TVON = new TVON(tv);
            TVOFF = new TVOFF(tv);

            //Door
            door = new Door(this.pictureBoxDoor);
            DoorOn = new DoorON(door);
            DoorOff = new DoorOFF(door);

            //AirConditioner
            ac = new AirConditioner(this.pictureBoxAC);
            AirConditionerON = new AirConditionerON(ac);
            AirConditionerOFF = new AirConditionerOFF(ac);

            //Fan
            fan = new Fan(this.pictureBoxFan);
            FanON = new FanON(fan);
            FanOFF = new FanOFF(fan);

            //Window
            window = new Window(this.pictureBoxWin);
            WindowON = new WindowON(window);
            WindowOFF = new WindowOFF(window);
        }

        #region Slot 1
        private void btnOn1_Click(object sender, EventArgs e)
        {
            Slot1ON.Execute();

        }

        private void btnOFF1_Click(object sender, EventArgs e)
        {
            Slot1OFF.Execute();

        }

        private void cboSlot1_SelectedIndexChanged(object sender, EventArgs e)
        {
            String option = cboSlot1.SelectedItem.ToString();
            ChoiceDevice(option, 1);
        }

        #endregion

        #region Slot 2
        private void btnON2_Click(object sender, EventArgs e)
        {
            Slot2ON.Execute();

        }

        private void btnOFF2_Click(object sender, EventArgs e)
        {
            Slot2OFF.Execute();
        }

        private void cboSlot2_SelectedIndexChanged(object sender, EventArgs e)
        {
            String option = cboSlot2.SelectedItem.ToString();
            ChoiceDevice(option, 2);
        }
        #endregion

        #region Slot 3
        private void btnON3_Click(object sender, EventArgs e)
        {
            Slot3ON.Execute();

        }

        private void btnOFF3_Click(object sender, EventArgs e)
        {
            Slot3OFF.Execute();
        }

        private void cboSlot3_SelectedIndexChanged(object sender, EventArgs e)
        {
            String option = cboSlot3.SelectedItem.ToString();
            ChoiceDevice(option, 3);
        }
        #endregion

        #region Slot 4
        private void btnON4_Click(object sender, EventArgs e)
        {
            Slot4ON.Execute();

        }

        private void btnOFF4_Click(object sender, EventArgs e)
        {
            Slot4OFF.Execute();
        }

        private void cboSlot4_SelectedIndexChanged(object sender, EventArgs e)
        {
            String option = cboSlot4.SelectedItem.ToString();
            ChoiceDevice(option, 4);
        }
        #endregion

        private void AssignCommandOnOFF(String deviceName, ref ICommand ONCmd, ref ICommand OFFCmd)
        {
            if (deviceName.Equals("Light"))
            {
                OFFCmd = LightOFF;
                ONCmd = LightON;
            }
            else if (deviceName.Equals("TV"))
            {
                OFFCmd = TVOFF;
                ONCmd = TVON;
            }
            else if (deviceName.Equals("None"))
            {
                OFFCmd = NoCommand.GetInstance();
                ONCmd = NoCommand.GetInstance();
            }
            else if (deviceName.Equals("Door"))
            {
                OFFCmd = DoorOff;
                ONCmd = DoorOn;
            }
            else if (deviceName.Equals("AirConditioner"))
            {
                OFFCmd = AirConditionerOFF;
                ONCmd = AirConditionerON;
            }
            else if (deviceName.Equals("Fan"))
            {
                OFFCmd = FanOFF;
                ONCmd = FanON;
            }
            else if (deviceName.Equals("Window"))
            {
                OFFCmd = WindowOFF;
                ONCmd = WindowON;
            }
        }

        private void ChoiceDevice(String deviceName, int slotNum)
        {
            if (slotNum == 1) //Slot 1
            {
                AssignCommandOnOFF(deviceName, ref Slot1ON, ref Slot1OFF);
            }
            else if (slotNum == 2) //Slot 2
            {
                AssignCommandOnOFF(deviceName, ref Slot2ON, ref Slot2OFF);
            }
            else if (slotNum == 3) //Slot 3
            {
                AssignCommandOnOFF(deviceName, ref Slot3ON, ref Slot3OFF);
            }
            else if (slotNum == 4) //Slot 4
            {
                AssignCommandOnOFF(deviceName, ref Slot4ON, ref Slot4OFF);
            }
        }
    }
}
