import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('db.json');
const db = lowdb(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ games: [], players: [] }).write();

export default db;
