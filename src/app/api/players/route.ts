import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const position = searchParams.get('position') || 'Jogador'

  if (query.length < 2) {
    return NextResponse.json({ players: [] })
  }

  const key = process.env.API_FOOTBALL_KEY
  if (!key) {
    return NextResponse.json({ players: [], error: 'API key não configurada' })
  }

  try {
    const headers = {
      'x-rapidapi-key': key,
      'x-rapidapi-host': 'v3.football.api-sports.io',
    }
    const q = encodeURIComponent(query)

    // Busca na Seleção Brasileira (team=6) e no Brasileirão (league=71) em paralelo
    const [r1, r2] = await Promise.all([
      fetch(`https://v3.football.api-sports.io/players?search=${q}&team=6&season=2024`, { headers }),
      fetch(`https://v3.football.api-sports.io/players?search=${q}&league=71&season=2024`, { headers }),
    ])

    const [d1, d2] = await Promise.all([
      r1.ok ? r1.json() : { response: [] },
      r2.ok ? r2.json() : { response: [] },
    ])

    // Combina os resultados e remove duplicatas pelo id
    const combined = [...(d1.response || []), ...(d2.response || [])]
    const seen = new Set()
    const unique = combined.filter((item) => {
      if (seen.has(item.player.id)) return false
      seen.add(item.player.id)
      return true
    })

    const players = unique.slice(0, 6).map((item) => ({
      id: String(item.player.id),
      name: item.player.name,
      nickname: item.player.firstname,
      club: item.statistics?.[0]?.team?.name || 'Sem clube',
      position: position,
      age: item.player.age,
      photo: item.player.photo,
      nationality: 'Brasil',
    }))

    return NextResponse.json({ players })
  } catch {
    return NextResponse.json({ players: [] })
  }
}
