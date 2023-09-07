import { Kafka, logLevel } from "kafkajs";
import { brokers, topicName } from "./shared.js";

const redpanda = new Kafka({
  brokers: brokers,
  logLevel: logLevel.WARN,
});

const producer = redpanda.producer();

try {
  await producer.connect();
  await producer.send({
    topic: topicName,
    messages: [{ value: "Hello World!" }],
  });
} catch (error) {
  console.error("Producer send:", error);
}

export async function disconnect() {
  try {
    await producer.disconnect();
  } catch (error) {
    console.error("Producer disconnect:", error);
  }
}

process.on("SIGINT", async () => {
  try {
    await disconnect();
  } catch (error) {
    console.error("Disconnect:", error);
  } finally {
    process.exit(0);
  }
});
