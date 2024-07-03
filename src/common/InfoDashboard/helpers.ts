import { Time, hexlify, BigNumber } from '@/utils'
import { gql } from '@apollo/client'
import { config } from '@config'
import { mapKeys, mapValues } from 'lodash'

type ChartData = Record<number, BigNumber>

const ONE_DAY_TIMESTAMP = 24 * 60 * 60

export async function getChartData(
  poolId: number,
  poolStartedAt: BigNumber,
): Promise<ChartData> {
  type QueryData = Record<`d${number}`, { totalStaked: string }[]>
  const { data } = await config.apolloClient.query<QueryData>({
    query: _generateTotalStakedPerDayGraphqlQuery(poolId, poolStartedAt),
  })

  return mapValues(
    mapKeys(data, (_, key) => key.slice(1)),
    value => BigNumber.from(value[0]?.totalStaked || 0),
  )
}

function _generateTotalStakedPerDayGraphqlQuery(
  poolId: number,
  poolStartedAt: BigNumber,
) {
  const REQUEST_PATTERN = `d{{date}}:
    poolInteractions(
        first: 1
        orderDirection: desc
        where: {timestamp_lte: "{{timestamp}}", pool: "${hexlify(poolId)}"}
        orderBy: timestamp
      ) {
        totalStaked
      }`

  const currentTime = new Time()
  const poolStartedAtTime = new Time(poolStartedAt.toNumber())

  let startDateTimestamp = poolStartedAtTime.timestamp
  const endDateTimestamp = currentTime.timestamp

  const requests = []

  while (startDateTimestamp <= endDateTimestamp) {
    const date = Math.floor(startDateTimestamp / ONE_DAY_TIMESTAMP)
    const timestamp = startDateTimestamp + ONE_DAY_TIMESTAMP - (startDateTimestamp % ONE_DAY_TIMESTAMP)

    const request = REQUEST_PATTERN
      .replace('{{date}}', date.toString())
      .replace('{{timestamp}}', timestamp.toString())

    requests.push(request)
    startDateTimestamp += ONE_DAY_TIMESTAMP
  }

  return gql`
    ${'{\n' + requests.join('\n') + '\n}'}
  `
}
