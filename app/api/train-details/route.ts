import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const pnr = searchParams.get('pnr')

  if (!pnr) {
    return NextResponse.json({ error: 'PNR is required' }, { status: 400 })
  }

  try {
    const apiUrl = `${process.env.TRAIN_API_URL}/${pnr}`
    const response = await fetch(apiUrl)
    
    if (!response.ok) {
      throw new Error('Failed to fetch train details')
    }

    const data = await response.json()

    // Parse the SERVING_LIST from the environment variable
    const servingList = JSON.parse(process.env.SERVING_LIST || '[]')

    // Include the serving list in the response
    return NextResponse.json({ ...data, servingList })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to fetch train details' }, { status: 500 })
  }
}