export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);

  console.log(searchParams.get('code'), 'code for token');

  return new Response('Authenticated! You can close this window now. And go back to the chat page and refresh the page.');
}
