import config from "../dbconfig";
import sql from 'mssql';

class PersonaService {
    getAll = async () =>{
        console.log('Estoy en PersonaService.GetAll()');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request().query('SELECT * FROM Persona');
            return result.recordsets[0];
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    getById = async (id) =>{
        console.log(`Estoy en PersonaService.GetById(${id})`);
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int,id)
                .query('SELECT * FROM Persona WHERE Id=@pId');
            return result.recordsets[0];
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    insert = async (persona) =>{
        console.log('Estoy en PersonaService.insert');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pNombre', sql.VarChar,persona?.nombre ?? '')
                .input('pFechaNac', sql.DateTime,persona?.fechaNac ?? '')
                .query('INSERT INTO Persona (Nombre, FechaNac) VALUES (@pNombre, pFechaNac)');
            return result.rowsAffected;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    update = async (persona) =>{
        console.log('Estoy en PersonaService.update');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.VarChar,persona?.id ?? '')
                .input('pNombre', sql.VarChar,persona?.nombre ?? '')
                .input('pFechaNac', sql.DateTime,persona?.fechaNac ?? '')
                .query('UPDATE Persona set Nombre=@pNombre, FechaNac=@pFechaNac WHERE Id=@pId');
            return result.rowsAffected;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    deleteById = async (id) =>{
        console.log(`Estoy en PersonaService.deleteById(${id})`);
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int,id)
                .query('DELETE FROM Persona WHERE Id=@pId');
            return result.rowsAffected;
        }
        catch (error) {
            console.log(error);
            throw error;
        } 
    }
}

export default PersonaService;