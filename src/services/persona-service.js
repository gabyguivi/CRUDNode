import config from "../dbconfig";
import sql from 'mssql';

class PersonaService {
    getAll = async () =>{
        let returnEntity = null;
        console.log('Estoy en PersonaService.GetAll()');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request().query('SELECT * FROM Persona');
            return result[0];
        }
        catch (error) {
            console.log(error);
        }
    }
    getById = async (id) =>{}
    insert = async (persona) =>{}
    update = async (persona) =>{}
    deleteById = async (persona) =>{}
}

export default PersonaService;