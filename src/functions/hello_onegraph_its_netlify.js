const fetch = require("node-fetch");
const querystring = require("querystring");

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const params = querystring.parse(event.body);
  const name = params["name"]
	const query = params["query"]
	const message = params["message"]

  // Execute chain
  await fetch(
    "https://serve.onegraph.com/graphql?app_id=993a3e2d-de45-44fa-bff4-0c58c6150cbf",
  {
    method: "POST",
    "Content-Type": "application/json",
    body: JSON.stringify({
      "doc_id": "477aa2af-1b22-445d-b3b5-87bc0152530f",
      "operationName": "ExecuteChainMutation_hello_onegraph_its_netlify",
      "variables": {"name": name, "query": query, "message": message}
      }
    )
  })

  return {
    statusCode: 200,
    body: "Finished executing chain!",
  };
};
