const responseManagement = require('../protected/responseManagement');
const Models = require("../models");

module.exports.store = async(req, res) => {

    try {

        const data = {
            answer : req.body.answer || null,
            questionId : req.body.questionId || null
        }

        if(!data.answer || !data.questionId){

            return responseManagement.responseJSON(res, 400, 'Por favor ingrese datos requeridos');

        }else{

            var answer = await Models.QuestionAnswer.create(data);
        
            return responseManagement.responseDATA(res, 200, answer);
        }
        

    } catch (error) {
        
        return responseManagement.responseServerERROR(res, 500, error);
    }

};

module.exports.update = async(req, res) => {

    try {

        const data = {
            id : req.body.id || null,
            answer : req.body.answer || null,
        }

        if(!data.id || !data.answer){

            return responseManagement.responseJSON(res, 400, 'Por favor ingrese datos requeridos');

        }else{

            var answer = await Models.QuestionAnswer.findByPk(data.id);
            await answer.update(data);
        
            return responseManagement.responseDATA(res, 200, answer);
        }
        

    } catch (error) {
        
        return responseManagement.responseServerERROR(res, 500, error);
    }

};

module.exports.delete = async(req, res) => {

    try {

        const data = {
            id : req.body.id || null
        }

        if(!data.id || data.id == '' || data.id == null){

            return responseManagement.responseJSON(res, 400, 'Por favor ingrese datos requeridos');

        }else{

            await Models.QuestionAnswer.destroy({where : {id : data.id}});
        
            return responseManagement.responseJSON(res, 200, 'Respuesta eliminada correctamente');
        }
        

    } catch (error) {

        return responseManagement.responseServerERROR(res, 500, error);
    }

};