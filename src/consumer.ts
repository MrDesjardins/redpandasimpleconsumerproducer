import { Kafka, logLevel } from "kafkajs";
import { brokers, topicName } from "./shared.js";
import { v4 as uuidv4 } from "uuid";
const redpanda = new Kafka({
  brokers: brokers,
  logLevel: logLevel.WARN,
});

const consumer = redpanda.consumer({ groupId: uuidv4() });

try {
  await consumer.connect();
  await consumer.subscribe({
    topic: topicName,
  });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `Received message: ${message.value} at ${topic}:${partition}, offset ${message.offset} and time ${message.timestamp}`
      );
    },
  });
} catch (error) {
  console.error("Consumer send:", error);
}

export async function disconnect() {
  try {
    await consumer.disconnect();
  } catch (error) {
    console.error("Consumer disconnect:", error);
  }
}

process.on("SIGINT", async () => {
  try {
    await disconnect();
  } catch (error) {
    console.error("Consumer:", error);
  } finally {
    process.exit(0);
  }
});
