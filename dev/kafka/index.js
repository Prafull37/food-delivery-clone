import { Kafka } from "kafkajs";
// import readLineAsync from "./io";

const KAFKA_BROKER = "localhost:9092";
const CLIENT_ID = "dev-sabjibazar-kafka-client";

const Client = new Kafka({
  clientId: CLIENT_ID,
  brokers: [KAFKA_BROKER],
});

let admin;
let connectAdmin = async () => {
  try {
    admin = await Client.admin();
    await admin.connect();
    console.log("Able to connect with Kafka Admin");
  } catch (e) {
    console.log("Failed While connecting with admin");
    console.error(e);
  }
};

async function createTopic({ topic, noOfPartition = 1, topics = [] }) {
  try {
    const topicsToCreate =
      topics.length > 0 ? topics : { topic, numPartitions: noOfPartition };
    await admin.createTopics({ topics: [topicsToCreate] });
    console.log("Topic created :", topic);
  } catch (e) {
    console.log("Topic creation failed");
    console.error(e);
  }
}

function start() {
  connectAdmin().then(() => {
    createTopic({ topic: "catalogue-service-topic" });
  });
}

start();
