// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const NotificationsClient = () => {
//   const [notifications, setNotifications] = useState([]);
//   const socket = io("http://localhost:3000"); // Reemplaza con la URL de tu servidor

//   useEffect(() => {
//     // Conectar al servidor WebSocket
//     socket.on("connect", () => {
//       console.log("Conectado al servidor WebSocket");
//     });

//     // Escuchar notificaciones
//     socket.on("receiveNotification", (data) => {
//       console.log("Notificación recibida:", data.message);
//       setNotifications((prevNotifications) => [
//         ...prevNotifications,
//         data.message,
//       ]);
//     });

//     // Limpiar la conexión al desmontar el componente
//     return () => {
//       socket.off("connect");
//       socket.off("receiveNotification");
//       socket.disconnect();
//     };
//   }, [socket]);
// };

// export default NotificationsClient;
