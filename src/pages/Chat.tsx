
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, PaperclipIcon, Image, Smile, MoreVertical, Phone, Video } from "lucide-react";

// Mock chat data
const mockContacts = [
  {
    id: "c1",
    name: "John Doe",
    role: "Civil Engineer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "I'll send you the plans by tomorrow.",
    time: "10:30 AM",
    unread: 0,
    online: true,
  },
  {
    id: "c2",
    name: "Sarah Miller",
    role: "Interior Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "What do you think about these color options?",
    time: "Yesterday",
    unread: 2,
    online: true,
  },
  {
    id: "c3",
    name: "Michael Johnson",
    role: "Electrical Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "The wiring inspection is complete.",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "c4",
    name: "Jennifer Williams",
    role: "Plumber",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "I can come on Tuesday to fix the leak.",
    time: "Apr 10",
    unread: 0,
    online: false,
  },
];

// Mock messages with current user
const mockMessages = [
  {
    id: "m1",
    senderId: "c1",
    content: "Hello! I've reviewed your kitchen renovation plans.",
    timestamp: "10:30 AM",
    read: true,
  },
  {
    id: "m2",
    senderId: "current-user",
    content: "Great! What do you think about the layout?",
    timestamp: "10:32 AM",
    read: true,
  },
  {
    id: "m3",
    senderId: "c1",
    content: "The layout looks good. I have some suggestions for the cabinet placement though.",
    timestamp: "10:34 AM",
    read: true,
  },
  {
    id: "m4",
    senderId: "c1",
    content: "I'll send you the plans by tomorrow with the suggested changes.",
    timestamp: "10:35 AM",
    read: true,
  },
  {
    id: "m5",
    senderId: "current-user",
    content: "That would be perfect! I'm looking forward to seeing your suggestions.",
    timestamp: "10:36 AM",
    read: true,
  },
];

const Chat = () => {
  const [selectedContact, setSelectedContact] = useState(mockContacts[0]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: `m${messages.length + 1}`,
      senderId: "current-user",
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      read: false,
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput("");
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-0 h-[calc(100vh-8rem)]">
        <div className="grid grid-cols-1 md:grid-cols-4 h-full">
          {/* Contacts Sidebar */}
          <div className="md:col-span-1 border-r border-gray-200 h-full overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold mb-4">Messages</h2>
              <div className="relative">
                <Input 
                  placeholder="Search contacts" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <div 
                  key={contact.id} 
                  className={`
                    p-4 border-b flex items-start cursor-pointer transition-colors
                    ${selectedContact?.id === contact.id ? 'bg-primary-50' : 'hover:bg-gray-50'}
                  `}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{contact.name}</span>
                      <span className="text-xs text-gray-500">{contact.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 truncate">{contact.lastMessage}</p>
                    <span className="text-xs text-gray-500">{contact.role}</span>
                  </div>
                  {contact.unread > 0 && (
                    <span className="bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                      {contact.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat Area */}
          <div className="md:col-span-3 h-full flex flex-col">
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                      <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedContact.name}</h3>
                      <p className="text-xs text-gray-500">
                        {selectedContact.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.senderId !== 'current-user' && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                          <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`
                        max-w-[75%] rounded-lg py-2 px-3
                        ${message.senderId === 'current-user' 
                          ? 'bg-primary-600 text-white rounded-br-none' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'}
                      `}>
                        <p>{message.content}</p>
                        <p className={`text-xs mt-1 ${message.senderId === 'current-user' ? 'text-primary-100' : 'text-gray-500'}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <PaperclipIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Image className="h-5 w-5" />
                    </Button>
                    <Input 
                      placeholder="Type your message..." 
                      className="flex-1"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button variant="ghost" size="icon">
                      <Smile className="h-5 w-5" />
                    </Button>
                    <Button onClick={handleSendMessage}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-gray-500">Select a contact to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
