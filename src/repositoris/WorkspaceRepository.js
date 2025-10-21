import { Workspace } from "../model/workspace.model.js";

export class WorkspaceRepository {
  static async create(id, name, url_image) {
    try {
      const existe = await Workspace.findOne({ id });
      if (existe) {
        console.log(`[SERVER]: el workspace "${name}" ya existe`);
        return;
      }

      const nuevo = await Workspace.create({ id, name, url_image });
      console.log(`[SERVER]: workspace "${nuevo.name}" creado exitosamente`);
    } catch (error) {
      console.error(
        "[SERVER ERROR]: no se pudo crear el workspace",
        error.message
      );
    }
  }

  static async getAll() {
    try {
      const workspaces = await Workspace.find();
      console.log(workspaces);
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo traer la lista de workspaces ${error.message}`
      );
    }
  }

  static async getById(id_workspace) {
    try {
      const workspace = await Workspace.findById(id_workspace);
      if (!workspace) {
        console.log("[SERVER]: workspace no encontrado");
        return;
      }
      console.log(workspace);
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo traer el workspace ${error.message}`
      );
    }
  }

  static async deleteByid(id_workspace) {
    try {
      const eliminado = await Workspace.findByIdAndDelete(id_workspace);
      if (!eliminado) {
        console.log("[SERVER]: workspace no encontrado para eliminar");
        return;
      }
      console.log(`[SERVER]: el workspace "${eliminado.name}" fue eliminado`);
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo eliminar el workspace ${error.message}`
      );
    }
  }

  static async updateById(id_workspace, data) {
    try {
      const actualizado = await Workspace.findByIdAndUpdate(
        id_workspace,
        data,
        { new: true }
      );
      if (!actualizado) {
        console.log("[SERVER]: workspace no encontrado para actualizar");
        return;
      }
      console.log(
        `[SERVER]: el workspace "${actualizado.name}" fue actualizado`
      );
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo actualizar el workspace ${error.message}`
      );
    }
  }
}
