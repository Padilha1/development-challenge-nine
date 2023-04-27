



class PatientService {
    
    addPatient(patientData, response){
        try{
            const sql = `INSERT INTO medclouddb.patient (
                name,
                email,
                address,
                birthdate
            ) VALUES (?, ?, ?, ?)`;
            const { name, email, address, birthdate } = patientData;

        }catch(error){
            return response(error)
        }
    }

    getPatient() {
        try {
            const sql = `UPDATE patient 
            SET birthdate = 1999-12-09 
            WHERE (id_patient = '1')`;
            
        } catch (error) {
            return response(error)
        }
    }







}