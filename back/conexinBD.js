// Load the AWS SDK for Node.js
import { DynamoDBClient, ListTablesCommand, ScanCommand, PutItemCommand, DeleteItemCommand, QueryCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";


const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: "ASIATQ5KEFU7NROGABHM",
    secretAccessKey: "1OzJMFOcd9QRKAfJQ3Ju1VqzstM03mT7bWQ+LAip",
    sessionToken: "FwoGZXIvYXdzEPH//////////wEaDOmMOUtOpODJ/fDCWCK+AaVdyzp+Kg3UAqVjPzupYgtca9Xn8MAmAiOf9BdbEA2BiNkvbPbQO085l2A3dVYg/UJ0AFRmAKNj6bkkoGDzjZtSD3Iyj/ln5zmciLIx9a2Lpr9ZWT7L4gr4vopf+R5qcPBAMBS2yd6gaOmODLz+xieB3AcWQUiuDmxSRBDQxjb9e1kmA20z7Y3ro1S62E55qXMIoXY7SkWLxW9DtKKELyI2nhxNqBxkzXjzikI+tLCPyd2rtLNfGFyKuzYNwjgo3qT2owYyLcGQJgMVsXU89jzO6fUT60h2WUbZ1MQVaFbIG39IyR3N8zT6w6UE/jdLyCzBMQ=="
  }
});



export function addItem(table, addItem) {

  const command = new PutItemCommand({
    TableName: table,
    Item: addItem,

  });

  // Ejecutar el comando y procesar los resultados
  return client.send(command)
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error(error);
    });

}


export async function deleteItem(table, keyItem) {

  const command = new DeleteItemCommand({
    TableName: table,
    Key:
      keyItem,


  });

  // Ejecutar el comando y procesar los resultados
  client.send(command)
    .then(data => {
      return ('Eliminado');
    })
    .catch(error => {
      return ("Error al escanear la tabla:");
    });

}
export async function getTable(table) {





  const command = new ScanCommand({
    TableName: table,
    Limit: 50

  });
  let result = await client.send(command)
    .then(data => {
      return (data.Items);
    })
    .catch(error => {
      console.error("Error al escanear la tabla:");
    });
  // Ejecutar el comando y procesar los resultados
  console.log(result)
  return result

}
export async function getItem(table, keyItem, IdKey) {
  keyItem = { [`:${IdKey}`]: { "S": keyItem } }
  const command = new QueryCommand({
    TableName: table,
    KeyConditionExpression: `#${IdKey} = :${IdKey}`,
    ExpressionAttributeNames: {
      [`#${IdKey}`]: IdKey
    },

    ExpressionAttributeValues: keyItem

  });
  console.log(command)
  // Ejecutar el comando y procesar los resultados
  return await client.send(command)
    .then(data => {
      return (data.Items);
    })
    .catch(error => {
      console.error("Error al escanear la tabla:", error);
    });

}

export async function getUserByEmail(email) {

  let keyItem = { ":Email": { "S": email } }
  const command = new ScanCommand({
    TableName: "User",
    FilterExpression: `#Email = :Email`,
    ExpressionAttributeNames: {
      "#Email": "Email"
    },

    ExpressionAttributeValues: keyItem

  });


  // Ejecutar el comando y procesar los resultados
  return await client.send(command)
    .then(data => {
      console.log(data)
      return (data.Items[0]);
    })
    .catch(error => {
      console.error(error);
      return error
    });


}

export async function getSongByName(name) {

  const searchValue = name
  const command = new ScanCommand({
    TableName: "Cancion",
    FilterExpression: "contains(title, :search)",
    ExpressionAttributeValues: {
      ':search': { S: searchValue }
    },



  });


  // Ejecutar el comando y procesar los resultados
  return await client.send(command)
    .then(data => {
      console.log(data)
      return (data.Items);
    })
    .catch(error => {
      console.error(error);
      return error
    });


}

export async function addtoPlaylist(playlist, item) {
  const params = {
    TableName: "Playlist",
    Key: {
      "IdPlaylist": { S: playlist }
    },
    UpdateExpression: "add Canciones :nuevaCancion",
    ExpressionAttributeValues: {
      ":nuevaCancion": { SS: [item] }
    }
  };
  const command = new UpdateItemCommand(params);

  client.send(command)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });


}
export async function playlistFollowed(user, Playlist) {
  const params = {
    TableName: "User",
    Key: {
      "IdUser": { S: user }
    },
    UpdateExpression: "add playlistFollowed :newPlaylist",
    ExpressionAttributeValues: {
      ":newPlaylist": { SS: [Playlist] }
    }
  };
  const command = new UpdateItemCommand(params);

  return client.send(command)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });



}

export async function playlistCreate(user, Playlist) {
  const params = {
    TableName: "User",
    Key: {
      "IdUser": { S: user }
    },
    UpdateExpression: "add playlistCreate :newPlaylist",
    ExpressionAttributeValues: {
      ":newPlaylist": { SS: [Playlist] }
    }
  };
  const command = new UpdateItemCommand(params);

 return client.send(command)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });


}

