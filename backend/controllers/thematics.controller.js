'use strict';

const responseManagement = require('../protected/responseManagement');
const Models = require("../models");

module.exports.index = async(req, res) => {

    try {
        
        var thematics = await Models.Thematic.findAll();
    
        return responseManagement.responseDATA(res, 200, thematics);

    } catch (error) {

        return responseManagement.responseServerERROR(res, 500, error);
    }

};