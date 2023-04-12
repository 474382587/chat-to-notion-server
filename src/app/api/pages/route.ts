import { Client } from '@notionhq/client';

export async function OPTIONS(request: Request) {
  return new Response('ok');
}
export async function POST(request: Request) {
  const res = await request.json();
  const { accessToken, query = '' } = res;
  const notion = new Client({ auth: accessToken });

  const data = await notion.search({
    query,
    sort: {
      direction: 'descending',
      timestamp: 'last_edited_time',
    },
  });

  return new Response(JSON.stringify(data.results));
}
