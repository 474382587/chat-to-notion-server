import axios from "axios";

export async function exchangeCodeForToken(code) {
  console.log('code', code);
  const auth = Buffer.from(
    `7f56b9ac-e720-4086-99d2-e5d358d09111:secret_5X3M0e8QgOQCHFjA5YebduM8dNlhjJVQxaPSfQ5sGfN`
  ).toString('base64');

  console.log('auth', auth)

  try {
    const res = await axios.post(
      'https://api.notion.com/v1/oauth/token',
      {
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://localhost:3001/api/redirect',
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
      }
    );

    console.log('res', res.data);
    return res.data;

  } catch (error) {
    console.log(error)
  }
}
