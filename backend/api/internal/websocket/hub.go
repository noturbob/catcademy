package websocket

import (
"encoding/json"
"sync"
)

type Message struct {
Type    string      `json:"type"`
Payload interface{} `json:"payload"`
}

type Client struct {
hub    *Hub
conn   interface{}
send   chan []byte
mockID string
userID string
}

type Hub struct {
rooms      map[string]map[*Client]bool
broadcast  chan BroadcastMessage
register   chan *Client
unregister chan *Client
mu         sync.RWMutex
}

type BroadcastMessage struct {
MockID  string
Message []byte
}

func NewHub() *Hub {
return &Hub{
rooms:      make(map[string]map[*Client]bool),
broadcast:  make(chan BroadcastMessage, 256),
register:   make(chan *Client),
unregister: make(chan *Client),
}
}

func (h *Hub) Run() {
for {
select {
case client := <-h.register:
h.mu.Lock()
if _, ok := h.rooms[client.mockID]; !ok {
h.rooms[client.mockID] = make(map[*Client]bool)
}
h.rooms[client.mockID][client] = true
h.mu.Unlock()

case client := <-h.unregister:
h.mu.Lock()
if room, ok := h.rooms[client.mockID]; ok {
if _, ok := room[client]; ok {
delete(room, client)
close(client.send)
if len(room) == 0 {
delete(h.rooms, client.mockID)
}
}
}
h.mu.Unlock()

case msg := <-h.broadcast:
h.mu.RLock()
if room, ok := h.rooms[msg.MockID]; ok {
for client := range room {
select {
case client.send <- msg.Message:
default:
close(client.send)
delete(room, client)
}
}
}
h.mu.RUnlock()
}
}
}

func (h *Hub) BroadcastLeaderboardUpdate(mockID string, payload interface{}) {
data, _ := json.Marshal(Message{Type: "leaderboard_update", Payload: payload})
h.broadcast <- BroadcastMessage{MockID: mockID, Message: data}
}
