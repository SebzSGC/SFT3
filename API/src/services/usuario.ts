import GetConnection from '../connection/connection';
import { Usuario } from '../model/usuarios';

export const ListarUsuarios = async (): Promise<Usuario[]> => {
  try {
    let query = "SELECT * FROM Usuario";
    const statusConnection = await GetConnection();
    let response = await statusConnection.query<Usuario>(query);
    if (response != undefined) {
      return response.recordset;
    }
    return [];
  } catch (error) {
    throw error;
  }
};

export async function EncontrarUsuario(correo:string, contrasena: string): Promise<Usuario[]> {
  try {
    let query = `SELECT * FROM Usuario WHERE Correo = '${correo}' AND Contrasena = '${contrasena}'`;
    const statusConnection = await GetConnection();
    let response = await statusConnection.query(query);
    if (response != undefined) {
      return response.recordset;
    }
    return [];
  } catch (error) {
    throw error;
  }
};

export async function CrearUsuario(usuario: Usuario): Promise<boolean> {
  try {
    const query = `INSERT INTO Usuario(Nombre, Cedula, Cargo, Correo, Contrasena) VALUES('${usuario.Nombre}', '${usuario.Cedula}', '${usuario.Cargo}', '${usuario.Correo}', '${usuario.Contrasena}')`;
    const statusConnection = await GetConnection();
    const response = await statusConnection.query(query);
    
    if (response != undefined) {
      return response.rowsAffected.length > 0;
    }
    return false;
  } catch (error) {
    throw error;
  }
};


export async function EliminarUsuario(id:number): Promise<boolean> {
  try {
    let query = `DELETE FROM Usuario WHERE id = ${id}`;
    const statusConnection = await GetConnection();
    const response = await statusConnection.query(query);
    if (response != undefined) {
      return response.rowsAffected.length > 0;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

export async function ActualizarUsuario(id: number, usuario: Usuario): Promise<boolean> {
  try {
      let query = `UPDATE Usuario SET Nombre = '${usuario.Nombre}', Cedula = '${usuario.Cedula}', Cargo = '${usuario.Cargo}', Correo = '${usuario.Correo}', Contrasena = '${usuario.Contrasena}' WHERE id = ${id}`;
      const statusConnection = await GetConnection();
      const response = await statusConnection.query(query);
      if (response != undefined) {
          return response.rowsAffected.length > 0;
      }
      return false;
  } catch (error) {
      throw error;
  }
}
