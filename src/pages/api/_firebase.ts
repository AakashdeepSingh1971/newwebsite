import firebase from "firebase"

let database: firebase.database.Database;

export function start() {
    const config = {
        apiKey: "AIzaSyD4rfz2RrFYeFm4z2hcDa2dCplS9sWFA_M",
        authDomain: "technophiles-265c5.firebaseapp.com",
        databaseURL: "https://technophiles-265c5-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "technophiles-265c5",
        storageBucket: "technophiles-265c5.appspot.com",
        messagingSenderId: "60999957385",
        appId: "1:60999957385:web:7f4ef2780ef837f7bdbf58"
    };
    try {
        firebase.app();
    }
    catch (e) {
        firebase.initializeApp(config);
    }

    database = firebase.database();
}


export async function getReference(path: string) {
    if (!database) {
        start();
    }
    let reference = database.ref(path);
    return reference;
}

export async function setPost(title:string ,content: string, name: string) {
    if (!database) {
        await start();
    }

    let res = false;
    let time = Date.now();
    let id = await randomString(6);
    let snap = await database.ref(`/blog/posts/${id}`).once('value');
   
    if (!snap.exists()) {
        await database.ref(`/blog/posts/${id}`).set({title,content, id, timestamp: time, name }).then(() => { res = true });
    } else {
        await setPost( title,content,name);
    }

    return res;

}

export async function randomString(length: number) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}