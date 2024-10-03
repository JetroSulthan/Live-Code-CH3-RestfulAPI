const fs = require('fs')
const express = require("express")
const port = 3000

const app = express();

// check server
app.get("/", (req,res) => {
    res.status(200).json({
        "status" : "Succes",
        "message" : "application is running"
    })
});

// custom url
app.get('/jet', (req, res) => {
    res.status(200).json({
        "message" : "Ping Succesfully"
    })
});

// middleware express untuk membaca JSON
app.use(express.json());

// api/v1/(collection nya) => collection harus jamak
const cars = JSON.parse(
    fs.readFileSync(`${__dirname}/assets/cars.json`, "utf-8"   
));


app.get('/api/v1/cars/:id', (req, res) => {
    // selet * from fsw2 where id=1 or Name: "yogi"
    
    const hehe = req.params.id;
    console.log(hehe);
    
    const car = cars.find(i => i.id === hehe);
    
    // salah satu basic error handling
    if (!car) {
        // const hehe = req.params.id;
        return res.status(404).json({
            status : "failed",
        message : `failed get car data : ${hehe}`,
        isSucces : false,
        data : null
        })
    } else {
        res.status(200).json({
            status : "success",
        message : "Succes get cars data",
        isSucces : true,
        data : {
            car
        }
        })
    }
});

app.get('/api/v1/cars', (req, res) => {
    res.status(200).json({
        status : "succes",
        message : "Succes get cars data",
        isSucces : true,
        totalData : cars.length,
        data : [cars]
    })
});


app.post('/api/v1/cars', (req, res) => {
    
    
    // insert into ...
    console.log(req.params)
    const newCar = req.body;
    cars.push(newCar);
    fs.writeFile(`${__dirname}/assets/cars.json`, JSON.stringify(cars), (err) => {
        res.status(201).json({
            status : "succes",
        message : "Succes create new cars data",
        isSucces : true,
        data : {
            car : newCar
        }
        })
    });
});

app.get('/api/v1/students', (req, res) => {
    res.status(200).json({
        "message" : "Ping Succesfully"
    })
});

// try n catch menggunakan restful api
app.get('/api/v1/panels', async (req, res) => {
    const cars = JSON.parse(
        fs.readFileSync(`${__dirname}/assets/cars.json`, "utf-8"   
    ));

    try {
        res.status(200).json({
            status : "succes",
            message : "Succes get cars data",
            isSucces : true,
            data : cars
        })    
    } catch (error) {
        res.status(500).json({
            status : "succes",
            message : "Succes get cars data",
            isSucces : true,
            data : null
        })    
    }

});

// middleware / Handler untuk url yang tidak dapat diakses
// middleware sendiri => our own middleware
app.use((req, res, next) => {
    res.status(404).json({
        "status" : "Failed",
        "message" : "arep nangdi se"
    })
})

app.listen(port, () => {
    console.log("start apk dengan port 3000")
}) 
