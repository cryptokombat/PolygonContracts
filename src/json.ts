import fs from 'fs'
import path from 'path'
import { CollectionSupply } from './config'

export const COLLECTION_DATA_PATH = 'collection_data'
export const CURRENT_DATA_PATH = 'current_data'

export const saveCollectionData = async (data: CollectionSupply, name: string) => {
  return writeJson(data, name, COLLECTION_DATA_PATH)
}

export const getCollectionData = async (name: string) => {
  return readJson(name, COLLECTION_DATA_PATH)
}

export const saveCurrentData = async (data: CollectionSupply, name: string) => {
  return writeJson(data, name, CURRENT_DATA_PATH)
}
export const getCurrentData = async (name: string) => {
  return readJson(name, CURRENT_DATA_PATH)
}

const writeJson = async (data: CollectionSupply, name: string, prefix = COLLECTION_DATA_PATH) => {
  const jsonPath = path.join(__dirname, '..', 'src', prefix, `${name}.json`)

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8')

  console.log('Results saved to:', jsonPath)
}

const readJson = async (name: string, prefix = COLLECTION_DATA_PATH): Promise<CollectionSupply> => {
  const jsonPath = path.join(__dirname, '..', 'src', prefix, `${name}.json`)

  const data = fs.readFileSync(jsonPath, 'utf8')

  console.log('Results loaded from:', jsonPath)

  return JSON.parse(data)
}
