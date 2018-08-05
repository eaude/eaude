import express from 'express';
import path from 'path';
import router from './routes';

const admin = express();

admin.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
admin.set('view engine', 'pug');

admin.use('/', router)

export default admin;