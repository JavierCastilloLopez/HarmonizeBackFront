// Load the AWS SDK for Node.js
import { DynamoDBClient, ListTablesCommand, ScanCommand, PutItemCommand, DeleteItemCommand, QueryCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";


const client = new DynamoDBClient({
  region: "us-east-1",
 
});



export function addItem(table, addItem) {



  console.log(addItem)

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
      console.log('Eliminado');
    })
    .catch(error => {
      console.error("Error al escanear la tabla:");
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
