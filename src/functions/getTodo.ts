import { document } from '../utils/dynamodbClient';

interface ICreateTodo {
  id: string;
  title: string;
  deadline: string;
}

export const handle = async (event) => {
  const { id } = event.pathParameters;

  const response = await document
    .query({
      TableName: "user_todos",
      KeyConditionExpression: "user_id = :id",
      ExpressionAttributeValues: {
        ":id": id,
      },
    })
    .promise();

  const userTodos = response.Items[0];

  if(userTodos) {
    return {
      statusCode: 201,
      body: JSON.stringify({
        todos: userTodos
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
  }
  
  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Todo not found!",
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
};