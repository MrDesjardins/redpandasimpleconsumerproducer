# RedPanda Simple Example of Producer and Consumer


# Pre-Requisite

## Redpanda Installation
Redpanda can be installed using these steps in your WSL (Windows Linux):

```sh
curl -LO https://github.com/redpanda-data/redpanda/releases/latest/download/rpk-linux-amd64.zip
mkdir -p ~/.local/bin
unzip rpk-linux-amd64.zip -d ~/.local/bin/
```

If you are using ZSH, edit the `.zshrc` by adding this line:

```sh
path+=("/home/misterp2d/.local/bin")
```
Change the `misterp2d` for your name.

You can test the installation by doing:

```sh
rpk version
```

It takes about 4-5 seconds to get a response.

## Running Redpanda

Start a container using the docker command line. The command fetches the latest version of Redpanda image and starts the cluster.

```sh
docker run -d --pull=always --name=redpanda-1 --rm \
-p 8081:8081 \
-p 8082:8082 \
-p 9092:9092 \
-p 9644:9644 \
docker.redpanda.com/redpandadata/redpanda:latest \
redpanda start \
--overprovisioned \
--smp 1  \
--memory 1G \
--reserve-memory 0M \
--node-id 0 \
--check=false
```

# Running the Script

## Consuming the Topic

```sh
npm run start:consumer
```

## Producing One Message Into the Topic

```sh
npm run start:consumer
```

## Getting Information About the Offset of a Particular groupId
The script need to change to get the groupid, and then:

```sh
npm run start:offsetexplorer
```
