console.log('Deneme')
const express = require('express');
const app = express();
app.listen(3000, function () {
    console.log('Server started')
});
//parse as json
app.use(express.json());
app.get('/', function (req, res) {
    //index route
    res.send('Merhaba Dünya');
})

////////////////////////////////////////////////////////////////////////////////////
const { createPool } = require('mysql');
const baglanti = createPool({
    host: 'localhost',
    user: 'root',
    password: 'QazWsx258.',
    database: 'teknopark',
})

////////////////////////////////////////////////////////////////////////////////////

app.get('/sirketler', function (req, res) {// get all
    baglanti.query('SELECT * FROM sirketler', function (err, results, fields) {
        res.json(results);

    })

})

app.get('/sirketler/:id', function (req, res) {//get by id
    let id = req.params.id;
    baglanti.query('SELECT * FROM sirketler WHERE id = ?', [id], function (err, results, fields) {
        res.json(results);

    })

})

app.post('/sirketler', function (req, res) {
    console.log(req.body);
    const body = req.body;
    baglanti.query('INSERT INTO sirketler(adi, adres, sektor, calisansayisi, aktif) VALUES (?, ?, ?, ?, ?)', [body.adi, body.adres, body.sektor, body.calisansayisi, body.aktif], function (err, results, fields) {
        if (err) {
            console.error('Error occurred during the query:', err);
            res.status(500).json({ error: 'An error occurred during the query' });
            return;
        }
        
        res.json(results);
    });
});

    



app.put('/sirketler/:id', function (req, res) {
    console.log(req.body);
    let id = req.params.id;
    const body = req.body;
    baglanti.query('UPDATE sirketler SET adi=?, adres=?, sektor=?, calisansayisi=?, aktif=? WHERE id=?',
     [body.adi, body.adres, body.sektor, body.calisansayisi, body.aktif, id], 
     function (err, results, fields) {
        res.json(results);
    })
    
})
app.delete('/sirketler/:id', function (req, res) {
    let id = req.params.id;
    baglanti.query('DELETE FROM sirketler WHERE id=?',
     [id], function (err, results, fields) {
        res.json(results);
     }
    )
})
/////////////////////////////////////////////////////////////////////////////////
app.get('/calisanlar', function (req, res) { // get all
    baglanti.query('SELECT * FROM calisanlar', function (err, results, fields) {
        res.json(results);
    });
});

app.get('/calisanlar/:id', function (req, res) { //get by id
    let id = req.params.id;
    baglanti.query('SELECT * FROM calisanlar WHERE id = ?', [id], function (err, results, fields) {
        res.json(results);
    });
});

app.post('/calisanlar', function (req, res) {
    console.log(req.body);
    const body = req.body;
    baglanti.query('INSERT INTO calisanlar(adi, adres, pozisyon, maas, sirket_id) VALUES (?, ?, ?, ?, ?)',
     [body.adi, body.adres, body.pozisyon, body.maas, body.sirket_id], function (err, results, fields) {

        res.json(results);
    });
});

app.put('/calisanlar/:id', function (req, res) {
    console.log(req.body);
    let id = req.params.id;
    const body = req.body;
    baglanti.query('UPDATE calisanlar SET adi=?, adres=?, pozisyon=?, maas=?, sirket_id=? WHERE id=?',
        [body.adi, body.adres, body.pozisyon, body.maas, body.sirket_id, id],
        function (err, results, fields) {
            res.json(results);
        });
});

app.delete('/calisanlar/:id', function (req, res) {
    let id = req.params.id;
    baglanti.query('DELETE FROM calisanlar WHERE id=?',
        [id],
        function (err, results, fields) {
            res.json(results);
        });
});
