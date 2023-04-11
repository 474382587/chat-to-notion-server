import db from '@/utils/database';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bot_id = searchParams.get('bot_id') || '';

  const access_token = await db().get(bot_id);
  
  return new Response(access_token);
}
