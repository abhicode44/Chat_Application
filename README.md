**MERN Stack Chat Application**

This project is a comprehensive real-time chat application developed using the MERN stack (MongoDB, Express, React, Node.js). The application allows users to register, log in, personalize their profile by selecting an avatar, and engage in real-time chat with other users. The chat functionality is powered by WebSockets, ensuring instantaneous message delivery and a dynamic user experience.

**Features**

1. **User Authentication**

   Registration:- New users can sign up by providing their username, email address, and password.
                  User credentials are securely stored in a MongoDB database.
   
   Login:- Registered users can log in using their username and password.
           Upon successful login, users are redirected to customize their profile.
   
2. **Profile Customization**
   
   Avatar Selection:-After logging in, users are prompted to choose an avatar from a selection of images to represent their profile.
                     The selected avatar becomes the user's display picture (DP) during chat sessions.
                     This feature adds a personal touch and helps users identify each other in the chat interface.
   
4. **User Selection for Chat**

   Active Users List:- Once logged in and avatar selection is complete, users can see a list of other users.
                       Users can initiate a chat session by selecting another user from this list.
                       This approach ensures that users can engage in one-on-one conversations with ease.
   
6. **Real-time Chat**
   
   WebSocket Integration:- The chat functionality is built on WebSocket technology, specifically using the Socket.io library.
                           WebSockets enable real-time, two-way communication between the client and server, making the chat experience instantaneous and interactive.

   Dynamic Chat Interface:- The chat page updates in real-time as messages are sent and received.
                            Messages include the sender's username and avatar, providing context and clarity within the conversation.

   Persistent Chat History:- Messages are stored in MongoDB, allowing users to view previous conversations when they log in.

8. **Responsive Design** :- The application is designed to be fully responsive, ensuring it works seamlessly across various devices, including desktops, tablets, and smartphones.
                            The interface is built using React.js, with styling provided by CSS and Bootstrap for a clean and modern look.

**Technical Overview**

**Frontend** :

React.js: Handles the user interface, component rendering, and state management.

CSS :- Used for styling, ensuring the application is visually appealing and user-friendly.

**Backend**:

Node.js & Express.js: Serve as the backend framework, managing API endpoints, routing, and server-side logic.

MongoDB: A NoSQL database used to store user credentials, avatars, and chat messages.

**Real-time Communication**:

Socket.io: A powerful WebSocket library that enables real-time, event-based communication between the server and clients. It ensures that messages are instantly propagated to all connected users.

**Deployment**

The application can be deployed on platform Render for production use.

**Live Website Preview :-  https://chat-application-website-live.onrender.com/**
