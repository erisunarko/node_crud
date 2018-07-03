var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var mysql = require('mysql');
var con = mysql.createConnection({
	host	: "localhost",
	user	: "root",
	password: "",
	database: "db_nodejs"
});
con.connect(function(err){
	if (err) throw err;
		console.log("Terhubung ke database. . .");
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended : true }));

// halaman yang diload pertama kali
app.get('/', function(req, res){
	res.render('home');
});

// menampilkan form create data dan proses save ke database
app.get('/create', function(req, res){
	res.render('create');
});
app.post('/create', function(req, res){
	var data = {
		nama 				: req.body.nama,
		tempat_lahir		: req.body.tempat_lahir,
		tgl_lahir 			: req.body.tgl_lahir,
		jenis_kelamin		: req.body.jenis_kelamin,
		alamat				: req.body.alamat,
		agama				: req.body.agama,
		status_perkawinan 	: req.body.status_perkawinan,
		pekerjaan			: req.body.pekerjaan,
		kewarganegaraan		: req.body.kewarganegaraan,
		masa_berlaku		: req.body.masa_berlaku
	};

		var query = con.query("INSERT INTO tb_data_ktp SET ?", data, function(err, result){
			if (err) throw err;
			console.log("Data berhasil disimpan. . .");
			res.render('create');
		});
});

app.get('/read', function(req, res){
		var query = con.query("SELECT * FROM tb_data_ktp", function(err, result, fields){
			if (err) throw err;
			console.log("Select data berhasil. . .");
			var data = result;
			res.render('read', {data : data});
		});
});

app.get('/update', function(req, res){
	var query = con.query("SELECT * FROM tb_data_ktp", function(err, result, fields){
			if (err) throw err;
			console.log("Select data berhasil. . .");
			var data = result;
			res.render('update', {data : data});
		});
});

app.get('/create/:id', function(req, res){
	var where_val = req.params.id;
	var query = con.query("SELECT * FROM tb_data_ktp WHERE id = ?", where_val, function(err, result, fields){
			if (err) throw err;
			console.log("Select data berhasil. . .");
			var data = result;
			res.render('create', {data : data});
		});
});

app.post('/update', function(req, res){
	
	var id = req.body.id;

	var data = {
		nama 				: req.body.nama,
		tempat_lahir		: req.body.tempat_lahir,
		tgl_lahir 			: req.body.tgl_lahir,
		jenis_kelamin		: req.body.jenis_kelamin,
		alamat				: req.body.alamat,
		agama				: req.body.agama,
		status_perkawinan 	: req.body.status_perkawinan,
		pekerjaan			: req.body.pekerjaan,
		kewarganegaraan		: req.body.kewarganegaraan,
		masa_berlaku		: req.body.masa_berlaku
	};

		var query = con.query("UPDATE tb_data_ktp SET ? WHERE id = ?", [data, id], function(err, result){
			if (err) throw err;
			console.log("Data berhasil diupdate. . .");
			res.redirect('/update');
		});

});

app.get('/delete', function(req, res){
	var query = con.query("SELECT * FROM tb_data_ktp", function(err, result, fields){
			if (err) throw err;
			console.log("Select data berhasil. . .");
			var data = result;
			res.render('delete', {data : data});
		});
});

app.get('/delete/:id', function(req, res){
	var id = req.params.id;
	
	var query = con.query("DELETE FROM tb_data_ktp WHERE id = ?", id, function(err, result){
			if (err) throw err;
			console.log("delete data berhasil. . .");
			res.redirect('/delete');
		});
});

app.listen(8000);
