import { Kafka } from "kafkajs";

const KAFKA_BROKER = "localhost:9092";
const CLIENT_ID = "dev-sabjibazar-kafka-client";

const Client = new Kafka({
  clientId: CLIENT_ID,
  brokers: [KAFKA_BROKER],
});

const consumer = Client.consumer({
  groupId: "subscriber-group",
});

async function connectConsumer() {
  try {
    await consumer.connect();
    console.log("Connected with consumer");
  } catch (e) {
    console.error("Error while connecting with consumer");
    console.error(e);
  }
}

async function subscribeToATopic() {
  try {
    await consumer.subscribe({
      topics: ["catalogue-service-topic"],
      fromBeginning: true,
    });
    console.log("Suscribe to this topic catalogue-service-topic");
  } catch (e) {
    console.error("Error while suscribing");
    console.error(e);
  }
}

async function readMessages() {
  try {
    await consumer.run({
      eachMessage: ({ topic, partition, message, heartbeat, pause }) => {
        console.log("Message Recieved", partition);
        console.log(topic, " :- ", message);
      },
    });
    console.log("Suscribe to this topic catalogue-service-topic");
  } catch (e) {
    console.error("Error while suscribing");
    console.error(e);
  }
}

function read() {
  connectConsumer().then(() => {
    subscribeToATopic().then(() => {
      readMessages();
    });
  });
}

read();
