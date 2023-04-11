import { exchangeCodeForToken } from '@/utils';
import db from '@/utils/database';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const connection = db();

  // exchange code for token => will revisit this later
  const { access_token, bot_id, owner } = await exchangeCodeForToken(
    searchParams.get('code')
  );

  // save this token to DB along with user id/bot_id
  connection.set(bot_id, access_token);

  // const { access_token } = await exchangeCodeForToken(searchParams.get('code'));
  console.log('access_token', access_token);

  return new Response(
    JSON.stringify({
      access_token,
      bot_id,
    })
  );
}
