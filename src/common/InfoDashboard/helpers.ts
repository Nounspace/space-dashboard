import { Time, hexlify, BigNumber } from '@/utils'
import { gql } from '@apollo/client'
import { config } from '@config'
import { mapKeys, mapValues } from 'lodash'

type ChartData = Record<number, BigNumber>

const ONE_DAY_TIMESTAMP = 24 * 60 * 60

export async function getChartData(
  poolId: number,
  poolStartedAt: BigNumber,
  month: number,
): Promise<ChartData> {
  type QueryData = Record<`d${number}`, { totalStaked: string }[]>
  const { data } = await config.apolloClient.query<QueryData>({
    query: _generateTotalStakedPerDayGraphqlQuery(poolId, poolStartedAt, month),
  })

  console.log('GraphQL response data:', data)

  return mapValues(
    mapKeys(data, (_, key) => key.slice(1)),
    value => BigNumber.from(value[0]?.totalStaked || 0),
  )
}

function _generateTotalStakedPerDayGraphqlQuery(
  poolId: number,
  poolStartedAt: BigNumber,
  month: number,
) {
  const REQUEST_PATTERN = (date: number, timestamp: number) => `
    d${date}: poolInteractions(
        first: 1,
        orderDirection: desc,
        where: { timestamp_lte: ${timestamp}, pool: "${hexlify(poolId)}" },
        orderBy: timestamp
      ) {
        totalStaked
      }`

  const monthTime = new Time(String(month), 'M')
  const currentTime = new Time()
  const poolStartedAtTime = new Time(poolStartedAt.toNumber())

  let startDate: number
  let endDate: number

  if (currentTime.isBefore(poolStartedAtTime)) {
    // If the current time is before the pool start date
    startDate = monthTime.isSame(poolStartedAtTime, 'month') ? poolStartedAtTime.get('date') : 1
    endDate = monthTime.isSame(poolStartedAtTime, 'month') ? poolStartedAtTime.get('date') : monthTime.dayjs.daysInMonth()
  } else {
    // If the pool has already started
    startDate = monthTime.isSame(poolStartedAtTime, 'month') ? poolStartedAtTime.get('date') : 1
    endDate = monthTime.isSame(currentTime, 'month') ? currentTime.get('date') : monthTime.dayjs.daysInMonth()
  }

  console.log('startDate:', startDate)
  console.log('endDate:', endDate)

  const requests = []
  for (let date = startDate; date <= endDate; date++) {
    let timestamp
    if (date === startDate) {
      // For the first day, set timestamp to the end of the day (12:00 AM GMT next day)
      timestamp = poolStartedAtTime.timestamp + (24 * 60 * 60) - (poolStartedAtTime.timestamp % ONE_DAY_TIMESTAMP)
    } else {
      // For subsequent days, use 12:00 AM GMT
      timestamp = poolStartedAtTime.timestamp + (date - startDate) * ONE_DAY_TIMESTAMP
    }

    console.log(`Generating request for date ${date} with timestamp ${timestamp}`)

    const request = REQUEST_PATTERN(date, timestamp)
    requests.push(request)
    console.log('Request added:', request)
  }

  const query = gql`
    ${'{\n' + requests.join('\n') + '\n}'}
  `

  console.log('Generated GraphQL query:', query)

  return query
}
