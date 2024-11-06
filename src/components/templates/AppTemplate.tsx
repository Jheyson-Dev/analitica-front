import { FC, useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useThemeStore, useBodyClass } from "@/store/themeStore";

import logoDark from "@/assets/logo-dark.svg";
import logoLight from "@/assets/logo-light.svg";
import {
  Menu01Icon,
  Sun03Icon,
  Moon02Icon,
  LogoutSquare02Icon,
  UserCircleIcon,
} from "hugeicons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navOptions } from "@/pages/navOptions";
import useAuthStore from "@/store/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useProfile } from "@/hooks";
import { io, Socket } from "socket.io-client";
import { Button } from "../ui/button";
import { BellDot } from "lucide-react";

const SOCKET_SERVER_URL = import.meta.env.VITE_API_URL;

const AppTemplate: FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  useBodyClass();

  const { data: profile } = useProfile(Number(user?.id));

  const [isAsideOpen, setIsAsideOpen] = useState(true);
  const socketRef = useRef<Socket | null>(null);

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  const logo = theme === "dark" ? logoDark : logoLight;

  const filteredOptionsNav = navOptions.filter(
    (option) => user?.role && option.allowedRoles.includes(user?.role)
  );

  const [notifications, setNotifications] = useState<
    {
      id: number;
      message: string;
      createdAt: string;
      isRead: boolean;
      productId: number;
      quantity: number;
      warehouseId: number;
    }[]
  >([]);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);
    socketRef.current = socket;
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.emit("register", Number(user?.id));

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    // Listen for notifications
    socket.on("receiveNotification", (notification) => {
      console.log("Notification received:", notification);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
      // toast.success(`Notification: ${notification.message}`, {
      //   duration: 2000,
      // });
    });

    // Clean up the connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const markAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );

    if (socketRef.current) {
      socketRef.current.emit("markAsRead", id);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <div className="scrollbar-thumb-sky-700 scrollbar-track-sky-300">
      <header className="sticky top-0 z-10 flex items-center justify-between px-10 py-4 border-b shadow bg-background">
        <div className="items-center justify-start flex-1 hidden space-x-2 max-w-64 md:flex">
          <img src={logo} alt="Sakai Logo" className="w-14 md:w-20" />
          <span className="text-lg font-bold">CABANILLA</span>
        </div>
        <div className="flex justify-start flex-1 md:ml-10">
          <div
            className="p-2 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:text-background"
            onClick={toggleAside}
          >
            <Menu01Icon />
          </div>
        </div>
        <div className="flex items-center justify-start flex-1 space-x-2 md:hidden">
          <img src={logo} alt="Sakai Logo" className="w-14" />
          <span className="text-lg font-bold">CABANILLA</span>
        </div>
        <div className="items-center justify-end flex-1 hidden md:flex">
          <div
            className="p-2 transition duration-500 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:text-background"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun03Icon /> : <Moon02Icon />}
          </div>
        </div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <BellDot className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-blue-500 scrollbar-track-transparent scrollbar-hide">
                  {notifications.slice(0, 50).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg cursor-pointer ${
                        notification.isRead ? "bg-background" : "bg-muted"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm">{notification.message}</p>
                        {/* {notification.type === "ALERT INVENTORY" && (
                          <span className="px-2 py-1 ml-2 text-xs font-semibold text-white bg-red-500 rounded-full">
                            ALERT
                          </span>
                        )} */}
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center justify-end flex-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="@usuario"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="leadind-none font-me dium text-md">{`${profile?.name} ${profile?.lastname}`}</p>
                  <p className="text-sm leading-none text-muted-foreground">
                    {profile?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:bg-accent"
              >
                <NavLink to={"/profile"}>
                  <div>
                    <UserCircleIcon className="mr-2" size={24} />
                  </div>
                  <span className="text-md">Perfil</span>
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={logout}
                className="cursor-pointer hover:bg-accent"
              >
                <div>
                  <LogoutSquare02Icon className="mr-2" size={24} />
                </div>
                <span className="text-md">Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex px-10 mx-auto mt-10">
        <nav
          className={`transition-all duration-300 rounded-xl max-w-64 ${
            isAsideOpen ? " p-4 border w-1/3" : " w-0 overflow-hidden"
          }`}
        >
          <ul className="sticky space-y-2 top-28">
            {filteredOptionsNav.map((option) => (
              <li key={option.path}>
                <NavLink
                  to={option.path}
                  className={({ isActive, isPending }) =>
                    `flex items-center gap-2 w-full h-10 px-2 rounded-lg text-lg font-semibold cursor-pointer ${
                      isPending
                        ? "pending"
                        : isActive
                        ? "bg-accent"
                        : "hover:bg-accent"
                    }`
                  }
                >
                  {option.icon}
                  {option.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex-1 mx-2">
          <Outlet />
          <Toaster
            position="top-right"
            expand={true}
            toastOptions={{
              classNames: {
                error: "bg-red-400 text-white",
                success: "bg-green-400 text-white",
                warning: "text-yellow-400",
                info: "bg-blue-400",
                loading: "bg-blue-400 text-white",
              },
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default AppTemplate;
