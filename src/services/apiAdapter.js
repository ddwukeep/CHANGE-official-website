// Stable boundary for a future REST, GraphQL, or blockchain data source.
export const createApiAdapter = (client) => ({
  getMetrics: () => client.get('/metrics'),
  getActivity: () => client.get('/activity'),
})
