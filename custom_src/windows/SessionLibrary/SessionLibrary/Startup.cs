using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeLibrary
{
    public class Startup
    {
        Func<object, Task<object>> nodeSignal;

        private void SystemEvents_SessionSwitch(object sender, Microsoft.Win32.SessionSwitchEventArgs e)
        {
            if (e.Reason == SessionSwitchReason.SessionLock)
            {
                this.nodeSignal("logout");
            }
            else if (e.Reason == SessionSwitchReason.SessionUnlock)
            {
                this.nodeSignal("login");
            }
        }

        public async Task<object> InvokeTest(dynamic input)
        {
            Microsoft.Win32.SystemEvents.SessionSwitch += new Microsoft.Win32.SessionSwitchEventHandler(SystemEvents_SessionSwitch);
            this.nodeSignal = (Func<object, Task<object>>)input.test;

            await new Task(() => { });
            return null;
        }
    }
}
