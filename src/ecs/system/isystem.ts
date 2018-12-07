import Entity from "../entity";

export default interface ISystem {
  /**
   * initialized the system, binds any event listeners needed, creates entities needed...
   */
  init: () => void;

  /**
   * this will be called every time the game updates (which is theoretically every frame)
   * @param {number} dt number of milliseconds since last game update iteration
   */
  update: (dt: number) => any;

  /**
   * checks wether the given entity is compatible with the system and adds it if it is
   * @returns {boolean} true if compatible and added, false otherwise
   */
  addIfCompatible: (entity: Entity) => boolean;

  /**
   * removes an entity from the system
   * @param {string} entityId the id of the entity to be removed
   */
  removeEntity: (entityId: string) => void;

  /**
   * called when the level is changed, should undo most if not all of the operations done in init
   * @see {@link ISystem#init}
   */
  destroy: () => void;
}
