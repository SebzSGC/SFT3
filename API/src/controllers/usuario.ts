import { Usuario } from '../model/usuarios';
import * as serviceUsuario from '../services/usuario';

export const GetUsuarios = async (): Promise<Usuario[]> => {
    try {
        let data: Usuario[] = await serviceUsuario.ListarUsuarios();
        return data;
    } catch (error) {
        throw error;
    }
};

export const GetUsuario = async (correo: string, contrasena: string): Promise<Usuario[]> => {
    try {
        let data: Usuario[] = await serviceUsuario.EncontrarUsuario(correo, contrasena);
        return data;
    } catch (error) {
        throw error;
    }
};

export const PostUsuario = async (Usuario: Usuario): Promise<boolean> => {
    try {
        return serviceUsuario.CrearUsuario(Usuario);
    } catch (error) {
        throw error;
    }
};

export const DeleteUsuario = async (id: number): Promise<boolean> => {
    try {
        return serviceUsuario.EliminarUsuario(id);
    } catch (error) {
        throw error;
    }
};

export const ActualizarUsuario = async (Usuario: Usuario): Promise<boolean> => {
    try {
        return serviceUsuario.ActualizarUsuario(Usuario);
    } catch (error) {
        throw error;
    }
};
