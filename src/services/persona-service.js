import config from "../dbconfig.js";
import sql from "mssql";

class PersonaService {
    getAll = async () =>{
        console.log('Estoy en PersonaService.GetAll()');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request().query('SELECT * FROM Personas');
            return result.recordsets[0];
        }
        catch (error) {
            console.log(error);
        }
    }
    getById = async (id) =>{
        console.log(`Estoy en PersonaService.GetById(${id})`);
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int,id)
                .query('SELECT * FROM Personas WHERE Id=@pId');
            return result.recordsets[0];
        }
        catch (error) {
            console.log(error);
        }
    }
    insert = async (persona) =>{
        console.log('Estoy en PersonaService.insert');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pNombre', sql.VarChar,persona?.nombre ?? '')
                .input('pFechaNac', sql.DateTime,persona?.fechaNac ?? '')
                .query('INSERT INTO Personas (nombre, fechaNac) VALUES (@pNombre, @pFechaNac)');
            return result.rowsAffected;
        }
        catch (error) {
            console.log(error);
        }
    }
    update = async (persona) =>{
        console.log('Estoy en PersonaService.update');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int,persona?.id ?? '')
                .input('pNombre', sql.VarChar,persona?.nombre ?? '')
                .input('pFechaNac', sql.DateTime,persona?.fechaNac ?? '')
                .query('UPDATE Personas set Nombre=@pNombre, FechaNac=@pFechaNac WHERE Id=@pId');
            return result.rowsAffected;
        }
        catch (error) {
            console.log(error);
        }
    }
    deleteById = async (id) =>{
        console.log(`Estoy en PersonaService.deleteById(${id})`);
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int,id)
                .query('DELETE FROM Personas WHERE Id=@pId');
            return result.rowsAffected;
        }
        catch (error) {
            console.log(error);
        } 
    }
}

export default PersonaService;