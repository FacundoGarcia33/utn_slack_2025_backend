// controler/workspaceControler.js
import { WorkspaceRepository } from "../repositoris/WorkspaceRepository.js";

export class WorkspaceControler {
  static async getAll(req, res) {
    try {
      const workspace = await WorkspaceRepository.getAll();
      res.send(workspace);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Error obteniendo workspaces" });
    }
  }
}
