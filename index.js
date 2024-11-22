const express = require('express')
const app = express()
const port = 3000
const mongoose =require('mongoose')

async function main() {
    await mongoose.connect('mongodb+srv://nisammt:asaignment1@asaignment1.sdfbz.mongodb.net/?retryWrites=true&w=majority&appName=asaignment1')
    
}
main()
.then(()=>{
   console.log("Db Connected")
})
.catch(err=>{
console.log(err)
});

const messageSchema = new mongoose.Schema({
    message: String
})

const Message = mongoose.model('message', messageSchema)
 
app.use(express.json())

app.get('/', async(req, res)=>{
    let allmessage =  await Message.find({})
    res.send(allmessage)
    console.log(allmessage)
})

app.post('/',(req, res)=>{
 const msg = new Message(req.body)
    console.log(req.body)
    msg.save()
   res.send('Message Added successfuly')

})

app.put('/:id',(req, res)=>{

    let msgid = req.params.id
    let newmsg = req.body
    Message.findByIdAndUpdate(msgid,newmsg).exec()
    res.send('Message edited succssfuly')
})

app.delete('/:id',(req, res)=>{
    let msgid = req.params.id
    
  Message.findByIdAndDelete(msgid)
    res.send('Message deleted successfully')

})

app.listen(port,()=>{
    console.log(`app running on port${port}`)
})