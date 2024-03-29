import HomeIcon from '@mui/icons-material/Home';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Build from '@mui/icons-material/Build';
import Logout from '@mui/icons-material/Logout';

export const CommissarySidenavData = [
    {
        title: "Inventory",
        icon: <WidgetsIcon/>,
        link: "/commissary/inventory"
    },
    {
        title: "Critical Stocks",
        icon: <ReceiptIcon/>,
        link: "/commissary/analysis"
    },
    {
        title: "Notifications",
        icon: <NotificationsActiveIcon/>,
        link: "/commissary/notifications"
    },
    {
        title: "Transaction History",
        icon: <InventorySharpIcon/>,
        link: "/commissary/transfer_history"
    },
    // {
    //     title: "Profile",
    //     icon: <AccountCircleSharpIcon/>,
    //     link: "/commissary/profile"
    // },
    // {
    //     title: "Settings",
    //     icon: <Build/>,
    //     link: "/profile"
    // },
    {
        title: "Sign Out",
        icon: <Logout/>,
        link: "/"
    },
]