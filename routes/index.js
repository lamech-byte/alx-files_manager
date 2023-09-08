/*
 * Create endpoints for our app
 */

import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

function routes(app) {
  const router = express.Router();

  // Attach the router to the app
  app.use('/', router);

  // Define an endpoint to get the status
  router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
  });

  // Define an endpoint to get statistics
  router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
  });

  // Define an endpoint to create a new user
  router.post('/users', (req, res) => {
    UsersController.postNew(req, res);
  });

  // Define an endpoint to sign in user
  router.get('/connect', (req, res) => {
    AuthController.getConnect(req, res);
  });

  // Define an endpoint to sign out the user
  router.get('/disconnect', (req, res) => {
    AuthController.getDisconnect(req, res);
  });

  // Define an endpoint to retrieve the user based on the token
  router.get('/users/me', (req, res) => {
    UsersController.getMe(req, res);
  });

  // Define an endpoint files
  router.post('/files', (req, res) => {
    FilesController.postUpload(req, res);
  });

  // Define an endpoint to retrieve the file
  router.get('/files/:id', (req, res) => {
    FilesController.getShow(req, res);
  });

  router.get('/files', (req, res) => {
    FilesController.getIndex(req, res);
  });

  // Define a publish/unpublish route
  router.put('/files/:id/publish', (req, res) => {
    FilesController.putPublish(req, res);
  });

  // Define an unpublished route
  router.put('/files/:id/unpublish', (req, res) => {
    FilesController.putUnpublish(req, res);
  });

  router.get('/files/:id/data', (req, res) => {
    FilesController.getFile(req, res);
  });
}

export default routes;
