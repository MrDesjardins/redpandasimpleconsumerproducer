import { Kafka, logLevel } from "kafkajs";
import { brokers, topicName } from "./shared.js";
const redpanda = new Kafka({
  brokers: brokers,
  logLevel: logLevel.WARN,
});

const admin = redpanda.admin();
try {
  await admin.connect();
  const groupPartitionOffset = await admin.fetchOffsets({
    groupId: "patrickgroupid",
    topics: [topicName],
  });
  for (const partitions of groupPartitionOffset) {
    console.log(`Topic ${partitions.topic}`);
    for (const p of partitions.partitions) {
      console.log(`Offset for ${p.offset} at partition ${p.partition}`);
    }
  }
} catch (error) {
  console.error("Admin offset:", error);
}

export async function disconnect() {
  try {
    await admin.disconnect();
  } catch (error) {
    console.error("Admin disconnect:", error);
  }
}

process.on("SIGINT", async () => {
  try {
    await disconnect();
  } catch (error) {
    console.error("Admin:", error);
  } finally {
    process.exit(0);
  }
});
