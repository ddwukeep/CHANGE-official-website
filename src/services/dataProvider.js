import { activitySeed, metrics } from '../data/mockData'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
export const dataProvider = {
  async getMetrics() { await delay(180); return metrics },
  async getActivity() { await delay(240); return activitySeed.map((row, i) => ({ id: `${Date.now()}-${i}`, row, time: `${String(i * 3 + 1).padStart(2,'0')} SEC AGO` })) },
  refreshActivity(items) {
    const next = [...items]
    const item = next.pop()
    item.time = 'NOW'
    item.id = `${Date.now()}`
    item.row[3] = `${item.row[3].slice(0,2)}${String(Math.floor(Math.random()*8999)+1000)}`
    return [item, ...next]
  }
}
