let global_id_hash: { [id: string]: number } = {};
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const ID_LENGTH = 8;

export default class IDGenerator {
  static getId(): string {
    let id = Array(ID_LENGTH).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
    if (global_id_hash[id])
      return this.getId();

    global_id_hash[id] = 1;
    return id;
  }

  static removeId(id: string) {
    delete global_id_hash[id];
  }

  static stats() {
    console.log("used " + Object.keys(global_id_hash).length + " out of " +
      Math.pow(chars.length, ID_LENGTH) + " possiblilites");
  }
}
