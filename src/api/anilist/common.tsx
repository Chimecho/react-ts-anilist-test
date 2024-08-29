import { GraphQLClient } from 'graphql-request'

const ANILIST_API_URL = 'https://graphql.anilist.co/'
export const client = new GraphQLClient(ANILIST_API_URL)
