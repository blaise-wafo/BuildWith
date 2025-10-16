import { Sidebar, Menu, SubMenu, MenuItem } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../redux/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/AuthSlice/authSlice";

export const CustomSidebarForAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await toast.promise(
        dispatch(logoutUser()),
        {
          loading: "Login Out...",
          success: "You are Logout successfully!",
          error: (err) => (typeof err === "string" ? err : "Logout failed!"),
        },
        {
          position: "top-center",
          style: {
            fontSize: "12px",
            padding: "6px 12px",
            background: "white",
            color: "black",
            border: "1px solid #ccc",
          },
        }
      );
      persistor.purge();
      setTimeout(() => {
        window.location.reload();
        navigate("/");
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sidebar className="px-2 py-4">
      <Menu>
        <MenuItem className="text-gray-800 font-grotesk"> Profile </MenuItem>
        <MenuItem className="text-gray-800 font-grotesk">
          {" "}
          Billing and Payment{" "}
        </MenuItem>

        <MenuItem
          onClick={() => navigate("/userorders")}
          className="text-gray-800 font-grotesk"
        >
          {" "}
          Orders{" "}
        </MenuItem>

        {role === "FREELANCER" && (
          <MenuItem
            onClick={() => navigate("/dashboard")}
            className="text-green-500 font-grotesk"
          >
            {" "}
            Switch to Seller{" "}
          </MenuItem>
        )}
        {role === "FREELANCER" && (
          <SubMenu className="text-gray-800 font-grotesk" label="Your Business">
            <MenuItem onClick={()=> navigate("/dashboard/gig")}> Gigs </MenuItem>
            <MenuItem onClick={()=> navigate("dashboard/orders")}> Orders </MenuItem>
            <MenuItem onClick={()=> navigate("/user")}> Profile </MenuItem>
            <MenuItem> Earnings </MenuItem>
          </SubMenu>
        )}

        <MenuItem className="text-gray-800 font-grotesk font-semibold">
          {" "}
          General{" "}
        </MenuItem>
        <MenuItem className="text-gray-800 font-grotesk"> Home </MenuItem>
        <MenuItem onClick={handleLogout} className="text-gray-800 font-grotesk">
          {" "}
          Logout{" "}
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default CustomSidebarForAuth;
