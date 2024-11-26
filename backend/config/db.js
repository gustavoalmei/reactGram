const mongoose = require('mongoose');
const dbUser = process.env.DBUSER;
const dbPassword = process.env.DBPASSWORD;

const connect = async ()=>{
  try {
    const dbConnect = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.nehaa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('Conectou ao banco');
    return dbConnect;
  } catch (error) {
    console.log(error)
  }
}
connect();

module.exports = connect;