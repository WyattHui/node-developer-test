const
  mongoose = require('mongoose'),
  env = process.env,
  uri = `mongodb://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}/${env.DB_NAME}`;

module.exports = async () => {
  let result;
  try {
    result = await mongoose.connect(
      uri,
      {useNewUrlParser: true, useUnifiedTopology: true}
    );
    console.log('Connected MongoDB');
  } catch (e) {
    console.error(e);
  }
  return result;
};
