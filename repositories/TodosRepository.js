import { AsyncStorage } from "react-native";

const prefix = "todos:";

let id = 0;
const generateId = () => id++;

const evalOrNull = func => {
  try {
    return func();
  } catch (e) {
    return null;
  }
};

export class TodosRepository {
  constructor() {
    this.getLastIdReady();
  }

  async getLastIdReady() {
    if (id) return Promise.resolve();

    const entities = await this.getAll();

    id = evalOrNull(() => entities.slice(-1)[0].id + 1) || 1;

    return Promise.resolve();
  }

  async get(id) {
    return AsyncStorage.getItem(prefix + id).then(entity => {
      return JSON.parse(entity);
    });
  }

  async save(entity) {
    await this.getLastIdReady();

    const { id = generateId() } = entity;
    entity.id = id;

    await AsyncStorage.setItem(prefix + id, JSON.stringify(entity));

    return entity;
  }

  async getAll() {
    const keys = await AsyncStorage.getAllKeys().then(keys => {
      return keys.filter(k => k.startsWith(prefix));
    });

    return AsyncStorage.multiGet(keys).then(entities => {
      return entities.map(([_, t]) => JSON.parse(t));
    });
  }

  async delete(id) {
    return AsyncStorage.removeItem(prefix + id);
  }
}
