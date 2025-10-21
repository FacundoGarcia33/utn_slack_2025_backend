import { workspaceMembers } from "../model/woirkSpaceMembers.js";

export class WorkspaceMemberRepository {
  // Crear un miembro en un workspace
  static async create(workspaceId, userId, role) {
    try {
      const existe = await workspaceMembers.findOne({
        workspace: workspaceId,
        user: userId,
      });
      if (existe) {
        console.log("[SERVER]: el miembro ya forma parte del workspace");
        return null;
      }

      const nuevo = await workspaceMembers.create({
        workspace: workspaceId,
        user: userId,
        role,
      });
      console.log(`[SERVER]: Miembro "${nuevo._id}" creado exitosamente`);
      return nuevo;
    } catch (error) {
      console.error(
        "[SERVER ERROR]: no se pudo crear el miembro",
        error.message
      );
      return null;
    }
  }

  // Obtener todos los miembros de un workspace
  static async getAll(workspaceId) {
    try {
      const members = await workspaceMembers
        .find({ workspace: workspaceId })
        .populate("user", "name email");
      console.log(members);
      return members;
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo traer la lista de miembros ${error.message}`
      );
      return [];
    }
  }

  // Obtener un miembro por su ID dentro de un workspace
  static async getById(memberId, workspaceId) {
    try {
      const member = await workspaceMembers
        .findOne({ _id: memberId, workspace: workspaceId })
        .populate("user", "name email");
      if (!member) {
        console.log("[SERVER]: miembro no encontrado en el workspace");
        return null;
      }
      console.log(member);
      return member;
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo traer el miembro ${error.message}`
      );
      return null;
    }
  }

  // Eliminar un miembro por ID dentro de un workspace
  static async deleteById(memberId, workspaceId) {
    try {
      const eliminado = await workspaceMembers.findOneAndDelete({
        _id: memberId,
        workspace: workspaceId,
      });
      if (!eliminado) {
        console.log(
          "[SERVER]: miembro no encontrado para eliminar en el workspace"
        );
        return null;
      }
      console.log(`[SERVER]: miembro eliminado del workspace`);
      return eliminado;
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo eliminar el miembro ${error.message}`
      );
      return null;
    }
  }

  // Actualizar un miembro dentro de un workspace
  static async updateById(memberId, workspaceId, data) {
    try {
      const actualizado = await workspaceMembers.findOneAndUpdate(
        { _id: memberId, workspace: workspaceId },
        data,
        { new: true }
      );
      if (!actualizado) {
        console.log(
          "[SERVER]: miembro no encontrado para actualizar en el workspace"
        );
        return null;
      }
      console.log(`[SERVER]: miembro actualizado`);
      return actualizado;
    } catch (error) {
      console.error(
        `[SERVER ERROR]: no se pudo actualizar el miembro ${error.message}`
      );
      return null;
    }
  }
}
