var logDataModel = require('../logData/log-data.model.js');
var logDataController = require('../logData/log-data.controller.js');
var userDataController = require('../userData/user-data.controller.js');
var textController = require('../textData/text-data.controller.js');
var helpers = require('./helpers.js');

module.exports = function (app, express) {
  app.post('/db', logDataController.newLog);
  app.post('/data', logDataController.singleLogs);
  app.post('/signup', userDataController.newUser);
  app.post('/login', userDataController.login);
  app.get('/signout', userDataController.signout);
  app.post('/data/:year/:month/:day', logDataController.daily);
  app.post('/data/:year/:month', logDataController.monthly);
  app.post('/text', textController.sendText);
  app.post('/recieve',textController.recieveText);
  app.post('/message',textController.recieveText);
  app.post('/data/average/level/daily/:year', logDataController.dailyAverages);
  app.post('/data/average/level/weekly/:year', logDataController.weeklyAverages);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
}
