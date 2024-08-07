const Route = require('../Route');
const SQLError = require('../../classes/SQLError');
const ValidationError = require('../../classes/ValidationError');
const db = require('../../database');

// esquemas
const affairScheme = require('../../schemas/actualize/Affair');

// funciones
const validateProp = require('../../helpers/validateProp');
const existsAffair = require('./functions/editAffair/existsAffair');
const checkProp = require('./functions/editAffair/checkProp');
const updateAffair = require('./functions/editAffair/updateAffair');
const registerLog = require('../../helpers/registerLog');

const route = new Route('/edit-affair', async (req, res) => {
    try {
      const r = req.body;
      const affairId = Number(r.affair_id);
      const affair = {
        title: r.title,
        person_name: r.person_name,
        status: r.status,
      };
      if(!await existsAffair(affairId, req.user_id)) throw new ValidationError(`El asunto con id '${affairId}' no existe.`);
      await db.commit();
      db.serialize(async () => {
        try {
          const affairDetails = {
            affair_id: affairId,
            title: [],
            person_name: [],
            status: []
          }
          for(const key of Object.keys(affair)){
            const value = affair[key];
            if(!value){
              if(value !== 0) continue;
            }
            if(validateProp(key, value, affairScheme)){
              if(await checkProp(key, value, affairId)) continue;
              const prevData = await updateAffair(key, value, affairId);
              if(prevData !== undefined){
                affairDetails[key] = [prevData, value];
              }
            }
          }
          await updateAffair('last_update', new Date().toFormat(), affairId);
          for(const key of Object.keys(affairDetails).slice(1)){
            if(affairDetails[key].length === 0) delete affairDetails[key];
          }
          if (r.status !== 'created' && r.status !== 'archived'){
            await registerLog(req.user_id, 'update', 'affairs', affairDetails.toSnakeCase());
          }
          await db.commit();
          res.status(200).json({ message: '¡Asunto actualizado correctamente!' });
        } catch(err){
          console.log(err);
          await db.rollback();
          if(err instanceof SQLError) return res.status(500).json({ error: err.message });
          if(err instanceof ValidationError) return res.status(400).json({ error: err.message });
          return res.status(500).json({ error: '¡Ha ocurrido un error al intentar actualizar el asunto!' });
        }
      });
    } catch(err){
      console.log(err);
      if(err instanceof ValidationError) return res.status(400).json({ error: err.message });
      return res.status(500).json({ error: '¡Ha ocurrido un error al intentar actualizar el asunto!' });
    }
});

module.exports = route;