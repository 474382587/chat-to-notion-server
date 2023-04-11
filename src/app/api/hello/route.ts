export async function GET(request: Request) {
  console.log(request)
  
  return new Response(JSON.stringify(request, null, 2))
}

