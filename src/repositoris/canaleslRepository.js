import { canales } from "../model/canales.js";

export class ChannelRepository {
  // Crear un canal
  static async create(workspaceId, name) {
    try {
      const existe = await canales.findOne({ workspace: workspaceId, name });
      if (existe) {
        console.log(`[SERVER]: el canal "${name}" ya existe en este workspace`);
        return null;
      }

      const nuevo = await canales.create({ workspace: workspaceId, name });
      console.log(`[SERVER]: canal "${nuevo.name}" creado exitosamente`);
      return nuevo;
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo crear el canal ${error.message}`
      );
    }
  }

  // Obtener todos los canales de un workspace
  static async getAll(workspaceId) {
    try {
      const lista = await canales.find({ workspace: workspaceId });
      console.log(lista);
      return lista;
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo traer la lista de canales ${error.message}`
      );
    }
  }

  // Obtener un canal por su ID dentro de un workspace
  static async getById(channelId, workspaceId) {
    try {
      const canal = await canales.findOne({
        _id: channelId,
        workspace: workspaceId,
      });
      if (!canal) {
        console.log("[SERVER]: canal no encontrado en el workspace");
        return null;
      }
      console.log(canal);
      return canal;
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo traer el canal ${error.message}`
      );
    }
  }

  // Eliminar un canal por ID dentro de un workspace
  static async deleteById(channelId, workspaceId) {
    try {
      const eliminado = await canales.findOneAndDelete({
        _id: channelId,
        workspace: workspaceId,
      });
      if (!eliminado) {
        console.log(
          "[SERVER]: canal no encontrado para eliminar en el workspace"
        );
        return null;
      }
      console.log(`[SERVER]: canal eliminado del workspace`);
      return eliminado;
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo eliminar el canal ${error.message}`
      );
    }
  }

  // Actualizar un canal dentro de un workspace
  static async updateById(channelId, workspaceId, data) {
    try {
      const actualizado = await canales.findOneAndUpdate(
        { _id: channelId, workspace: workspaceId },
        data,
        { new: true }
      );
      if (!actualizado) {
        console.log(
          "[SERVER]: canal no encontrado para actualizar en el workspace"
        );
        return null;
      }
      console.log(`[SERVER]: canal actualizado`);
      return actualizado;
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo actualizar el canal ${error.message}`
      );
    }
  }
}
