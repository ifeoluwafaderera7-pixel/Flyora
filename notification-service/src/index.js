const express = require('express');

const { EmailService } = require('./services');
const amqplib  = require("amqplib");
async function connectQueue() {
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();
        await channel.assertQueue("notf-queue");
        channel.consume("notf-queue", async (data) => {
            console.log(`${Buffer.from(data.content)}`);
          
            const object = JSON.parse(`${Buffer.from(data.content)}`);
            // const object = JSON.parse(Buffer.from(data).toString());
            await EmailService.sendEmail("aspirant371@gmail.com", object.recepientEmail, object.subject, object.text);
            // console.log("ack", data);
            channel.ack(data);
        })
    } catch(error) {
        
    }
}

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const mailsender = require('./config/email-config')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    await connectQueue();
    console.log("queue is up")
});