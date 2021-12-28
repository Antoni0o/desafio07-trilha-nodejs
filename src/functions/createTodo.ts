import { document } from '../utils/dynamodbClient';

interface ICreateTodo {
  id: string;
  title: string;
  deadline: string;
}

export const handle = async (event) => {
  const { id, title, deadline } = JSON.parse(event.body) as ICreateTodo;
  const { id: user_id } = event.pathParameters;

  const deadlineToDate = new Date(deadline);

  await document
      .put({
        TableName: "user_todos",
        Item: {
          id,
          user_id,
          title,
          done: false,
          deadline: deadlineToDate,
        },
      })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo created!",
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
};