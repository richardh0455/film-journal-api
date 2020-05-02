const functions = require('firebase-functions');

const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://film-journal-api.firebaseio.com"
});
const db = admin.firestore();

app.use(cors({ origin: true }));

app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello World!');
});

app.get('/cameras', (req, res) => {
  (async () => {
        try {
            let query = db.collection('cameras');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                var item = {
                    id: doc.id
                };
                item = {...item, ...doc.data()};
                response.push(item);
            }
            return;
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
});

app.post('/cameras', (req, res) => {
(async () => {
    try {
        const collection = db.collection('cameras');
        var document = await collection.add(req.body);
        return res.status(200).send({id: document.id});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

app.put('/cameras/:cameraID', (req, res) => {
(async () => {
    try {
        const document = db.collection('cameras').doc(req.params.cameraID);
        await document.set(req.body);
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

app.delete('/cameras/:cameraID', (req, res) => {
(async () => {
    try {
        const document = db.collection('cameras').doc(req.params.cameraID);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

app.get('/lenses', (req, res) => {
  (async () => {
        try {
            let query = db.collection('lenses');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                var item = {
                    id: doc.id
                };
                item = {...item, ...doc.data()}
                response.push(item);
            }
            return;
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
});

app.get('/lenses/:lensID', (req, res) => {
  (async () => {
        try {
            let query = db.collection('lenses').doc(req.params.lensID);
            let item = await query.get();
            let response = item.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
});

app.post('/lenses', (req, res) => {
(async () => {
    try {
        const collection = db.collection('lenses');
        var document = await collection.add(req.body);
        return res.status(200).send({id: document.id});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

app.put('/lenses/:lensID', (req, res) => {
(async () => {
    try {
        const document = db.collection('lenses').doc(req.params.lensID);
        await document.set(req.body);
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

app.delete('/lenses/:lensID', (req, res) => {
(async () => {
    try {
        const document = db.collection('lenses').doc(req.params.lensID);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

app.get('/rolls', (req, res) => {
  (async () => {
        try {
            let query = db.collection('rolls');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                var item = {
                    id: doc.id
                };
                item = {...item, ...doc.data()}
                response.push(item);
            }
            return;
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
});

app.get('/rolls/:rollID', (req, res) => {
  (async () => {
        try {
            let query = db.collection('rolls').doc(req.params.rollID);
            let item = await query.get();
            let response = item.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
});

app.post('/rolls', (req, res) => {
(async () => {
    try {
        const collection = db.collection('rolls');
        var document = await collection.add(req.body);
        return res.status(200).send({id: document.id});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

app.put('/rolls/:rollID', (req, res) => {
(async () => {
    try {
        const document = db.collection('rolls').doc(req.params.rollID);
        await document.set(req.body);
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

app.delete('/rolls/:rollID', (req, res) => {
(async () => {
    try {
        const document = db.collection('rolls').doc(req.params.rollID);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});


app.get('/shots', (req, res) => {
  (async () => {
        try {
            let rollID = req.query.rollID
            let query = db.collection('shots');
            if(typeof rollID !== 'undefined' && rollID !== null && rollID !== "")
            {
              query = query.where("roll_id", "==", rollID);
            }
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                var item = {
                    id: doc.id
                };
                item = {...item, ...doc.data()}
                response.push(item);
            }
            return;
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
});

app.get('/shots/:shotID', (req, res) => {
  (async () => {
        try {
            let query = db.collection('shots').doc(req.params.shotID);
            let item = await query.get();
            let response = item.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
});

app.post('/shots', (req, res) => {
(async () => {
    try {
        const collection = db.collection('shots');
        var document = await collection.add(req.body);
        return res.status(200).send({id: document.id});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

app.put('/shots/:shotID', (req, res) => {
(async () => {
    try {
        const document = db.collection('shots').doc(req.params.shotID);
        await document.set(req.body);
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

app.delete('/shots/:shotID', (req, res) => {
(async () => {
    try {
        const document = db.collection('shots').doc(req.params.shotID);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

exports.app = functions.https.onRequest(app);
