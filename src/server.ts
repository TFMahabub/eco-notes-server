import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

main().catch(err => console.log(err))

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`database is connected`)

    app.listen(config.port, () => {
      console.log(`server is listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(`failed to connect database ${err}`)
  }
}

main()
