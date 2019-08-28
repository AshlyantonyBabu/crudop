var mong=require('mongoose')
var addschema=mong.Schema
var itemschema=new addschema({
   
    itemname:{type:String,required:true},
    itemprice:{type:Number,required:true},
    itemqty:{type:Number,required:true},
    itemid:{type:String,required:true},
    itemcmpny:{type:String,required:true},
})


var itemmodel=mong.model("mymodel",itemschema,"productss")
module.exports=itemmodel