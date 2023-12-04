const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
    // Create a websocket object
    const wss = new WebSocketServer({ noServer: true });
  
    // Handle the protocol upgrade from HTTP to WebSocket
    httpServer.on('upgrade', (request, socket, head) => {
      wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
      });
    });
  
    let connections = [];
  
    wss.on('connection', (ws) => {
      const connection = { id: uuid.v4(), alive: true, ws: ws };
      connections.push(connection);
    
      // Send the current user count to the newly connected user
      ws.send(JSON.stringify({ type: 'userCount', count: connections.length }));
    
      // Forward messages to everyone except the sender
      ws.on('message', function message(data) {
        connections.forEach((c) => {
          if (c.id !== connection.id) {
            c.ws.send(data);
          }
        });
      });
    
      // Remove the closed connection so we don't try to forward anymore
      ws.on('close', () => {
        connections = connections.filter((c) => c.id !== connection.id);
    
        // Send an updated user count to remaining users after someone disconnects
        broadcastUserCount();
      });
    
      // Respond to pong messages by marking the connection alive
      ws.on('pong', () => {
        connection.alive = true;
      });
    });
    
    // Function to broadcast the current user count to all connected users
    function broadcastUserCount() {
      const userCountMsg = JSON.stringify({ type: 'userCount', count: connections.length });
      connections.forEach((c) => {
        c.ws.send(userCountMsg);
      });
    }
    
    // Keep active connections alive
    setInterval(() => {
      connections.forEach((c) => {
        // Kill any connection that didn't respond to the ping last time
        if (!c.alive) {
          c.ws.terminate();
        } else {
          c.alive = false;
          c.ws.ping();
        }
      });
    
      // Send an updated user count to all connected users
      broadcastUserCount();
    }, 10000);
  }
  module.exports = { peerProxy };