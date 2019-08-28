const express = require('express');

var bdy =require('body-parser')
const app = express();
app.use(bdy.urlencoded({extended:true}))
app.use(bdy.json());
var model=require('../server/model/sche')

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();

});
var mon=require('mongoose')
var url="mongodb+srv://ashly:ashly@cluster0-nybb2.mongodb.net/myitem?retryWrites=true&w=majority"

mon.connect(url,function(err){
    if(err)throw err
    else{
        console.log("database connected")
    }
    
})
app.get("/data",function(req,res){
    res.send({msg:"data"})
})
app.get("/view",function(req,res){
model.find({},function(err,result){
    if(err)throw err
    else{
        //console.log(result)
        res.send(result)
    }
})
})
app.post("/add",function(req,res){
console.log(req.body.itemname)
console.log(req.body.itemprice)
console.log(req.body.itemqty)
var m=new model()

m.itemname=req.body.itemname;
m.itemcmpny=req.body.itemcmpny;
m.itemprice=req.body.itemprice
m.itemqty=req.body.itemqty
m.itemid=req.body.itemid;
m.save(function(err){
    if(err)throw err
    else{
        res.send("data added")
        console.log("data added")
    }
})

})
app.get("/edit/:itemid",function(req,res){
    console.log(req.params.itemid)
    id=req.params.itemid
    console.log(id)
    model.findOne({itemid:id},function(err,resul){
        if(err)throw err
        else{
           // console.log(resul)
            res.send(resul)
        }
    })
})
app.post("/update",function(req,res){
    console.log(req.body.itemname)
console.log(req.body.itemprice)
console.log(req.body.itemqty)


name=req.body.itemname;
cmpny=req.body.itemcmpny;
price=req.body.itemprice
qty=req.body.itemqty
id=req.body.itemid;
var qry={itemid:id};
   
var upvle={$set:{itemprice:price,itemqty:qty,itemname:name,itemcmpny:cmpny}};
 model.updateOne(qry,upvle,function(err,result){
    // console.log(result)
     if (err) throw err;
     else{
      console.log("1 document updated");
     
  res.send(result)
     }
 })

})
app.get("/delete/:id",function(req,res){
    var idi=req.params.id
    console.log(idi)
    var qry={itemid:idi};
    model.deleteOne(qry,function(err,result){
        if(err)throw err
        else{
            console.log(result)
            res.send(result)
        }
    })
})
app.listen(8000,function(req,res){
    console.log("server started")
});
