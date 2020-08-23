'use strict'

class ProbeController {

    probe({request, response}) {
        return response.send({
            'status': 'Ok',
            'code': 200,
            'message': 'Application is running',
        });
    }

}

module.exports = ProbeController
