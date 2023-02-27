import Dexie from 'dexie';

export const db = new Dexie('downloads');
db.version(1).stores({
    dlTracks: 'id,item,file',
    // lsTracks: 'id,item,file'
});