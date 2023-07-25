import { Kafka } from "kafkajs";

const KAFKA_BROKER = "localhost:9092";
const CLIENT_ID = "dev-sabjibazar-kafka-client";

const Client = new Kafka({
  clientId: CLIENT_ID,
  brokers: [KAFKA_BROKER],
});

const producer = Client.producer({
  allowAutoTopicCreation: false,
  transactionTimeout: 30000,
});

async function connectProducer() {
  try {
    await producer.connect();
    console.log("Connection with producer is successful");
  } catch (e) {
    console.log("Failed connecting with producer");
    console.error(e);
  }
}

async function sendMessage() {
  try {
    await producer.send({
      topic: "catalogue-service-topic",
      messages: [
        { key: "key1", value: "hello world", partition: 0 },
        { key: "key2", value: "hey hey!", partition: 1 },
      ],
    });
    console.log("Message Sent to catalogue-service-topic");
  } catch (e) {
    console.log("Error while sending message");
    console.error(e);
  }
}

function sendMessages() {
  connectProducer().then(() => {
    sendMessage();
  });
}

sendMessages();
