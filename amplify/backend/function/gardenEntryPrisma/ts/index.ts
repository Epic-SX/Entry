const serverlessExpress =require('@vendia/serverless-express')
import app from './app'
exports.handler = serverlessExpress({ app })