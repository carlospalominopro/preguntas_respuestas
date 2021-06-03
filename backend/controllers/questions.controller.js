'use strict';

const responseManagement = require('../protected/responseManagement');
const Models = require("../models");

module.exports.index = async(req, res) => {
    
    try {

        var options = {
            include : [
                {
                    model : Models.Thematic,
                    required : true
                },
                {
                    model : Models.QuestionAnswer,
                    required : false
                },
            ],
            order : [
                ['id', 'desc']
            ]
        }
        
        var questions = await Models.Question.findAll(options);
    
        return responseManagement.responseDATA(res, 200, questions);

    } catch (error) {
        
        return responseManagement.responseServerERROR(res, 500, error);
    }

};

module.exports.store = async(req, res) => {


    try {

        const data = {
            question : req.body.question || null,
            thematicId : req.body.thematicId || null,
        }

        if(!data.question || !data.thematicId){

            return responseManagement.responseJSON(res, 400, 'Por favor ingrese datos requeridos');

        }else{

            var question = await Models.Question.create(data);
        
            return responseManagement.responseDATA(res, 200, question);
        }
        

    } catch (error) {
        
        return responseManagement.responseServerERROR(res, 500, error);
    }

};

module.exports.update = async(req, res) => {

    try {

        const data = {
            id : req.body.id || null,
            question : req.body.question || null,
            thematicId : req.body.thematicId || null,
        }

        if(!data.id || !data.question || !data.thematicId){

            return responseManagement.responseJSON(res, 400, 'Por favor ingrese datos requeridos');

        }else{

            var question = await Models.Question.findByPk(data.id);
            await question.update(data);
        
            return responseManagement.responseDATA(res, 200, question);
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

            await Models.QuestionAnswer.destroy({where : {questionId : data.id}});
            await Models.Question.destroy({where : {id : data.id}});
        
            return responseManagement.responseJSON(res, 200, 'Pregunta eliminada correctamente');
        }
        

    } catch (error) {

        return responseManagement.responseServerERROR(res, 500, error);
    }

};