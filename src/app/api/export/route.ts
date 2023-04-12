// // exportContentToNotion

import { Client } from '@notionhq/client';

export async function OPTIONS(request: Request) {
  return new Response('ok');
}
export async function POST(request: Request) {
  const res = await request.json();
  console.log(res, 'res');
  const { textContent, accessToken, title, pageId } = res;
  console.log(accessToken, 'accessToken');
  //
  const notion = new Client({ auth: accessToken });

  async function addItem(text: string, page_id: string) {
    try {
      const response = await notion.pages.create({
        parent: {
          type: 'page_id',
          page_id: page_id,
        },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: text,
                },
              },
            ],
          },
        },
        children: textContent.map((text: string, index: number) => {
          return {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  text: {
                    content: text,
                  },
                  annotations: {
                    bold: index % 2 === 0,
                  },
                },
              ],
            },
          };
        }),
      });
      console.log(response);
      console.log('Success! Entry added.');
    } catch (error: any) {
      console.log(error);
      console.error(error.body);
    }
  }

  const data = await notion.search({
    sort: {
      direction: 'descending',
      timestamp: 'last_edited_time',
    },
  });

  await addItem(title || new Date().getTime().toString(), pageId || data.results[0].id);
  //

  return new Response('access_token');
}
