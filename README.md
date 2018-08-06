### Getting started
You can try this live by visiting https://connect4-ks.herokuapp.com/ . To run the game locally:
1. Install dependencies.
```bash 
npm install
```
2. Build the `"src"` directory.
```bash 
npm run build
```
3. If you want to run the server on a different port modify the `PORT` env (default is `3000`).
```bash
export PORT=8080
```
4. Run the server.
```bash 
npm run serve
```
5. Visit `http://localhost:{PORT}`. Create a game and share the link to play with a friend.


### Stacks Used
- [expressjs](https://github.com/expressjs/express) - Handles http requests.
- [lowdb](https://github.com/typicode/lowdb) and [shortid](https://github.com/dylang/shortid) - For simple database.
- [socketio](https://github.com/socketio/socket.io) - Real-time game update.
- [vuejs](https://github.com/vuejs/vue) - Frontend components.


### App Structure
- `public/` - The folder which holds the files that we serve on the client.
- `src/index.js` - The main entry point of the application.
- `src/components/` - This folder contains the `vue` components.
- `src/libs/`- This folder contains the main logic of the game.
- `src/listeners/` - This folder contains the event handlers that the `socketio client` emits to the server. 
- `src/router/` - The registered routes of the single application are in this folder.
- `src/routes/` - The registered api routes are in this folder.
- `src/services/` - This folder contains the service files which the application uses to connect unit files to a single related service.
- `tests/` - The test files.


### Todo
- Board state persistence.
- Add AI.
- Game setup with more than two players and larger grid.
