import { handleDisconnected, handleNewUser } from "./notification";
import { handleNewMessage } from "./chat";
import { handleBeganPath, handleFilledcolor, handleStrokedPath } from "./paint";
import {
  handleGameEnded,
  handleGameStarted,
  handleGameStarting,
  handleLeaderNotif,
  handlePlayerUpdate,
} from "./players";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = (aSocket) => (socket = aSocket);

export const initSocket = (aSocket) => {
  updateSocket(aSocket);
  const { events } = window;
  aSocket.on(events.newUser, handleNewUser);
  aSocket.on(events.disconnected, handleDisconnected);
  aSocket.on(events.newMsg, handleNewMessage);
  aSocket.on(events.beganPath, handleBeganPath);
  aSocket.on(events.strokedPath, handleStrokedPath);
  aSocket.on(events.filled, handleFilledcolor);
  aSocket.on(events.playerUpdate, handlePlayerUpdate);
  aSocket.on(events.gameStarted, handleGameStarted);
  aSocket.on(events.leaderNotif, handleLeaderNotif);
  aSocket.on(events.gameEnded, handleGameEnded);
  aSocket.on(events.gameStarting, handleGameStarting);
};
